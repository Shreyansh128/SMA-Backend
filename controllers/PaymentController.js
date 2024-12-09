const Razorpay = require('razorpay');
const Payment = require('../models/PaymentModel');
const dotenv = require('dotenv');
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

module.exports.createPayment = async (req, res) => {
    try {
        const { Card_Name, Card_number, Expiry_date, CVV, Member, amount, adminId, societyId } = req.body;

        // Validate Admin and Society existence
        // const admin = await Admin.findById(adminId);
        // if (!admin) return res.status(404).json({ msg: "Admin not found" });

        // const society = await Society.findById(societyId);
        // if (!society) return res.status(404).json({ msg: "Society not found" });

        if (!Card_Name || !Card_number || !Expiry_date || !CVV || !Member || !amount) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create Razorpay Order
        const orderOptions = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };
        const order = await razorpayInstance.orders.create(orderOptions);

        // Save to MongoDB
        const newPayment = new Payment({
            order_id: order.id,
            amount: amount,
            currency: order.currency,
            receipt: order.receipt,
            Member,
            Card_Name,
            Card_number,
            Expiry_date,
            CVV,
            adminId,
            societyId,
        });
        await newPayment.save();
        res.status(201).json({ success: true, message: "Payment created successfully", order_id: order.id, newPayment });
    }
    catch(error){
        console.error('Error creating payment:', error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports.getPayment = async (req, res) => {
    try{
        const payment = await Payment.find();
        res.json(payment);
    }
    catch(error){
        console.error(err.message);
        res.status(500).json({ message: error.message });
    }
};
module.exports.deletePayment = async (req, res) =>{
    try{
        const { id } = req.params;
        const deletePayment = await Payment.findByIdAndDelete(id);
        if(!deletePayment){
            return res.status(404).json({ msg : "Payment Data Not Found" });
        }
        res.json({ msg: "Payment deleted succsessfully", deletePayment });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ err: err.message });
    }
}