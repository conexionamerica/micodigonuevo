import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PackagesAfterTestimonialsCTA = () => {
    return (
        <section className="bg-sky-50 py-16 lg:py-24 text-center">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                        Conheça nossos pacotes e veja qual se encaixa em seus objetivos e rotinas
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        Milhares de alunos já transformaram suas vidas com a Conexión América. Seja o próximo a alcançar a fluência em espanhol!
                    </p>
                    <Link to="/pacotes">
                        <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                            Ver Todos os Pacotes
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default PackagesAfterTestimonialsCTA;
