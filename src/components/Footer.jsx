import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const scrollToFaq = e => {
    e.preventDefault();
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <footer className="bg-gray-900 text-white">
    <div className="container mx-auto px-6 py-12">
      <div className="bg-blue-500 rounded-lg p-8 text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Pronto para destravar seu potencial?</h2>
        <p className="mb-6">Sua jornada para a fluência começa com o primeiro passo: garanta já sua aula experimental e sinta a diferença.</p>
        <Link to="/" onClick={scrollToTop} className="bg-white text-blue-500 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors inline-block">
          Quero minha aula grátis &raquo;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold mb-4"><span className="text-blue-400">Conexión</span> América</h3>
          <p className="text-gray-400">A qualquer hora, em qualquer lugar...</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
          <ul className="space-y-2">
            <li><a href="#inicio" onClick={e => {
              e.preventDefault();
              scrollToTop();
            }} className="text-gray-400 hover:text-white">Início</a></li>
            <li><Link to="/pacotes" className="text-gray-400 hover:text-white">Pacotes</Link></li>
            <li><Link to="/termos-e-condicoes" className="text-gray-400 hover:text-white">Termos e Condições</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Suporte</h3>
          <ul className="space-y-2">
            <li><a href="https://wa.me/555198541835" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Central de Ajuda</a></li>
            <li><a href="#faq" onClick={scrollToFaq} className="text-gray-400 hover:text-white">Perguntas Frequentes</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Siga-nos</h3>
          <div className="flex justify-center md:justify-start">
            <a href="https://www.instagram.com/conexion_america?igsh=bWR3NHplbG1vcmw4" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 border-t border-gray-800 pt-6 mt-8">
        <p>&copy; {new Date().getFullYear()} Conexión América. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>;
};
export default Footer;