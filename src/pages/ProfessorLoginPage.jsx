import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/customSupabaseClient';

const ProfessorLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
          if (user) {
            const { data } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', user.id)
              .single();
            if (data?.role === 'professor') {
              navigate('/professor/painel');
            }
          }
        };
        checkUser();
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await signIn(email, password);
        if (!error) {
            // Success is handled by useEffect
        }
        setLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>Login do Professor - Conexión América</title>
                <meta name="description" content="Acesse o painel do professor para gerenciar suas aulas e alunos." />
            </Helmet>
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg"
                >
                    <div>
                        <h1 className="text-center text-3xl font-extrabold text-gray-900">
                            Painel do Professor
                        </h1>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Acesse sua conta para continuar
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <Input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="rounded-t-md"
                                    placeholder="Endereço de e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="rounded-b-md"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default ProfessorLoginPage;