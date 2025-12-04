import React from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
    const steps = [{
        title: "1. Faça sua inscrição",
        imageAlt: "Pessoas felizes se inscrevendo em um curso ao ar livre"
    }, {
        title: "2. Conheça seu professor",
        imageAlt: "Professor experiente em uma sala de aula"
    }, {
        title: "3. Inicie sua jornada",
        imageAlt: "Casal estudando e conversando em um campo"
    }];
    return <section className="bg-sky-50 py-20 lg:py-28">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold text-blue-500">Aprenda de Onde Quiser</h2>
                <p className="text-lg text-gray-600 mt-4">
                    Todas as nossas aulas são 100% online, via Google Meet, proporcionando a liberdade de aprender de qualquer dispositivo, onde quer que você esteja.
                </p>
            </div>
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900">Evolua seu aprendizado do jeito certo!</h2>
                <p className="text-lg text-gray-600 mt-2">Do básico ao avançado!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => <motion.div key={index} initial={{
                    opacity: 0,
                    y: 50
                }} whileInView={{
                    opacity: 1,
                    y: 0
                }} viewport={{
                    once: true
                }} transition={{
                    duration: 0.5,
                    delay: index * 0.15
                }} whileHover={{
                    y: -12,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                }} className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                    {/* Number Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-300">
                        {index + 1}
                    </div>
                    <div className="overflow-hidden">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-64 object-cover"
                            alt={step.imageAlt}
                            src="https://horizons-cdn.hostinger.com/5e4f4b15-412e-4199-a197-257016665a0b/gemini_generated_image_lgadrelgadrelgad-CpLA0.png"
                        />
                    </div>
                    <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                        <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-blue-600 transition-colors">{step.title}</h3>
                    </div>
                </motion.div>)}
            </div>
        </div>
    </section>;
};

export default HowItWorksSection;
