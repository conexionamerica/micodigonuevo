const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Obtener mensajes de una conversación
router.get('/:userId/:otherUserId', async (req, res) => {
    try {
        const { userId, otherUserId } = req.params;
        const { limit = 50, skip = 0 } = req.query;

        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: otherUserId },
                { sender: otherUserId, receiver: userId }
            ]
        })
            .sort({ timestamp: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .populate('sender', 'username avatar')
            .populate('receiver', 'username avatar');

        res.json(messages.reverse());
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo mensajes' });
    }
});

module.exports = router;
