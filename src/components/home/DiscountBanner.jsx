import React, { useState, useEffect } from 'react';
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
        <div className="banner-fade-in bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg relative overflow-hidden py-3 px-4 sm:py-4 sm:px-5">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute w-64 h-64 bg-white rounded-full -top-32 -left-32 animate-pulse"></div>
                <div className="absolute w-64 h-64 bg-white rounded-full -bottom-32 -right-32 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto flex flex-col items-center justify-center text-center relative z-10 gap-2.5 sm:gap-3">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row items-center w-full justify-center gap-2">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <AlertCircle className="flex-shrink-0 animate-pulse w-5 h-5 sm:w-6 sm:h-6" />
                        <div className="flex-1">
                            <h3 className="text-base sm:text-lg lg:text-xl font-black flex items-center gap-1.5 justify-center md:justify-start">
                                <Percent className="w-4 h-4 sm:w-5 sm:h-5" />
                                Promoção de Lançamento!
                            </h3>
                            <p className="text-sm sm:text-base leading-tight px-1 md:px-0 mt-1">
                                <span className="font-extrabold text-yellow-300">50% OFF</span> no Personalizado
                                <span className="hidden sm:inline"> • </span>
                                <span className="block sm:inline mt-0.5 sm:mt-0">
                                    <span className="font-extrabold text-yellow-300">30% OFF</span> nos demais
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-2">
                    <Clock className="animate-pulse w-4 h-4 sm:w-5 sm:h-5" />
                    <div className="flex gap-1.5 sm:gap-2">
                        {[
                            { value: timeLeft.days, label: 'Dias' },
                            { value: timeLeft.hours, label: 'Horas' },
                            { value: timeLeft.minutes, label: 'Min' },
                            { value: timeLeft.seconds, label: 'Seg' }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 min-w-[32px] sm:min-w-[40px]">
                                    <span className="text-sm sm:text-base font-black">{String(item.value).padStart(2, '0')}</span>
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold mt-0.5">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <Link to="/pacotes" className="w-full md:w-auto">
                    <Button
                        size="default"
                        className="w-full md:w-auto bg-white text-red-600 hover:bg-gray-100 font-bold shadow-lg text-sm sm:text-base px-5 py-2.5"
                    >
                        Ver Pacotes 🎁
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default DiscountBanner;
