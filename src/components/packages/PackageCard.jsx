import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PackageCard = ({ pkg, index }) => {

    const handlePurchase = () => {
        // Redirige al usuario al enlace proporcionado
        window.location.href = "https://biolivre.com.br/conexionamerica";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col p-8 rounded-3xl border-2 overflow-hidden ${pkg.popular
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400 shadow-2xl'
                : 'bg-white text-gray-800 border-gray-200 shadow-xl hover:shadow-2xl'
                } transition-all duration-300`}
        >
            {/* Discount Badge */}
            {pkg.discount && (
                <div className="absolute top-4 right-4 z-10">
                    <div className={`${pkg.discount === 50
                        ? 'bg-gradient-to-r from-red-500 to-pink-500'
                        : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                        } text-white font-extrabold text-sm px-4 py-2 rounded-full shadow-lg transform rotate-3 animate-pulse`}>
                        {pkg.discount}% OFF
                    </div>
                </div>
            )}

            {pkg.popular && (
                <div className="self-center -mt-8 mb-8 bg-white text-blue-500 font-bold px-6 py-2 rounded-full shadow-lg animate-bounce">
                    ⭐ MAIS POPULAR ⭐
                </div>
            )}

            <h3 className="text-3xl font-extrabold text-center mb-2">{pkg.name}</h3>
            <p className={`text-center mb-6 h-12 ${pkg.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                {pkg.description}
            </p>

            <div className={`text-5xl font-bold text-center mb-6 ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                {pkg.price}
                <span className={`text-lg font-medium ${pkg.popular ? 'text-blue-200' : 'text-gray-500'}`}>
                    {pkg.name.includes('Personalizado') ? '/aula' : '/mês'}
                </span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <Check className={`mr-3 mt-1 h-5 w-5 flex-shrink-0 ${pkg.popular ? 'text-white' : 'text-green-500'}`} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                onClick={handlePurchase}
                size="lg"
                className={`w-full text-lg font-bold shadow-lg transform transition-all hover:scale-105 ${pkg.popular
                    ? 'bg-white text-blue-500 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    }`}
            >
                Adquirir plano 🚀
            </Button>
        </motion.div>
    );
};

export default PackageCard;
