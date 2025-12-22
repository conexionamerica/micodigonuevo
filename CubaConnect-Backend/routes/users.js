const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Buscar usuarios
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('-password').limit(20);

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error buscando usuarios' });
    }
});

// Obtener perfil de usuario
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo usuario' });
    }
});

module.exports = router;
