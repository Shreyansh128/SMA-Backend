const AlertModel = require("../models/AlertModel.js");
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createAlert = async (req, res) => {
    try{
        const { AlertType, description, adminId, societyId } = req.body;

        const admin = await Admin.findById(adminId);
		if (!admin) {
		  	return res.status(404).json({ msg: "Admin not found" });
		}

        const society = await Society.findById(societyId);
		if (!society) {
		  	return res.status(404).json({ msg: "Society not found" });
		}

        const newAlertModel = new AlertModel({
            AlertType, 
            description, 
            adminId, 
            societyId
        });
        await newAlertModel.save();    
        res.json(newAlertModel);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).json({ message: "Server error", err: err.message });
    }
};

module.exports.viewAlert = async (req, res) => {
    try{
        const ViewAlert = await AlertModel.find();
        res.json(ViewAlert);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports.deleteAlert = async(req,res)=>{
    try{
        const { id } = req.params;
        const deleteAlert = await AlertModel.findByIdAndDelete(id);
        if(!deleteAlert){
            return res.status(404).json({ msg : "Alert Data Not Found" });
        }
        res.json({ msg: "Alert deleted succsessfully", deleteAlert });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted")
    }
}