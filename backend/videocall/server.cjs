const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"]
    }
});


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());



// API to generate a unique video call link
app.post('/generate-video-call-link', (req, res) => {
    const sessionId = crypto.randomBytes(16).toString('hex');
    const videoCallLink = `http://localhost:5173/${sessionId}`;
    res.json({ link: videoCallLink });
});

// WebSocket for signaling
io.on('connection', (socket) => {
    socket.on('offer', (offer) => socket.broadcast.emit('offer', offer));
    socket.on('answer', (answer) => socket.broadcast.emit('answer', answer));
    socket.on('ice-candidate', (candidate) => socket.broadcast.emit('ice-candidate', candidate));
});

server.listen(3000, () => console.log('Server running on port 3000'));
