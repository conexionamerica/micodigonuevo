import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Zap, Globe, BarChart, Users, Star, ArrowRight } from 'lucide-react';
import SocialProofPopup from '@/components/SocialProofPopup';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    // Here you could send the data to a backend or an email service
    console.log({
      name,
      email,
      whatsapp
    });
    const message = `Olá! Tenho interesse na aula experimental. Meu nome é ${name}, e-mail ${email} e WhatsApp ${whatsapp}.`;
    const whatsappUrl = `https://wa.me/555198541835?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  return <section id="inicio" className="bg-sky-50 pt-16 pb-20 lg:pt-24 lg:pb-32">
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{
        opacity: 0,
        x: -50
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.8
      }}>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Espanhol: O Caminho <span className="text-blue-500">Inteligente</span> para a Fluência.
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Alcance a fluência no Espanhol com aulas personalizadas ao vivo e dinâmicas, ministradas por professores nativos e ancoradas em uma metodologia que garante resultados reais.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-gray-700">
          <div className="flex items-center"><Check className="text-green-500 mr-2" /> Aulas ao vivo</div>
          <div className="flex items-center"><Check className="text-green-500 mr-2" /> Horários flexíveis</div>
          <div className="flex items-center"><Check className="text-green-500 mr-2" /> Foco na prática</div>
        </div>
      </motion.div>
      <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Agende sua aula experimental!</h2>
        <p className="text-center text-gray-500 mt-2 mb-6">É 100% gratuito e sem compromisso.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" placeholder="Seu nome completo" required value={name} onChange={e => setName(e.target.value)} />
          <Input type="email" placeholder="Seu melhor e-mail" required value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="text" placeholder="Seu WhatsApp" required value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          <Button type="submit" size="lg" className="w-full bg-blue-500 hover:bg-blue-600 text-lg">
            Garantir minha aula grátis
          </Button>
        </form>
      </motion.div>
    </div>
  </section>;
};

const PackagesCTASection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Encontre o plano ideal para você
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça nossos pacotes e veja qual se encaixa perfeitamente em seus objetivos e rotina. A fluência está a um passo de distância!
          </p>
          <Link to="/pacotes">
            <Button size="lg" className="mt-8 bg-blue-500 hover:bg-blue-600 text-lg group">
              Conhecer Pacotes
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


const FeaturesSection = () => {
  const features = [{
    icon: Zap,
    title: "Metodologia Ágil",
    description: "Aprenda mais rápido com nosso método focado na prática e conversação."
  }, {
    icon: Globe,
    title: "Flexibilidade Total",
    description: "Estude de onde estiver, no seu ritmo, com aulas que se encaixam na sua rotina."
  }, {
    icon: BarChart,
    title: "Evolução Constante",
    description: "Acompanhe seu progresso com relatórios e feedbacks personalizados."
  }, {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Conecte-se com outros alunos e instrutores, ampliando seu networking."
  }];
  return <section className="py-20 lg:py-28 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">Acelere Seu Sucesso</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} className="bg-white p-8 rounded-2xl text-center hover:bg-sky-100 hover:shadow-lg transition-all">
          <div className="inline-block bg-blue-50 p-4 rounded-full mb-4 shadow-md">
            <feature.icon className="text-blue-500" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>)}
      </div>
    </div>
  </section>;
};

const HowItWorksSection = () => {
  const steps = [{
    title: "1. Faça sua inscrição",
    imageAlt: "Pessoas felizes se inscrevendo em um curso ao ar livre"
  }, {
    title: "2. Conheça seu professor",
    imageAlt: "Professor experiente em uma sala de aula"
  }, {
    title: "3. Inicie sua jornada",
    imageAlt: "Casal estudando e conversando em um campo"
  }];
  return <section className="bg-sky-50 py-20 lg:py-28">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-blue-500">Aprenda de Onde Quiser</h2>
        <p className="text-lg text-gray-600 mt-4">
          Todas as nossas aulas são 100% online, via Google Meet, proporcionando a liberdade de aprender de qualquer dispositivo, onde quer que você esteja.
        </p>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">Evolua seu aprendizado do jeito certo!</h2>
        <p className="text-lg text-gray-600 mt-2">Do básico ao avançado!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.15
        }} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img class="w-full h-64 object-cover" alt={step.imageAlt} src="https://horizons-cdn.hostinger.com/5e4f4b15-412e-4199-a197-257016665a0b/gemini_generated_image_lgadrelgadrelgad-CpLA0.png" />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 text-center">{step.title}</h3>
          </div>
        </motion.div>)}
      </div>
    </div>
  </section>;
};

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
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-600 mb-6 flex-grow">"{testimonial.text}"</p>
              <p className="font-bold text-gray-800 text-right">- {testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PackagesAfterTestimonialsCTA = () => {
  return (
    <section className="bg-sky-50 py-16 lg:py-24 text-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Conheça nossos pacotes e veja qual se encaixa em seus objetivos e rotinas
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Milhares de alunos já transformaram suas vidas com a Conexión América. Seja o próximo a alcançar a fluência em espanhol!
          </p>
          <Link to="/pacotes">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              Ver Todos os Pacotes
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};


const FaqSection = () => {
  const faqs = [{
    q: "Como funcionam as aulas?",
    a: "Nossas aulas são 100% ao vivo, online e personalizadas para seus objetivos. Você agenda os horários que funcionam para você e se conecta com seu professor particular."
  }, {
    q: "Existe idade para começar a estudar?",
    a: "Não há idade! Nossa metodologia se adapta a todas as faixas etárias, de crianças a idosos. O importante é a vontade de aprender."
  }, {
    q: "Tenho garantia de que vou aprender?",
    a: "Sim! Estamos tão confiantes no nosso método que, se você seguir o plano de estudos e não evoluir, oferecemos um plano de recuperação sem custo adicional."
  }, {
    q: "Posso fazer de qualquer lugar?",
    a: "Com certeza! Tudo que você precisa é de uma conexão com a internet. Aprenda de casa, do trabalho ou até mesmo viajando."
  }, {
    q: "Qual é a duração do curso?",
    a: "A duração depende do seu ritmo e do nível de fluência que deseja alcançar. Nossos pacotes são flexíveis para se ajustar à sua necessidade, seja para um aprendizado rápido ou contínuo."
  }];
  return <section id="faq" className="py-20 lg:py-28">
    <div className="container mx-auto px-6 max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">Perguntas Frequentes</h2>
        <p className="text-lg text-gray-600 mt-2">Esclarecemos cada detalhe para você dar o primeiro passo com total segurança</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-sky-50/50 rounded-lg mb-4 border-b-0">
          <AccordionTrigger className="text-left font-semibold text-lg p-6 hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0 text-gray-600">
            {faq.a}
          </AccordionContent>
        </AccordionItem>)}
      </Accordion>
    </div>
  </section>;
};
const HomePage = () => {
  return <>
    <Helmet>
      <title>Conexión América - Espanhol: O Caminho Inteligente para a Fluência</title>
      <meta name="description" content="Alcance a fluência no Espanhol com aulas personalizadas ao vivo, professores nativos e uma metodologia que garante resultados reais." />
    </Helmet>
    <HeroSection />
    <PackagesCTASection />
    <FeaturesSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <PackagesAfterTestimonialsCTA /> {/* New CTA section */}
    <FaqSection />
    <SocialProofPopup />
  </>;
};
export default HomePage;