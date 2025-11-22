import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ana Clara",
    role: "Aluna do Plano Flexível",
    text: "As aulas são super personalizadas! O professor adaptou o conteúdo para minhas necessidades profissionais e, em poucos meses, já me sinto muito mais segura em reuniões em espanhol.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Lucas Martins",
    role: "Aluno do Plano Foco",
    text: "A flexibilidade de horários foi o que mais me atraiu. Consigo encaixar as aulas na minha rotina corrida e o progresso é notável. Os professores nativos fazem toda a diferença na pronúncia.",
    avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac5c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Sofia Ribeiro",
    role: "Aluna do Plano Intensivo",
    text: "Estou amando a metodologia! As aulas são dinâmicas, focadas em conversação, e o suporte pelo WhatsApp é um grande diferencial. Recomendo a Conexión América de olhos fechados!",
    avatar: "https://images.unsplash.com/photo-1605496036006-fa34384b6f63?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const TestimonialCard = ({ name, role, text, avatar, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full"
  >
    <img className="w-24 h-24 rounded-full mb-4 object-cover shadow-md" alt={`Foto de ${name}`} src={avatar} />
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
    <p className="text-gray-600 italic mb-4 flex-grow">"{text}"</p>
    <div className="mt-auto">
      <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
      <p className="text-blue-500 font-medium">{role}</p>
    </div>
  </motion.div>
);

const Testimonials = () => {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900">O que nossos alunos dizem</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Histórias de sucesso de quem já está trilhando o caminho para a fluência.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} index={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;