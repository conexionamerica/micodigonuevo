import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PackagesCTASection = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Encontre o plano ideal para você
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Conheça nossos pacotes e veja qual se encaixa perfeitamente em seus objetivos e rotina. A fluência está a um passo de distância!
                    </p>
                    <Link to="/pacotes">
                        <Button size="lg" className="mt-8 bg-blue-500 hover:bg-blue-600 text-lg group">
                            Conhecer Pacotes
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default PackagesCTASection;
