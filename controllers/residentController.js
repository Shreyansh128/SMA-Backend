const Resident = require('../models/residentModel'); 
const fs = require("fs");
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");


// email sending setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email_USER,  
        pass: process.env.email_PASS
    },
    tls: {
        rejectUnauthorized: false 
    }
});

// generate a random password
const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for(let i = 0; i < 12; i++){  // Length of the password
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
};

// Function to send reset email
const sendMail = async (to, password) => {
    const mailOptions = {
        from: "<arjun.chauhan@swiftrut.com>",
        to: to,
        subject: 'Account Created - Your Temporary Password',
        text: `Your new password is: ${password}\n\nPlease use this password to log in to your account.`,
    };

    try{
        console.log("Attempting to send email to:", to);
        await transporter.sendMail(mailOptions);
        console.log("Password email sent successfully to:", to);
        console.log("Password:", password);
        
    }
    catch(error){
        console.error("Error sending email:", error);
        console.error("Stack trace:", error.stack);
        throw new Error("Error sending email");
    }
};

module.exports.createResident = async (req, res) => {
    try {
        const {
            type, ownerName, ownerPhone, ownerAddress, Full_name, Phone_number, email, age, gender, wing, unit, Relation,
            Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number, residentStatus, adminId, societyId, role
        } = req.body;

        // Generate random password
        const randomPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(randomPassword, 10); // Hash the password

        if (!type || !["owner", "tenant"].includes(type.toLowerCase())) {
            return res.status(400).json({ msg: "Invalid type. Must be 'owner' or 'tenant'." });
        }

        let residentData = {
            type: type.toLowerCase(), Full_name, Phone_number, email, age, gender, wing, unit, Relation,
            Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number, residentStatus, adminId, societyId, role, password: hashedPassword,
        };

        if (type.toLowerCase() === "tenant") {
            residentData.ownerName = ownerName;
            residentData.ownerPhone = ownerPhone;
            residentData.ownerAddress = ownerAddress;
        }

        if (req.files) {
            const fileFields = [
                "Profile_Photo", "Aadhar_card_frontSide", "Aadhar_card_backSide",
                "Address_Proof_VeraBill_or_LightBill", "Rent_Agreement"
            ];
            fileFields.forEach(field => {
                if (req.files[field]) {
                    residentData[field] = path.join(Resident.filePath, req.files[field][0].filename);
                }
            });
        }

        const newResident = new Resident(residentData);
        await newResident.save();

        // Send email with the random password
        await sendMail(email, randomPassword);

        res.json({ msg: `${type} created successfully`, resident: newResident });
        // console.log(`${type} created successfully:`, newResident);

    } catch (err) {
        console.error("Error creating resident:", err.message);
        res.status(400).json({ err: err.message });
    }
};


module.exports.getAllResident = async (req, res) => {
    try{
        const ViewAllResident = await Resident.find();
        res.json(ViewAllResident);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports.getResident = async (req, res) => {
    try {
        const viewResident = await Resident.findById(req.params.id);
        if (!viewResident) {
            return res.status(404).json({ message: "Resident record not found" });
        }
        res.status(200).json(viewResident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteResident = async (req, res) => {
    try{
        const { id } = req.params;
        const residentData = await Resident.findById(id);
        if(!residentData) return res.status(404).json({ msg: "Resident data not found" });
        const fileFields = [
            "Profile_Photo",
            "Aadhar_card_frontSide",
            "Aadhar_card_backSide",
            "Address_Proof_VeraBill_or_LightBill",
            "Rent_Agreement"
        ];
        fileFields.forEach(field => {
            if(residentData[field]){
                const filePath = path.join(__dirname, "..", residentData[field]);
                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                else{
                    console.warn(`Image file does not exist at: ${filePath}`);
                }
            }
        });
        const deletedResident = await Resident.findByIdAndDelete(id);
        res.json({ msg: "Resident deleted successfully", deletedResident });
    }
    catch(err){
        console.error("Error deleting resident:", err.message);
        res.status(500).send("Server error");
    }
};

module.exports.updateResident = async (req, res) => {
    try{
        const id = req.params.id;
        const residentData = await Resident.findById(id);
        if(!residentData){
            res.status(404).json({ msg: "Resident data not found" });
        }
        const {
            type, ownerName, ownerPhone, ownerAddress, Full_name, Phone_number, email, age, gender, wing, unit, Relation, 
            Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number, residentStatus } = req.body;

        let updateFields = {};
        const addFields = (fields) => {
            fields.forEach(field => {
                if (req.body[field]) updateFields[field] = req.body[field];
            });
        };

        addFields([ 'ownerName', 'ownerPhone', 'ownerAddress', 'Full_name', 'Phone_number', 'email', 'age', 'gender', 'wing', 'unit',
            'Relation', 'Member_Counting', 'vehicle_Counting', 'vehicle_Type', 'vehicle_Name', 'vehicle_Number', 'residentStatus' ]);

        if(type && type.toLowerCase() === "tenant"){
            addFields(['ownerName', 'ownerPhone', 'ownerAddress']);
        }
        if(req.files){
            const fileFields = [
                "Profile_Photo", "Aadhar_card_frontSide", "Aadhar_card_backSide",
                "Address_Proof_VeraBill_or_LightBill", "Rent_Agreement"
            ];
            fileFields.forEach(field =>{
                if(req.files[field]){
                    const oldFilePath = path.join(__dirname, "..", residentData[field]);
                    if(residentData[field] && fs.existsSync(oldFilePath)){
                        try{
                            fs.unlinkSync(oldFilePath);
                        }
                        catch(error){
                            console.error(`Error deleting file ${oldFilePath}:`, error.message);
                        }
                    }
                    updateFields[field] = path.join(Resident.filePath, req.files[field][0].filename);
                }
            });
        }
        const updatedResident = await Resident.findByIdAndUpdate(id, updateFields, { new: true });
        if(!updatedResident){
            return res.status(404).json({ msg: "Resident not found" });
        }
        res.json({ msg: "Resident updated successfully", updatedResident });
    }
    catch(err){
        console.error("Error updating resident:", err.message);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

module.exports.vacateflat = async (req, res) => {
    try{
        const owner = await Resident.findById(req.params.id);
        if(!owner) return res.status(404).json({ msg: "Owner not found" });
        owner.residentStatus = "vacant";
        await owner.save();
        
        const responseData = { 
            wing: owner.wing, 
            unit: owner.unit,
            residentStatus: owner.residentStatus
        }
        res.json({ msg: "Unit marked as vacant" , data : responseData });
    }
    catch(err){
        console.error("Error vacating flat:", err.message);
        res.status(500).json({ msg: "Server error", message: err.message });
    }
}