const Notification = require('../models/NotificationModel');

module.exports.createNotification = async (req, res) => {
    try{
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json(notification);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

module.exports.getNotifications = async (req, res) => {
    try{
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } 
    catch(error){
        res.status(500).json({ error: error.message });
    }
};

module.exports.markAsRead = async (req, res) => {
    try{
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );
        if(!notification){
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json(notification);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' , notification });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteAllNotifications = async (req, res) => {
    try {
        const deleteAllNotifications = await Notification.deleteMany();
        res.status(200).json({ message: 'All notifications deleted successfully' , deleteAllNotifications });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};

module.exports.acceptNotification = async (req, res) => {
    try{
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id,
            { status: 'Accepted' },
            { new: true }
        );
        if(!notification){
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json(notification);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};

module.exports.declineNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id,
            { status: 'Declined' },
            { new: true }
        );
        if(!notification){
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json(notification);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};