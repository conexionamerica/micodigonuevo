import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe, BarChart, Users } from 'lucide-react';

const FeaturesSection = () => {
    const features = [{
        icon: Zap,
        title: "Metodologia Ágil",
        description: "Aprenda mais rápido com nosso método focado na prática e conversação."
    }, {
        icon: Globe,
        title: "Flexibilidade Total",
        description: "Estude de onde estiver, no seu ritmo, com aulas que se encaixam na sua rotina."
    }, {
        icon: BarChart,
        title: "Evolução Constante",
        description: "Acompanhe seu progresso com relatórios e feedbacks personalizados."
    }, {
        icon: Users,
        title: "Comunidade Ativa",
        description: "Conecte-se com outros alunos e instrutores, ampliando seu networking."
    }];
    return <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900">Acelere Seu Sucesso</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => <motion.div key={index} initial={{
                    opacity: 0,
                    y: 50
                }} whileInView={{
                    opacity: 1,
                    y: 0
                }} viewport={{
                    once: true
                }} transition={{
                    duration: 0.5,
                    delay: index * 0.1
                }} whileHover={{
                    y: -10,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                }} className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 cursor-pointer group">
                    <motion.div
                        className="inline-block bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-full mb-6 shadow-md group-hover:shadow-xl"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <feature.icon className="text-blue-500 group-hover:text-indigo-600 transition-colors" size={36} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>)}
            </div>
        </div>
    </section>;
};

export default FeaturesSection;
