import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const names = ["Roberto", "Juliana", "Fernando", "Carla", "Lucas", "Mariana", "Ricardo", "Beatriz", "Thiago", "Sofia", "Gabriel", "Laura"];
const packageNames = [
    "Foco", "Foco", "Foco", "Foco", // Higher chance for Foco
    "Ligero",
    "Flexível",
    "Constante",
    "Intensivo"
];

const PackageSocialProofPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState({ name: '', pkg: '' });

    useEffect(() => {
        const showPopup = () => {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomPackage = packageNames[Math.floor(Math.random() * packageNames.length)];
            setContent({ name: randomName, pkg: randomPackage });
            setIsVisible(true);

            setTimeout(() => {
                setIsVisible(false);
            }, 5000); // Hide after 5 seconds
        };

        const scheduleNextPopup = () => {
            const randomInterval = Math.random() * (22000 - 9000) + 9000; // Random interval between 9-22 seconds
            setTimeout(() => {
                showPopup();
                scheduleNextPopup();
            }, randomInterval);
        };

        // Initial popup after a few seconds
        const initialTimeout = setTimeout(scheduleNextPopup, 8000);

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
                    style={{ minWidth: '280px' }}
                >
                    <div className="bg-green-100 text-green-500 rounded-full p-2 mr-4">
                        <ShoppingCart size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">{content.name}</p>
                        <p className="text-sm text-gray-600">acabou de adquirir o plano <span className="font-semibold">{content.pkg}</span>!</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PackageSocialProofPopup;