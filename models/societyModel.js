const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
    societyName: {
        type: String,
        required: true,
    },
    address: {
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
    Zip_code: {
        type: Number,
        required: true,
    },
});             

const Society = mongoose.model("society", societySchema);
module.exports = Society;