const mongoose = require('mongoose');

const MaintenanceSchema = mongoose.Schema({
        Maintenance_amount :{
            type: Number,
            required: true
        },
        Penalty_Amount :{
            type: Number,
            required: true
        },
        Due_date :{
            type: Date,
            required: true
        },
        lastDate: {
            type: Date,
            required: true
        },
        penaltyAppliedAfterDays :{
            type: Number,
            required: true
        },
        status : {
            type: String,
            enum : ['Pending', 'Complete'],
            default: 'Pending',
            required: true
        },
        Payment_Method :{
            type: String,
            enum : ['Cash', 'Online'],
            required: true
        },
        // adminId: { 
        //     type: mongoose.Schema.Types.ObjectId, 
        //     ref: 'Admin', 
        //     required: true 
        // },
        // societyId: { 
        //     type: mongoose.Schema.Types.ObjectId, 
        //     ref: 'Society',
        //     required: true
        // }        
    },
    { timestamps: true }
);

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);
module.exports = Maintenance;