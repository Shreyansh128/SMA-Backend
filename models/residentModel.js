const mongoose = require("mongoose");

const multer = require("multer");

const path = require("path");

const FILE_PATH = "/uploads/resident_image";


const residentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['owner', 'tenant'], // Define the possible roles    
    },
    ownerName: {
        type: String,
    },
    ownerPhone: {
        type: String,
    },
    ownerAddress: {
        type: String,
    },
    Full_name: {
        type: String,
        required: true
    },
    Phone_number: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    wing: {
        type: String,
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    Relation: {
        type: String,
        required: true
    },
    Profile_Photo: {
        type: String,
    },
    Aadhar_card_frontSide: {
        type: String,
    },
    Aadhar_card_backSide: {
        type: String,
    },
    Address_Proof_VeraBill_or_LightBill: {
        type: String,
    },
    Rent_Agreement: {
        type: String,
    },
    Member_Counting: {
        type: Number,
        required: true
    },
    vehicle_Counting: {
        type: Number,
        required: true
    },
    vehicle_Type: {
        type: String,
        required: true
    },
    vehicle_Name: {
        type: String,
        required: true
    },
    vehicle_Number: {
        type: String,
        required: true
    },
    residentStatus: {
        type: String,
        enum: ['Occupied', 'Vacate'],
        default: 'Occupied' 
    },
    password: {
        type: String,
        required: true
    },
    // adminId: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Admin', 
    //     required: true 
    // },
    // societyId: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Society',
    //     required: true
    // }
});
const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", FILE_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

residentSchema.statics.uploadFiles = multer({ storage: storage1 }).fields([
    { name: "Profile_Photo", maxCount: 1 },
    { name: "Aadhar_card_frontSide", maxCount: 1 },
    { name: "Aadhar_card_backSide", maxCount: 1 },
    { name: "Address_Proof_VeraBill_or_LightBill", maxCount: 1 },
    { name: "Rent_Agreement", maxCount: 1 }
]);

residentSchema.statics.filePath = FILE_PATH;

const Resident = mongoose.model("Resident", residentSchema);
module.exports = Resident;