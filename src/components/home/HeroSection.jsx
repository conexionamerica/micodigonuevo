import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import DiscountBanner from './DiscountBanner';

const HeroSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        // Here you could send the data to a backend or an email service
        console.log({
            name,
            email,
            whatsapp
        });
        const message = `Olá! Tenho interesse na aula experimental. Meu nome é ${name}, e-mail ${email} e WhatsApp ${whatsapp}.`;
        const whatsappUrl = `https://wa.me/555198541835?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    return <section id="inicio" className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 py-6 sm:py-8 lg:py-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center relative z-10">
            <div className="pl-4 sm:pl-6 lg:pl-0">
                <div className="inline-block mb-2 sm:mb-3 px-3 py-1 sm:px-3 sm:py-1.5 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                    🌟 Método comprovado
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight break-words mb-3 sm:mb-4">
                    Espanhol: O Caminho <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Inteligente</span> para a Fluência
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-snug mt-3 sm:mt-4">
                    Alcance a fluência no Espanhol com aulas personalizadas ao vivo e dinâmicas, ministradas por professores nativos e ancoradas em uma metodologia que garante resultados reais.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 text-gray-700 mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg">
                    <div className="flex items-center">
                        <Check className="text-green-500 mr-2 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Aulas ao vivo</span>
                    </div>
                    <div className="flex items-center">
                        <Check className="text-green-500 mr-2 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Horários flexíveis</span>
                    </div>
                    <div className="flex items-center">
                        <Check className="text-green-500 mr-2 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Foco na prática</span>
                    </div>
                </div>
            </div>
            <div className="pl-4 sm:pl-6 lg:pl-0">
                <div className="form-container bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 mx-auto max-w-sm lg:max-w-md p-4 sm:p-5 lg:p-6">
                    <div className="text-center mb-3 sm:mb-4 lg:mb-5">
                        <h2 className="text-xl sm:text-2xl lg:text-2xl font-black text-gray-800">
                            Agende sua aula experimental!
                        </h2>
                        <p className="text-sm sm:text-base lg:text-base text-gray-500 mt-1.5">
                            É 100% gratuito e sem compromisso.
                        </p>
                        <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-green-100 text-green-700 rounded-full font-semibold mt-2 sm:mt-3 text-sm">
                            ✅ Garantia de satisfação
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4">
                        <Input
                            type="text"
                            placeholder="Seu nome completo"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="h-11 sm:h-12 lg:h-12 text-base border-2 focus:border-blue-500 rounded-lg"
                        />
                        <Input
                            type="email"
                            placeholder="Seu melhor e-mail"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="h-11 sm:h-12 lg:h-12 text-base border-2 focus:border-blue-500 rounded-lg"
                        />
                        <Input
                            type="text"
                            placeholder="Seu WhatsApp"
                            required
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                            className="h-11 sm:h-12 lg:h-12 text-base border-2 focus:border-blue-500 rounded-lg"
                        />
                        <Button
                            type="submit"
                            size="default"
                            className="h-12 sm:h-13 lg:h-14 text-base sm:text-lg w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 font-bold shadow-lg"
                        >
                            Garantir minha aula grátis 🎁
                        </Button>
                    </form>
                </div>
                {/* Banner de promoción debajo del formulario */}
                <div className="mt-4">
                    <DiscountBanner />
                </div>
            </div>
        </div>
    </section>;
};

export default HeroSection;
