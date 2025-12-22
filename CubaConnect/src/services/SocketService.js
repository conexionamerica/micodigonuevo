import io from 'socket.io-client';
import CompressionService from './CompressionService';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Servicio de Socket optimizado para redes lentas
 * Implementa reconexión automática, compresión y cola de mensajes
 */
class SocketService {
    constructor() {
        this.socket = null;
        this.connected = false;
        this.messageQueue = [];
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 10;
        this.reconnectDelay = 1000; // Empieza con 1 segundo
        this.listeners = {};
    }

    /**
     * Conecta al servidor Socket.IO
     * @param {string} url - URL del servidor
     * @param {Object} options - Opciones de conexión
     */
    connect(url, options = {}) {
        const defaultOptions = {
            transports: ['websocket'], // Solo WebSocket, más eficiente que polling
            upgrade: false,
            reconnection: true,
            reconnectionDelay: this.reconnectDelay,
            reconnectionDelayMax: 30000, // Máximo 30 segundos
            reconnectionAttempts: this.maxReconnectAttempts,
            timeout: 20000, // 20 segundos de timeout
            compress: true, // Habilitar compresión en el socket
            perMessageDeflate: {
                threshold: 1024 // Comprimir mensajes > 1KB
            },
            ...options
        };

        this.socket = io(url, defaultOptions);

        this.setupEventListeners();
        return this.socket;
    }

    /**
     * Configura los event listeners del socket
     */
    setupEventListeners() {
        this.socket.on('connect', () => {
            console.log('✅ Socket connected');
            this.connected = true;
            this.reconnectAttempts = 0;
            this.reconnectDelay = 1000;

            // Enviar mensajes en cola
            this.flushMessageQueue();

            // Notificar a los listeners
            this.emit('connected');
        });

        this.socket.on('disconnect', (reason) => {
            console.log('❌ Socket disconnected:', reason);
            this.connected = false;
            this.emit('disconnected', reason);
        });

        this.socket.on('connect_error', (error) => {
            console.error('🔴 Connection error:', error);
            this.handleReconnect();
        });

        this.socket.on('reconnect_attempt', (attemptNumber) => {
            console.log(`🔄 Reconnect attempt ${attemptNumber}`);
            this.reconnectAttempts = attemptNumber;
            this.emit('reconnecting', attemptNumber);
        });

        this.socket.on('reconnect', (attemptNumber) => {
            console.log(`✅ Reconnected after ${attemptNumber} attempts`);
            this.emit('reconnected', attemptNumber);
        });

        this.socket.on('reconnect_failed', () => {
            console.error('❌ Reconnection failed');
            this.emit('reconnect_failed');
        });

        // Eventos personalizados
        this.socket.on('message', (data) => {
            const decompressed = CompressionService.decompressMessage(data);
            this.emit('message', decompressed);
        });

        this.socket.on('typing', (data) => {
            this.emit('typing', data);
        });

        this.socket.on('call', (data) => {
            this.emit('call', data);
        });
    }

    /**
     * Maneja la reconexión con backoff exponencial
     */
    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            // Backoff exponencial: 1s, 2s, 4s, 8s, 16s, 30s (max)
            this.reconnectDelay = Math.min(
                this.reconnectDelay * 2,
                30000
            );
        }
    }

    /**
     * Envía un mensaje (con compresión y cola)
     * @param {string} event - Nombre del evento
     * @param {Object} data - Datos a enviar
     * @param {boolean} compress - Si debe comprimir el mensaje
     */
    emit(event, data, compress = true) {
        const message = {
            event,
            data: compress ? CompressionService.compressMessage(data) : data,
            timestamp: Date.now()
        };

        if (this.connected) {
            this.socket.emit(event, message.data);
            this.saveToHistory(message);
        } else {
            // Agregar a la cola si no está conectado
            this.messageQueue.push(message);
            this.saveMessageQueue();
        }
    }

    /**
     * Envía todos los mensajes en cola
     */
    async flushMessageQueue() {
        if (this.messageQueue.length === 0) return;

        console.log(`📤 Sending ${this.messageQueue.length} queued messages`);

        const queue = [...this.messageQueue];
        this.messageQueue = [];

        for (const message of queue) {
            this.socket.emit(message.event, message.data);
            await new Promise(resolve => setTimeout(resolve, 100)); // Pequeño delay entre mensajes
        }

        await this.saveMessageQueue();
    }

    /**
     * Escucha un evento
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Función callback
     */
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    /**
     * Deja de escuchar un evento
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Función callback
     */
    off(event, callback) {
        if (!this.listeners[event]) return;

        this.listeners[event] = this.listeners[event].filter(
            cb => cb !== callback
        );
    }

    /**
     * Notifica a todos los listeners de un evento
     * @param {string} event - Nombre del evento
     * @param {*} data - Datos del evento
     */
    notifyListeners(event, data) {
        if (!this.listeners[event]) return;

        this.listeners[event].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error in listener for ${event}:`, error);
            }
        });
    }

    /**
     * Guarda la cola de mensajes en AsyncStorage
     */
    async saveMessageQueue() {
        try {
            await AsyncStorage.setItem(
                'messageQueue',
                JSON.stringify(this.messageQueue)
            );
        } catch (error) {
            console.error('Error saving message queue:', error);
        }
    }

    /**
     * Carga la cola de mensajes desde AsyncStorage
     */
    async loadMessageQueue() {
        try {
            const queue = await AsyncStorage.getItem('messageQueue');
            if (queue) {
                this.messageQueue = JSON.parse(queue);
            }
        } catch (error) {
            console.error('Error loading message queue:', error);
        }
    }

    /**
     * Guarda un mensaje en el historial
     * @param {Object} message - Mensaje a guardar
     */
    async saveToHistory(message) {
        try {
            const history = await AsyncStorage.getItem('messageHistory') || '[]';
            const messages = JSON.parse(history);
            messages.push(message);

            // Mantener solo los últimos 1000 mensajes
            if (messages.length > 1000) {
                messages.shift();
            }

            await AsyncStorage.setItem('messageHistory', JSON.stringify(messages));
        } catch (error) {
            console.error('Error saving to history:', error);
        }
    }

    /**
     * Desconecta el socket
     */
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.connected = false;
        }
    }

    /**
     * Verifica si está conectado
     * @returns {boolean}
     */
    isConnected() {
        return this.connected && this.socket && this.socket.connected;
    }

    /**
     * Obtiene el estado de la conexión
     * @returns {Object}
     */
    getStatus() {
        return {
            connected: this.connected,
            reconnectAttempts: this.reconnectAttempts,
            queuedMessages: this.messageQueue.length,
            socketId: this.socket?.id
        };
    }
}

export default new SocketService();
