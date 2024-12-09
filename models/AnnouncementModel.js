const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    Announcement_Type: {
        type: String,
        enum: ["Event", "Activity"],
        required: true
    },
    title :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    date :{
        type: Date,
        required: true
    },
    time :{
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

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
module.exports = Announcement;