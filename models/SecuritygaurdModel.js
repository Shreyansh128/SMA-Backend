const mongoose = require('mongoose');

const multer = require("multer");

const AVATAR_PATH = "/uploads/Security-Gaurd-image";

const path = require("path");

const SecuritygaurdSchema = new mongoose.Schema({
    Security_Gard_Image: {
        type: String,
        required: true
    },
    Full_name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
    },
    Phone_number: {
        type: Number,
        required: true
    },
    gender :{
        type: String,
        enum : ['Male', 'Female'],
        required: true
    },
    shift : {
        type: String,
        enum : ['Day', 'Night'],
        required: true
    },
    Shift_Date :{
        type: Date,
        required: true
    },
    Shift_time: {
        type: String,
        required: true, 
    },
    Aadhar_card :{
        type: String,
        required: true
    },
    adminId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        // required: true 
    },
    societyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Society',
        // required: true
    },
    password: {
        type: String,
        required: true
    },
}); 


const storage1 = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },

    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

SecuritygaurdSchema.statics.uploadedAvatar = multer({ storage: storage1 }).fields([
    { name: 'Security_Gard_Image', maxCount: 1 },
    { name: 'Aadhar_card', maxCount: 1 }
]);

SecuritygaurdSchema.statics.avatarPath = AVATAR_PATH;


const Securitygaurd = mongoose.model('Securitygaurd', SecuritygaurdSchema);
module.exports = Securitygaurd;