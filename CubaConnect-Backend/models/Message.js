const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: function () {
            return this.type === 'text';
        }
    },
    type: {
        type: String,
        enum: ['text', 'image', 'audio', 'video', 'file'],
        default: 'text'
    },
    mediaUrl: {
        type: String
    },
    compressed: {
        type: Boolean,
        default: true
    },
    compressionRatio: {
        type: Number
    },
    originalSize: {
        type: Number
    },
    compressedSize: {
        type: Number
    },
    delivered: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    readAt: {
        type: Date
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Índices para búsquedas rápidas
messageSchema.index({ sender: 1, receiver: 1, timestamp: -1 });
messageSchema.index({ receiver: 1, read: 1 });

module.exports = mongoose.model('Message', messageSchema);
