const Poll = require("../models/PollModel");
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createPoll = async(req,res) =>{
    try{
        const { Polls, Question, Option_1, Option_2, adminId, societyId } = req.body;

        const admin = await Admin.findById(adminId);
		if (!admin) {
		  	return res.status(404).json({ msg: "Admin not found" });
		}

        const society = await Society.findById(societyId);
		if (!society) {
		  	return res.status(404).json({ msg: "Society not found" });
		}

        const newImportantNumber = new Poll({ 
            Polls, 
            Question, 
            Option_1, 
            Option_2,
            adminId, 
            societyId
        });
        await newImportantNumber.save();    
        res.json(newImportantNumber);
    } 
    catch(err){ 
        console.error("Error creating complaint:", err.message);
        res.status(500).json({ message: "Server error", err: err.message });
    }
}

module.exports.getPoll = async(req, res) =>{
    try{
        const ViewPoll = await Poll.find();
        res.json(ViewPoll);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.deletePoll = async(req, res) =>{
    try{
        const { id } = req.params;
        const deletePoll = await Poll.findByIdAndDelete(id);
        if(!deletePoll){
            return res.status(404).json({ msg : "Poll Data Not Found" });
        }
        res.json({ msg: "Poll deleted succsessfully", deletePoll });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ err: err.message });
    }
}