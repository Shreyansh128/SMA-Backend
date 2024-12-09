const express = require('express');
const multer = require('multer');
const Message = require('../models/MessageModel');
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'backend/uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Send message route
router.post('/send', upload.single('media'), async (req, res) => {
	const { senderId, receiverId, message } = req.body;
	const mediaPath = req.file ? `/uploads/${req.file.filename}` : null;

	const newMessage = new Message({
		senderId,
		receiverId,
		message,
		media: mediaPath,
	});

	await newMessage.save();
	res.status(200).json({ message: 'Message sent', newMessage });
});

module.exports = router;