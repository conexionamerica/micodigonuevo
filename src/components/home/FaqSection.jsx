import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const FaqSection = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const faqs = [
        { question: "Quem são os professores?", answer: "Nossos professores são nativos ou altamente qualificados, com experiência comprovada no ensino de espanhol como segunda língua. Cada instrutor passa por um rigoroso processo de seleção e treinamento." },
        { question: "Como funcionam as aulas ao vivo?", answer: "As aulas são realizadas online via Google Meet, com horários flexíveis de acordo com sua disponibilidade. Cada sessão é individual e focada em suas necessidades específicas." },
        { question: "Posso cancelar a qualquer momento?", answer: "Sim! Nossa política é flexível. Você pode pausar ou cancelar seu plano a qualquer momento sem burocracias, priorizando sempre seu bem-estar e satisfação." },
        { question: "Qual é o método de ensino utilizado?", answer: "Utilizamos uma metodologia comunicativa e prática, focada na conversação real. Mesclamos exercícios interativos, situações do dia a dia e feedbacks personalizados para acelerar sua fluência." },
        { question: "Preciso de material didático?", answer: "Não se preocupe! Todo o material necessário é fornecido digitalmente por nós. Você receberá apostilas, exercícios e recursos complementares sem custo adicional." },
        { question: "Como faço para agendar as aulas?", answer: "Após a contratação do pacote, você terá acesso a um painel exclusivo onde poderá agendar suas aulas de acordo com sua disponibilidade e a do professor." },
        { question: "Há aulas em grupo ou apenas individuais?", answer: "Todas as nossas aulas são individuais (one-on-one), garantindo atenção 100% personalizada e progresso mais rápido." },
        { question: "Qual o nível mínimo exigido?", answer: "Aceitamos alunos de todos os níveis, desde iniciantes absolutos até avançados que desejam aperfeiçoamento ou preparação para exames." },
        { question: "Como funciona a aula experimental?", answer: "A aula experimental é gratuita e sem compromisso. Você conhecerá o professor, experimentará nossa metodologia e tirará todas as suas dúvidas antes de se comprometer com um pacote." },
        { question: "Oferecem certificado de conclusão?", answer: "Sim! Ao completar os níveis propostos, você receberá um certificado digital reconhecendo seu progresso e dedicação." },
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="faq" className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Tire todas as suas dúvidas
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar perguntas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {filteredFaqs.length > 0 ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Accordion.Root type="single" collapsible className="space-y-4">
                                {filteredFaqs.map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Accordion.Item
                                            value={`item-${index}`}
                                            className="bg-gray-50 rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-300 group"
                                        >
                                            <Accordion.Header>
                                                <Accordion.Trigger className="flex justify-between items-center w-full p-6 text-left group-hover:bg-blue-50 transition-colors">
                                                    <span className="text-lg font-bold text-gray-800 pr-4">{faq.question}</span>
                                                    <ChevronDown className="h-5 w-5 text-blue-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                                                </Accordion.Trigger>
                                            </Accordion.Header>
                                            <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                                <div className="p-6 pt-0 text-gray-600 leading-relaxed">{faq.answer}</div>
                                            </Accordion.Content>
                                        </Accordion.Item>
                                    </motion.div>
                                ))}
                            </Accordion.Root>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-12"
                        >
                            <p className="text-xl text-gray-600 mb-4">
                                Nenhuma pergunta encontrada para "{searchTerm}"
                            </p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-blue-500 hover:text-blue-600 font-semibold underline"
                            >
                                Limpar busca
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Still have questions CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Ainda tem dúvidas?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Nossa equipe está pronta para ajudar você!
                    </p>
                    <a
                        href="https://wa.me/555198541835"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        Falar no WhatsApp 💬
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FaqSection;
