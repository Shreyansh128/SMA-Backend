const mongoose = require("mongoose");

const CompalintSubmissionSchema = new mongoose.Schema({
    Complainer_name :{
        type: String,
        required: true
    },
    Complaint_name :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    wing: {
        type: String,
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    Priority: {
        type: String,
        enum: ["Low", "Medium" ,"High"],
        default: "medium"
    },
    status:{
        type: String,
        enum: ["Pending", "Open", "Solve"],
        default: "Pending"
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

const ComplaintSubmission = mongoose.model("ComplaintSubmission", CompalintSubmissionSchema);
module.exports = ComplaintSubmission;