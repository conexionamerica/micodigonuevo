import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

const names = ["Roberto", "Juliana", "Fernando", "Carla", "Lucas", "Mariana", "Ricardo", "Beatriz", "Thiago", "Sofia"];
const actions = ["agendou uma aula experimental", "acabou de se inscrever", "iniciou no plano Foco", "garantiu sua vaga"];

const SocialProofPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState({ name: '', action: '' });

    useEffect(() => {
        const showPopup = () => {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            setContent({ name: randomName, action: randomAction });
            setIsVisible(true);

            // Hide after 5 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        const scheduleNextPopup = () => {
            const randomInterval = Math.random() * (20000 - 8000) + 8000; // between 8-20 seconds
            setTimeout(() => {
                showPopup();
                scheduleNextPopup();
            }, randomInterval);
        };
        
        // Initial popup after a few seconds
        const initialTimeout = setTimeout(scheduleNextPopup, 7000);

        return () => clearTimeout(initialTimeout);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="fixed bottom-5 left-5 z-50 bg-white p-4 rounded-xl shadow-2xl flex items-center border border-gray-200"
                    style={{ minWidth: '250px' }}
                >
                    <div className="bg-blue-100 text-blue-500 rounded-full p-2 mr-4">
                        <Bell size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">{content.name}</p>
                        <p className="text-sm text-gray-600">{content.action}!</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SocialProofPopup;