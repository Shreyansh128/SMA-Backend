const VisitorTracking = require("../models/visitorTrackingModel");
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createVisitorTracking = async(req,res)=>{
    try{
        const { Name, Phone_number, date, Wing, Unit_number, time} = req.body;

        // const admin = await Admin.findById(adminId);
		// if (!admin) {
		//   	return res.status(404).json({ msg: "Admin not found" });
		// }

        // const society = await Society.findById(societyId);
		// if (!society) {
		//   	return res.status(404).json({ msg: "Society not found" });
		// }

        if(!Name || !Phone_number || !date || !Wing || !Unit_number || !time) {
            return res.status(400).json({ msg: "fields are required." });
        }

        const newVisitorTracking = new VisitorTracking({ Name, Phone_number, date: new Date(date), Wing, Unit_number, time });
        await newVisitorTracking.save();
        res.status(201).json({ msg: "VisitorTracking created successfully", protocol: newVisitorTracking });
    } 
    catch(err){
        console.error("Error creating VisitorTracking:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports.getVisitorTracking = async(req,res)=>{
    try {
        const ViewAllVisitorTracking = await VisitorTracking.find();
        res.json(ViewAllVisitorTracking);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports.deleteVisitorTracking = async(req,res)=>{
    try{
        const { id } = req.params;
        const deleteVisitorTracking = await VisitorTracking.findByIdAndDelete(id);
        if(!deleteVisitorTracking){
            return res.status(404).json({ msg : "VisitorTracking Data Not Found" });
        }
        res.json({ msg: "VisitorTracking deleted succsessfully", deleteVisitorTracking });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted");
    }
}

module.exports.updateVisitorTracking = async(req,res)=>{
    try {
        const { id } = req.params;
        const { Name, Phone_number, date, Wing, Unit_number, time } = req.body;

        const updateVisitorTracking = await VisitorTracking.findByIdAndUpdate(id, { Name, Phone_number, date: new Date(date), Wing, Unit_number, time }, { new: true });
        if (!updateVisitorTracking) {
            return res.status(404).json({ msg: "VisitorTracking data not found" });
        }
        res.json({ msg: "VisitorTracking updated successfully", updateVisitorTracking });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}