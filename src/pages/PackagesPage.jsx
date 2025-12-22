import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import PackageSocialProofPopup from '@/components/PackageSocialProofPopup';
import { Link } from 'react-router-dom';

import PackageCard from '@/components/packages/PackageCard';

const PackagesPage = () => {
    const packages = [
        {
            name: "🎯 Personalizado",
            price: "R$9",
            description: "Monte seu próprio pacote! Você escolhe quantas aulas deseja por mês.",
            features: [
                "R$9 por aula individual",
                "Você escolhe a quantidade de aulas",
                "Horários 100% flexíveis",
                "Duração personalizável por aula",
                "Suporte via WhatsApp 24/7",
                "Feedback detalhado após cada sessão",
            ],
            popular: true,
            discount: 50,
        },
        {
            name: "✨ Ligero",
            price: "R$219",
            description: "Ideal para manter a consistência com um ritmo suave e agradável.",
            features: [
                "8 aulas ao vivo por mês (2 por semana)",
                "Acesso a materiais de apoio e exercícios extra",
                "Horários flexíveis (45 minutos por aula)",
                "Suporte via WhatsApp 24/7",
                "Feedback detalhado após cada sessão",
            ],
            popular: false,
            discount: 30,
        },
        {
            name: "🌟 Foco",
            price: "R$279",
            description: "Perfeito para quem procura uma aprendizagem contínua e consistente.",
            features: [
                "16 aulas ao vivo por mês (4 por semana)",
                "Horários flexíveis (30 minutos por aula)",
                "Acesso completo a todos os materiais",
                "Suporte via WhatsApp 24/7",
                "Feedback detalhado após cada sessão",
            ],
            popular: false,
            discount: 30,
        },
        {
            name: "🌀 Flexível",
            price: "R$284",
            description: "Aulas mais longas com a frequência ideal para um progresso sólido.",
            features: [
                "8 aulas ao vivo por mês (2 por semana)",
                "Horários flexíveis (60 minutos por aula)",
                "Suporte via WhatsApp 24/7",
                "Feedback detalhado após cada sessão",
                "Acesso a workshops exclusivos",
            ],
            popular: false,
            discount: 30,
        },
        {
            name: "⚙️ Constante",
            price: "R$340",
            description: "Mais aulas por semana para manter o ritmo e acelerar a fluidez.",
            features: [
                "12 aulas ao vivo por mês (3 por semana)",
                "Horários flexíveis (45 minutos por aula)",
                "Suporte via WhatsApp 24/7",
                "Feedback detalhado após cada sessão",
                "Acesso a workshops exclusivos",
            ],
            popular: false,
            discount: 30,
        },
        {
            name: "⚡ Intensivo",
            price: "R$416",
            description: "Máxima prática semanal para resultados rápidos e visíveis em pouco tempo.",
            features: [
                "16 aulas ao vivo por mês (4 por semana)",
                "Horários flexíveis (45 minutos por aula)",
                "Suporte prioritário via WhatsApp",
                "Feedback detalhado após cada sessão",
                "Acesso a workshops e eventos especiais",
            ],
            popular: false,
            discount: 30,
        },
    ];

    return (
        <>
            <Helmet>
                <title>Pacotes e Preços - Curso de Espanhol Online | Conexión América</title>
                <meta name="description" content="Escolha o plano de espanhol ideal para você. Pacotes a partir de R$9 por aula. Aulas ao vivo com professores nativos, horários flexíveis e metodologia personalizada. Teste grátis disponível!" />
                <meta name="keywords" content="preço curso espanhol, pacotes de espanhol online, quanto custa curso de espanhol, planos de espanhol, aulas de espanhol preço, curso espanhol valor, pacote aulas espanhol, espanhol online preço" />
                <link rel="canonical" href="https://www.conexionamerica.com.br/pacotes" />

                {/* Open Graph */}
                <meta property="og:title" content="Pacotes e Preços - Curso de Espanhol Online | Conexión América" />
                <meta property="og:description" content="Escolha o plano de espanhol ideal para você. Pacotes a partir de R$9 por aula. Aulas ao vivo com professores nativos." />
                <meta property="og:url" content="https://www.conexionamerica.com.br/pacotes" />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className="bg-sky-50 py-20 lg:py-28">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl font-extrabold text-gray-900">Planos sob medida para você</h1>
                        <p className="mt-4 text-lg text-gray-600">Invista no seu futuro. Escolha o plano que melhor se adapta aos seus objetivos.</p>
                    </motion.div>

                    {/* Top Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6 rounded-xl shadow-lg mb-12 text-center text-lg font-semibold"
                    >
                        ✨ Independentemente do pacote escolhido, cada aula é cuidadosamente planejada e personalizada para atender aos seus objetivos e ritmo de aprendizado! ✨
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => (
                            <PackageCard key={index} pkg={pkg} index={index} />
                        ))}
                    </div>

                    {/* Bottom Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: packages.length * 0.1 + 0.3 }}
                        className="mt-16 p-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-md text-center"
                    >
                        <p className="text-xl font-bold mb-2">Atenção! 💡</p>
                        <p className="text-lg">
                            Cada pacote tem a duração de 1 mês, podendo ser renovado e ajustado conforme suas necessidades e evolução. Sua jornada de aprendizado é flexível e contínua!
                        </p>
                    </motion.div>

                    {/* Terms and Conditions Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: packages.length * 0.1 + 0.5 }}
                        className="mt-12 text-center"
                    >
                        <Link to="/termos-e-condicoes">
                            <Button variant="link" className="text-blue-600 hover:text-blue-800 text-lg">
                                Termos e Condições
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
            <PackageSocialProofPopup />
        </>
    );
};

export default PackagesPage;