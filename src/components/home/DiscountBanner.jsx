import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Percent, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DiscountBanner = () => {
    // Set countdown to 7 days from now
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Calculate target date (7 days from now)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-6 md:py-5 px-4 md:px-6 shadow-2xl relative overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute w-64 h-64 bg-white rounded-full -top-32 -left-32 animate-pulse"></div>
                <div className="absolute w-64 h-64 bg-white rounded-full -bottom-32 -right-32 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:gap-6 text-center relative z-10">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full justify-center">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-3">
                        <AlertCircle className="h-12 w-12 md:h-8 md:w-8 flex-shrink-0 animate-pulse" />
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-xl lg:text-2xl font-black flex items-center gap-2 justify-center md:justify-start mb-2 md:mb-0">
                                <Percent className="h-7 w-7 md:h-6 md:w-6" />
                                Promoção Especial de Lançamento!
                            </h3>
                            <p className="text-base md:text-sm lg:text-base mt-2 md:mt-1 leading-relaxed">
                                <span className="font-extrabold text-yellow-300 text-lg md:text-base">50% OFF</span> no Pacote Personalizado
                                <span className="hidden sm:inline"> • </span>
                                <span className="block sm:inline mt-1 sm:mt-0">
                                    <span className="font-extrabold text-yellow-300 text-lg md:text-base">30% OFF</span> nos demais pacotes
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-3 md:gap-4">
                    <Clock className="h-6 w-6 md:h-5 md:w-5 animate-pulse" />
                    <div className="flex gap-2 md:gap-3">
                        {[
                            { value: timeLeft.days, label: 'Dias' },
                            { value: timeLeft.hours, label: 'Horas' },
                            { value: timeLeft.minutes, label: 'Min' },
                            { value: timeLeft.seconds, label: 'Seg' }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 md:px-2 md:py-1 min-w-[50px] md:min-w-[45px]">
                                    <span className="text-2xl md:text-xl font-black">{String(item.value).padStart(2, '0')}</span>
                                </div>
                                <span className="text-xs mt-1 font-semibold">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <Link to="/pacotes" className="w-full md:w-auto">
                    <Button
                        size="lg"
                        className="w-full md:w-auto bg-white text-red-600 hover:bg-gray-100 font-bold shadow-xl whitespace-nowrap px-8 py-6 md:py-4 text-lg transform hover:scale-105 transition-all"
                    >
                        Ver Pacotes 🎁
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
};

export default DiscountBanner;
