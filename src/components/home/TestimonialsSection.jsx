import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
        { name: "Larissa Andrade", text: "As aulas são incríveis e os professores muito atenciosos. Recomendo para todos, desde iniciantes até quem já sabe um pouco." },
        { name: "Marcos Vinicius", text: "Minha agenda é sempre corrida, mas o método flexível me permitiu evoluir rápido. Em poucos meses, minha confiança para falar aumentou muito." },
        { name: "Juliana Costa", text: "Plataforma fantástica! A liberdade de agendar as aulas e o foco personalizado dos professores são diferenciais enormes. Vale muito a pena!" },
        { name: "Felipe Martins", text: "O ponto alto é a flexibilidade. As aulas são moldadas para as suas dificuldades, o que torna o aprendizado muito mais eficiente e prazeroso." },
        { name: "Camila Ribeiro", text: "Amei as aulas! O professor me deu total segurança para praticar sem receio de errar. A experiência foi transformadora para mim." },
        { name: "Rodrigo Almeida", text: "Simplesmente sensacional! A escolha do instrutor foi perfeita, ele entendeu exatamente o que eu precisava para destravar a fala." },
    ];

    return (
        <section className="py-20 lg:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900">O que nossos alunos dizem</h2>
                    <p className="mt-4 text-lg text-gray-600">Histórias de sucesso que nos inspiram todos os dias.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                y: -8,
                                scale: 1.03,
                                transition: { duration: 0.3 }
                            }}
                            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-300 transition-all duration-300 cursor-pointer group"
                        >
                            <motion.div
                                className="flex items-center mb-4 gap-1"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.3, rotate: 180 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Star className="text-yellow-400 fill-current group-hover:text-yellow-500 transition-colors" size={20} />
                                    </motion.div>
                                ))}
                            </motion.div>
                            <p className="text-gray-600 mb-6 flex-grow italic leading-relaxed">"{testimonial.text}"</p>
                            <p className="font-bold text-gray-800 text-right group-hover:text-blue-600 transition-colors">- {testimonial.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
