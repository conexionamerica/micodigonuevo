import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';

const ProfessorPanelPage = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/professor/login');
    };

    return (
        <>
            <Helmet>
                <title>Painel do Professor - Conexión América</title>
                <meta name="description" content="Gerencie suas aulas, alunos e horários." />
            </Helmet>
            <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto px-6"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo(a) ao seu Painel!</h1>
                            <p className="text-gray-600">Olá, {user?.email}!</p>
                        </div>
                        <Button onClick={handleLogout} variant="outline">
                            Sair
                        </Button>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Em breve...</h2>
                        <p className="text-gray-600">
                            Este é o seu espaço exclusivo. Em breve, você poderá gerenciar suas aulas, horários, e interagir com seus alunos diretamente por aqui. Fique de olho nas novidades!
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default ProfessorPanelPage;