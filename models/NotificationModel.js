const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        name: { 
            type: String 
        },
        message: {
            type: String 
        },
        date: { 
            type: Date, 
            default: Date.now 
        },
        read: { 
            type: Boolean, 
            default: false 
        },
        status: {
            type: String,
            enum: ['Pending', 'Accepted', 'Declined'],
            default: 'Pending',
        },
        users: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
                model: { 
                    type: String, 
                    enum: ['Resident', 'Admin'], 
                    required: true 
                },
            },
        ],
    },
    { timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;