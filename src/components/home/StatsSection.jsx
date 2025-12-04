import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Award, TrendingUp } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const StatCard = ({ icon: Icon, value, label, suffix = "", delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(value);
            if (start === end) return;

            const timer = setInterval(() => {
                start += Math.ceil(end / 50);
                if (start > end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, 30);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group cursor-pointer border-2 border-transparent hover:border-blue-500"
        >
            <motion.div
                className="inline-block bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-full mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
            >
                <Icon className="text-blue-500 group-hover:text-indigo-600 transition-colors" size={40} />
            </motion.div>
            <div className="text-4xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {count}{suffix}
            </div>
            <p className="text-gray-600 font-medium">{label}</p>
        </motion.div>
    );
};

const StatsSection = () => {
    const stats = [
        { icon: Award, value: "98", label: "Taxa de Satisfação", suffix: "%" },
        { icon: TrendingUp, value: "95", label: "Alunos Recomendam", suffix: "%" },
    ];

    return (
        <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
                    >
                        Resultados que Falam por Si
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600"
                    >
                        Números que comprovam nossa excelência
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl mx-auto">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
