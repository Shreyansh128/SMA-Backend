const mongoose = require("mongoose");

const ImportantNumberSchema = new mongoose.Schema({
    Full_name: {
        type: String,
        required: true
    },
    Phone_number: {
        type: Number,
        required: true
    },
    Work :{
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

const ImportantNumber = mongoose.model("ImportantNumber", ImportantNumberSchema);
module.exports = ImportantNumber;