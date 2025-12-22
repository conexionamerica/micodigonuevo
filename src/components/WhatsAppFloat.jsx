import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackWhatsAppClick } from './GoogleAdsConversion';

const WhatsAppFloat = () => {
    const handleWhatsAppClick = () => {
        // Rastrear conversión de Google Ads
        trackWhatsAppClick();

        const message = encodeURIComponent('¡Hola! Tengo interés en conocer más sobre los cursos de español de Conexión América.');
        const phoneNumber = '555198541835';
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <motion.button
            onClick={handleWhatsAppClick}
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            >
                <MessageCircle className="h-8 w-8" />
            </motion.div>

            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                ¿Tienes dudas? ¡Habla con nosotros!
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900"></div>
            </div>

            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                1
            </span>
        </motion.button>
    );
};

export default WhatsAppFloat;
