import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import PackageSocialProofPopup from '@/components/PackageSocialProofPopup';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg, index }) => {

    const handlePurchase = () => {
        // Redirige al usuario al enlace proporcionado
        window.location.href = "https://biolivre.com.br/conexionamerica";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col p-8 rounded-2xl border-2 ${pkg.popular ? 'bg-blue-500 text-white border-blue-600 shadow-2xl' : 'bg-white text-gray-800 border-gray-200 shadow-lg'}`}
        >
            {pkg.popular && (
                <div className="self-center -mt-12 mb-4 bg-white text-blue-500 font-bold px-4 py-1 rounded-full shadow-md">MAIS POPULAR</div>
            )}
            <h3 className="text-3xl font-extrabold text-center mb-2">{pkg.name}</h3>
            <p className={`text-center mb-6 h-12 ${pkg.popular ? 'text-blue-100' : 'text-gray-500'}`}>{pkg.description}</p>
            <div className={`text-5xl font-bold text-center mb-6 ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                {pkg.price}
                <span className={`text-lg font-medium ${pkg.popular ? 'text-blue-200' : 'text-gray-500'}`}>/mês</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <Check className={`mr-3 mt-1 h-5 w-5 flex-shrink-0 ${pkg.popular ? 'text-white' : 'text-green-500'}`} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <Button
                onClick={handlePurchase}
                size="lg"
                className={`w-full text-lg font-bold ${pkg.popular ? 'bg-white text-blue-500 hover:bg-gray-100' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
                Adquirir plano
            </Button>
        </motion.div>
    );
};

const PackagesPage = () => {
    const packages = [
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
            popular: true,
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
        },
    ];

    return (
        <>
            <Helmet>
                <title>Pacotes - Conexión América</title>
                <meta name="description" content="Escolha o plano de espanhol ideal para você e comece sua jornada para a fluência." />
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