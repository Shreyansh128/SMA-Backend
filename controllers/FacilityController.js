const Facility = require('../models/FacilityModel'); 
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

// Create a new facility
module.exports.createFacility = async (req, res) => {
    // console.log(req.body);
    try {
        const { Name, description, Service_date, Remind_before } = req.body;

        // const admin = await Admin.findById(adminId);
		// if (!admin) {
		//   	return res.status(404).json({ msg: "Admin not found" });
		// }

        // const society = await Society.findById(societyId);
		// if (!society) {
		//   	return res.status(404).json({ msg: "Society not found" });
		// }
        
        if (!Name || !description || !Service_date || !Remind_before) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newFacility = new Facility({ Name, description, Service_date, Remind_before});
        await newFacility.save();
        res.status(201).json(newFacility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getFacility = async(req,res) =>{
    try{
        const ViewAllFacility = await Facility.find();
        res.json(ViewAllFacility);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.deleteFacility = async(req,res) => {
    const { id } = req.params;
    try{
        const deleteFacility = await Facility.findByIdAndDelete(id);
        if(!deleteFacility){
            return res.status(404).json({ message: "Facility not found" });
        }
        res.json({ message: "Facility deleted successfully" , deleteFacility });
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.updateFacility = async(req,res) => {
    const { id } = req.params;
    const { Name, description, Service_date, Remind_before } = req.body;
    try{
        const updateFacility = await Facility.findByIdAndUpdate(id, { Name, description, Service_date, Remind_before }, { new: true });
        if(!updateFacility){
            return res.status(404).json({ message: "Facility not found" });
        }
        res.json({ message: "Facility updated successfully", updateFacility });
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}