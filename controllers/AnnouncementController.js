const Announcement = require("../models/AnnouncementModel");
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createAnnouncement = async(req,res) =>{
    try{
        const { Announcement_Type, title, description, date, time } = req.body;

        // const admin = await Admin.findById(adminId);
		// if (!admin) {
		//   	return res.status(404).json({ msg: "Admin not found" });
		// }

        // const society = await Society.findById(societyId);
		// if (!society) {
		//   	return res.status(404).json({ msg: "Society not found" });
		// }

        if (!Announcement_Type || !title || !description || !date || !time) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        const newAnnouncement = new Announcement({ Announcement_Type, title, description, date, time});
        await newAnnouncement.save();    
        res.json(newAnnouncement);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.getAnnouncement = async (req, res) => {
    try{
        const ViewAnnouncement = await Announcement.find();
        res.json(ViewAnnouncement);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deleteAnnouncement = async(req, res) => {
    try{
        const { id } = req.params;
        const deleteAnnouncement = await Announcement.findByIdAndDelete(id);
        if(!deleteAnnouncement){
            return res.status(404).json({ msg : "Announcement Data Not Found" });
        }
        res.json({ msg: "Announcement deleted succsessfully", deleteAnnouncement });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.updateAnnouncement = async(req, res) => {
    try{
        const { id } = req.params;
        const { Announcement_Type, title, description, date, time } = req.body;

        if (!Announcement_Type || !title || !description || !date || !time) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        
        const updateAnnouncement = await Announcement.findByIdAndUpdate(id, { Announcement_Type, title, description, date, time}, { new : true });
        if(!updateAnnouncement){
            res.status(404).json({ msg : "Announcement Data Not Found" });
        }
        res.json({ msg: "Announcement updated Succsessfully", updateAnnouncement});
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ err: err.message });
    }
}