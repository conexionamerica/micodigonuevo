import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/customSupabaseClient';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsOpen(false);
  };

  const handleExternalRedirect = async (buttonName, url) => {
    // Log button click if needed, but for now, just redirect
    const { error } = await supabase
      .from('button_clicks')
      .insert({ button_name: buttonName, user_id: null });

    if (error) {
      console.error(`Error logging ${buttonName} click:`, error);
      toast({
        variant: "destructive",
        title: "Erro de Redirecionamento",
        description: "Não foi possível registrar o clique. Tentando redirecionar de qualquer maneira.",
      });
    }

    window.location.href = url;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" onClick={scrollToTop} className="text-2xl font-bold text-gray-800 hover:scale-105 transition-transform">
            <span className="text-blue-500">Conexión</span> América
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" onClick={scrollToTop} className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
              Início
            </Link>
            <Link to="/pacotes" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
              Pacotes
            </Link>
            <Button
              asChild
              variant="outline"
              className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold"
            >
              <a
                href="https://aluno.conexionamerica.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <GraduationCap className="h-5 w-5" />
                Portal do Aluno
              </a>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
              <a href="https://wa.me/555198541835" target="_blank" rel="noopener noreferrer">
                Fale Conosco
              </a>
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="/" onClick={scrollToTop} className="block text-gray-700 hover:text-blue-500 transition-colors font-medium">
              Início
            </Link>
            <Link to="/pacotes" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-blue-500 transition-colors font-medium">
              Pacotes
            </Link>
            <Button
              asChild
              variant="outline"
              className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold"
            >
              <a
                href="https://aluno.conexionamerica.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <GraduationCap className="h-5 w-5" />
                Portal do Aluno
              </a>
            </Button>
            <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
              <a href="https://wa.me/555198541835" target="_blank" rel="noopener noreferrer">
                Fale Conosco
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;