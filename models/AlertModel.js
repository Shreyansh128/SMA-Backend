const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
    AlertType :{
        type: String,
        enum: ["Emergency", "Warning","Fire Alarm","Earth Quack","High Winds","Thunder"],
        required: true
    },
    description:{
        type: String,
        required: true
    },
    adminId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: true 
    },
    societyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Society',
        required: true
    }
});

const Alert = mongoose.model('Alert', AlertSchema);
module.exports = Alert;