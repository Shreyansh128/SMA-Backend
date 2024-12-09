const express = require("express");

const port = 8000;

const path = require('path');

const http = require('http');

const socketIo = require('socket.io');

const db = require("./config/mongoose");

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');

const cors = require('cors');

const multer = require('multer');

const Message = require('./models/MessageModel.js');

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

dotenv.config();
db();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true // enable set cookies
    }
));


app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("./routes/UserRoute.js"));
app.use("/api/users/v2", require("./routes/societyroutes.js"));
app.use("/api/users/v3", require("./routes/ImportantNumroute.js"));
app.use("/api/users/v4", require("./routes/CompalintSubmissionRoute.js"));
app.use("/api/users/v5", require("./routes/profileRoute.js"));
app.use("/api/users/v6", require("./routes/residentRoute.js"));
app.use("/api/users/v7", require("./routes/RequestTrackingRoute.js"));
app.use("/api/users/v8", require("./routes/security_protocol_Route.js"));
app.use("/api/users/v9", require("./routes/visitorTrackingRoute.js"));
app.use("/api/users/v10", require("./routes/SecuritygaurdRoute.js"));
app.use("/api/users/v11", require("./routes/NoteRoute.js"));
app.use("/api/users/v12", require("./routes/ExpensesRoute.js"));
app.use("/api/users/v13", require("./routes/OtherIncomeRoute.js"));
app.use("/api/users/v14", require("./routes/FacilityRoute.js"));
app.use("/api/users/v15", require("./routes/MaintenanceRoute.js"));
app.use("/api/users/v16", require("./routes/PollRoute.js"));
app.use("/api/users/v17", require("./routes/AlertRoute.js"));
app.use("/api/users/v18", require("./routes/RequestSubmissionRoute.js"));
app.use("/api/users/v19", require("./routes/PaymentRoute.js"));
app.use("/api/users/v20", require("./routes/AnnouncementRoute.js"));
app.use("/api/users/v21", require("./routes/NotificationRoute.js"));
app.use("/api/users/v22", require("./routes/MessageRoutes.js"));
app.use("/api/users/v23", require("./routes/ComplaintTrackingRoute.js"));


const storage = multer.diskStorage({
    destination: '/uploads/Chat-Image',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });


app.post('/api/upload', upload.single('media'), (req, res) => {
    if (req.file) {
      res.json({ mediaUrl: `/uploads/${req.file.filename}` });
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
});


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Join event
    socket.on('join', async ({ userId, receiverId }) => {
        socket.userId = userId;
  
        // Fetch chat history between userId and receiverId
        const messages = await Message.find({
            $or: [
            { senderId: userId, receiverId },
            { senderId: receiverId, receiverId: userId },
            ],
        }).sort({ createdAt: 1 });
  
        // Send chat history to the user
        socket.emit('chat history', messages);
    });
  
    // Handle private messages
    socket.on('private message', async (msg) => {
        // Save message to the database
        const savedMessage = await Message.create({
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            message: msg.message,
            media: msg.media,
        });
  
        // Emit the message to both sender and receiver
        io.to(socket.id).emit('private message', savedMessage); // To sender
        socket.broadcast.emit('private message', savedMessage); // To receiver
    });
  
    // Disconnect event
    socket.on('disconnect', () => {
        console.log(`User ${socket.userId || 'unknown'} disconnected`);
    });
});



server.listen(port, (e) => {
    if (e) return false;
    console.log("server is running in " + port);
})  
