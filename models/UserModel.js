const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/profile-image";

const path = require("path");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    select_society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'society',
        // required: true
    },
    password: {
        type: String,   
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    otp: { 
        type: String 
    },
    ProfileImage: { 
        type: String 
    },   
    otpExpires: { 
        type: Date 
    },   
    role: {
        type: String,
        enum: ['admin', 'user', 'securityGard'], // Define the possible roles    
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


userSchema.statics.uploadedAvatar = multer({storage: storage1}).single("ProfileImage");
userSchema.statics.avatarPath = AVATAR_PATH;


const User = mongoose.model("Admin", userSchema);
module.exports = User;