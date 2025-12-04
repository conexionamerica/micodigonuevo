import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const PackageComparison = () => {
    const features = [
        { name: 'Aulas ao vivo individuais', ligero: true, avanzado: true, completo: true, intensivo: true, personalizado: true },
        { name: 'Professores nativos', ligero: true, avanzado: true, completo: true, intensivo: true, personalizado: true },
        { name: 'Material didático incluído', ligero: true, avanzado: true, completo: true, intensivo: true, personalizado: true },
        { name: 'Suporte via WhatsApp 24/7', ligero: true, avanzado: true, completo: true, intensivo: true, personalizado: true },
        { name: 'Feedback detalhado', ligero: true, avanzado: true, completo: true, intensivo: true, personalizado: true },
        { name: 'Flexibilidade de horários', ligero: 'Média', avanzado: 'Alta', completo: 'Alta', intensivo: 'Alta', personalizado: 'Total' },
        { name: 'Aulas por mês', ligero: '8', avanzado: '12', completo: '16', intensivo: '20', personalizado: 'Você escolhe' },
        { name: 'Duração por aula', ligero: '45min', avanzado: '45min', completo: '60min', intensivo: '60min', personalizado: 'Flexível' },
        { name: 'Certificado digital', ligero: true, avanzado: true, completo: true, intensivo: true, personalizado: true },
        { name: 'Workshops especiais', ligero: false, avanzado: false, completo: true, intensivo: true, personalizado: false },
        { name: 'Preço', ligero: 'R$219', avanzado: 'R$309', completo: 'R$379', intensivo: 'R$429', personalizado: 'R$9/aula' },
    ];

    const packages = [
        { id: 'ligero', name: '✨ Ligero', popular: false },
        { id: 'avanzado', name: '🚀 Avanzado', popular: false },
        { id: 'completo', name: '💎 Completo', popular: false },
        { id: 'intensivo', name: '⚡ Intensivo', popular: false },
        { id: 'personalizado', name: '🎯 Personalizado', popular: true },
    ];

    const renderCell = (value) => {
        if (value === true) {
            return <Check className="text-green-500 mx-auto" size={24} />;
        }
        if (value === false) {
            return <X className="text-gray-300 mx-auto" size={24} />;
        }
        return <span className="font-semibold text-gray-900">{value}</span>;
    };

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Compare Nossos Pacotes
                    </h2>
                    <p className="text-xl text-gray-600">
                        Escolha o que melhor se adapta às suas necessidades
                    </p>
                </motion.div>

                {/* Mobile View - Cards */}
                <div className="lg:hidden space-y-6">
                    {packages.map((pkg, pkgIndex) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: pkgIndex * 0.1 }}
                            className={`rounded-2xl overflow-hidden ${pkg.popular ? 'border-4 border-blue-500 shadow-2xl' : 'border-2 border-gray-200 shadow-lg'
                                }`}
                        >
                            <div className={`p-6 ${pkg.popular ? 'bg-blue-500 text-white' : 'bg-gray-50'}`}>
                                <h3 className="text-2xl font-bold text-center">{pkg.name}</h3>
                                {pkg.popular && (
                                    <div className="text-center mt-2 font-semibold">⭐ MAIS POPULAR ⭐</div>
                                )}
                            </div>
                            <div className="p-6 space-y-4">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600 flex-1">{feature.name}</span>
                                        <div className="flex-shrink-0 ml-4">
                                            {renderCell(feature[pkg.id])}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop View - Table */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="hidden lg:block overflow-x-auto"
                >
                    <table className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                <th className="p-6 text-left font-bold text-gray-900 text-lg">Características</th>
                                {packages.map((pkg) => (
                                    <th key={pkg.id} className={`p-6 text-center ${pkg.popular ? 'bg-blue-500 text-white' : ''}`}>
                                        <div className="text-xl font-bold">{pkg.name}</div>
                                        {pkg.popular && <div className="text-sm mt-1">⭐ MAIS POPULAR ⭐</div>}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                                >
                                    <td className="p-6 font-semibold text-gray-900 border-r border-gray-200">{feature.name}</td>
                                    {packages.map((pkg) => (
                                        <td key={pkg.id} className={`p-6 text-center ${pkg.popular ? 'bg-blue-50' : ''}`}>
                                            {renderCell(feature[pkg.id])}
                                        </td>
                                    ))}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <a
                        href="/pacotes"
                        className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                    >
                        Ver Planos Completos 🎯
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default PackageComparison;
