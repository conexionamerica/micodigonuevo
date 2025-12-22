const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const compression = require('compression');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket', 'polling'],
    perMessageDeflate: {
        threshold: 1024
    }
});

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// Almacenamiento en memoria (para demo)
const users = new Map();
const messages = [];
const connectedUsers = new Map();

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: '🇨🇺 CubaConnect Backend API',
        version: '1.0.0',
        status: 'running ✅',
        connectedUsers: connectedUsers.size,
        totalMessages: messages.length
    });
});

// Registro
app.post('/api/auth/register', (req, res) => {
    const { username, email, password } = req.body;

    if (users.has(email)) {
        return res.status(400).json({ error: 'Usuario ya existe' });
    }

    const user = {
        id: Date.now().toString(),
        username,
        email,
        avatar: '👤',
        createdAt: new Date()
    };

    users.set(email, { ...user, password });

    res.json({
        message: 'Registro exitoso',
        token: `token_${user.id}`,
        user
    });
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.get(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
        message: 'Login exitoso',
        token: `token_${user.id}`,
        user: userWithoutPassword
    });
});

// Buscar usuarios
app.get('/api/users/search', (req, res) => {
    const { query } = req.query;
    const userList = Array.from(users.values())
        .filter(u => u.username.toLowerCase().includes(query.toLowerCase()))
        .map(({ password, ...user }) => user);

    res.json(userList);
});

// Socket.IO
io.on('connection', (socket) => {
    console.log(`✅ Usuario conectado: ${socket.id}`);

    socket.on('authenticate', (userId) => {
        connectedUsers.set(userId, socket.id);
        socket.userId = userId;
        socket.broadcast.emit('user_online', { userId });
        console.log(`👤 Usuario autenticado: ${userId}`);
    });

    socket.on('send_message', (data) => {
        const { senderId, receiverId, text } = data;

        const message = {
            id: Date.now().toString(),
            senderId,
            receiverId,
            text,
            timestamp: new Date(),
            delivered: false,
            read: false
        };

        messages.push(message);

        const receiverSocketId = connectedUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receive_message', message);
            message.delivered = true;
        }

        socket.emit('message_sent', message);
        console.log(`📨 Mensaje: ${senderId} → ${receiverId}`);
    });

    socket.on('typing', (data) => {
        const receiverSocketId = connectedUsers.get(data.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('user_typing', { userId: socket.userId });
        }
    });

    socket.on('disconnect', () => {
        if (socket.userId) {
            connectedUsers.delete(socket.userId);
            socket.broadcast.emit('user_offline', { userId: socket.userId });
            console.log(`❌ Usuario desconectado: ${socket.userId}`);
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🇨🇺 CubaConnect Backend Server      ║
║                                        ║
║   Puerto: ${PORT}                         ║
║   Estado: ✅ CORRIENDO                 ║
║   Modo: Demo (Sin BD)                  ║
║                                        ║
║   http://localhost:${PORT}                ║
╚════════════════════════════════════════╝
  `);
});
