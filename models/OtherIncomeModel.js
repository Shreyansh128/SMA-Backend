const mongoose = require('mongoose');

const OtherIncomeSchema = new mongoose.Schema({
    Title :{
        type: String,
    },
    Date :{
        type: Date,
        required: true
    },
    Due_Date :{
        type: Date,
        required: true
    },
    Description :{
        type: String,
        required: true
    },
    Amount :{
        type: Number,
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

const OtherIncome = mongoose.model('OtherIncome', OtherIncomeSchema);
module.exports = OtherIncome;