import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';

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
    return <section id="inicio" className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 pt-20 pb-24 lg:pt-28 lg:pb-36 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div initial={{
                opacity: 0,
                x: -50
            }} animate={{
                opacity: 1,
                x: 0
            }} transition={{
                duration: 0.8
            }}>
                <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    🌟 Método comprovado de fluência
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                    Espanhol: O Caminho <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Inteligente</span> para a Fluência
                </h1>
                <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                    Alcance a fluência no Espanhol com aulas personalizadas ao vivo e dinâmicas, ministradas por professores nativos e ancoradas em uma metodologia que garante resultados reais.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row sm:space-x-8 space-y-3 sm:space-y-0 text-gray-700">
                    <div className="flex items-center text-lg"><Check className="text-green-500 mr-3 h-6 w-6" /> Aulas ao vivo</div>
                    <div className="flex items-center text-lg"><Check className="text-green-500 mr-3 h-6 w-6" /> Horários flexíveis</div>
                    <div className="flex items-center text-lg"><Check className="text-green-500 mr-3 h-6 w-6" /> Foco na prática</div>
                </div>
            </motion.div>
            <motion.div initial={{
                opacity: 0,
                scale: 0.9
            }} animate={{
                opacity: 1,
                scale: 1
            }} transition={{
                duration: 0.8,
                delay: 0.2
            }} className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-gray-800">Agende sua aula experimental!</h2>
                    <p className="text-gray-500 mt-3 text-lg">É 100% gratuito e sem compromisso.</p>
                    <div className="mt-4 inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        ✅ Garantia de satisfação
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        type="text"
                        placeholder="Seu nome completo"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="h-12 text-lg border-2 focus:border-blue-500 rounded-xl"
                    />
                    <Input
                        type="email"
                        placeholder="Seu melhor e-mail"
                        required value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="h-12 text-lg border-2 focus:border-blue-500 rounded-xl"
                    />
                    <Input
                        type="text"
                        placeholder="Seu WhatsApp"
                        required
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        className="h-12 text-lg border-2 focus:border-blue-500 rounded-xl"
                    />
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                    >
                        Garantir minha aula grátis 🎁
                    </Button>
                </form>
            </motion.div>
        </div>
    </section>;
};

export default HeroSection;
