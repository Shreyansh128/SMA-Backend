const mongoose = require("mongoose");

const requestTrackingSchema = new mongoose.Schema({
        Requester_Name :{
            type: String,
            required: true
        },
        Request_name :{
            type: String,
            required: true
        },
        Request_Date :{
            type: Date,
            required: true
        },
        wing: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        Priority: {
            type: String,
            enum: ["Low", "Medium" ,"High"],
            // default: "medium"
        },
        status:{
            type: String,
            enum: ["Pending", "Open", "Solve"],
            // default: "Pending"
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
    },
    { timestamps: true }
);

const RequestTracking = mongoose.model("RequestTracking", requestTrackingSchema);
module.exports = RequestTracking;