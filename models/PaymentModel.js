const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        // required: true 
    },
    amount: { 
        type: Number, 
        // required: true 
    },
    currency: { 
        type: String, 
        // required: true 
    },
    receipt: { 
        type: String, 
        // required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    Member :{
        type: Number,
    },
    Card_Name :{
        type: String,
        // required: true
    },
    Card_number :{
        type: Number,
        // required: true
    },
    Expiry_date :{
        type: Date,
        // required: true
    },
    CVV :{
        type: Number,
        // required: true
    },
    status : {
        type: String,
        // enum : ['Pending', 'Complete'],
        default: 'Pending',
        // required: true
    },
    adminId: { 
        type: mongoose.Schema.Types.ObjectId, 
        type: String,
        ref: 'Admin', 
        // required: true 
    },
    societyId: { 
        // type: mongoose.Schema.Types.ObjectId, 
        type: String, 
        ref: 'Society',
        // required: true
    },
    
},{ timestamps: true }
);

const Payment = mongoose.model('Payment', orderSchema);
module.exports = Payment;