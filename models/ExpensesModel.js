const mongoose = require('mongoose');

const multer = require("multer");

const AVATAR_PATH = "/uploads/Bill_image";

const path = require("path");

const ExpensesSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    Bill_image : {
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
    }
});


const storage1 = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },

    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});


ExpensesSchema.statics.uploadedAvatar = multer({storage: storage1}).single("Bill_image");
ExpensesSchema.statics.avatarPath = AVATAR_PATH;



const Expenses = mongoose.model('Expenses', ExpensesSchema);
module.exports = Expenses;