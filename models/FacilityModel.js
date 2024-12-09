const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    Name :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    Service_date :{
        type: Date,
        required: true
    },
    Remind_before :{
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

const Facility = mongoose.model('Facility', FacilitySchema);
module.exports = Facility;