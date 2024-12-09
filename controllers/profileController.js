const Profile = require("../models/UserModel");
const fs = require("fs");
const path = require("path");

module.exports.viewProfile = async(req,res)=>{
    try{
        const ViewProfile = await Profile.find();
        res.json(ViewProfile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.updateProfile = async (req, res) => {
    try{
        const { id } = req.params;
        const { firstName, lastName, email, phone, country, state, city, select_society } = req.body;

        let profileData = { firstName, lastName, email, phone, country, state, city, select_society };

        if(req.file){
            const existingProfile = await Profile.findById(id);
            if(existingProfile && existingProfile.ProfileImage) {
                const oldImagePath = path.join(__dirname, "..", existingProfile.ProfileImage);
                if(fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);  // Delete the old image
                    console.log("Old image deleted: ", oldImagePath);
                } 
                else{
                    console.log("Old image not found, skipping deletion.");
                }
            }
            profileData.ProfileImage = Profile.avatarPath + "/" + req.file.filename;
        }

        const updateProfile = await Profile.findByIdAndUpdate(id, profileData, { new: true });
        if
        (!updateProfile){
            return res.status(404).json({ msg: "Profile Data Not Found" });
        }

        res.json({ msg: "Profile updated successfully", updateProfile });
    } 
    catch(err){
        console.error(err.message);
        res.status(500).send("Data not updated");
    }
};

module.exports.deleteProfile = async (req, res) => {
    try{
        const { id } = req.params;
        const profileToDelete = await Profile.findById(id);
        if(!profileToDelete) {
            return res.status(404).json({ msg: "Profile Data Not Found" });
        }

        if(profileToDelete.ProfileImage) {
            const imagePath = path.join(__dirname, "..", profileToDelete.ProfileImage);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image file:", err);
                    return res.status(500).json({ msg: "Failed to delete image file" });
                }
                console.log("Profile image deleted successfully");
            });
        }

        const deleteProfile = await Profile.findByIdAndDelete(id);
        res.status(200).json({ msg: "Profile deleted successfully" , deleteProfile });
    } 
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.getSingleProfile = async (req, res) => {
    try {
        const getSingleProfile = await Profile.findById(req.params.id);
        if (!getSingleProfile) {
            return res.status(404).json({ message: "Profile record not found" });
        }
        res.status(200).json(getSingleProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};