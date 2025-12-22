import React from 'react';
import { Helmet } from 'react-helmet';
import SocialProofPopup from '@/components/SocialProofPopup';
import HeroSection from '@/components/home/HeroSection';
import DiscountBanner from '@/components/home/DiscountBanner';
import PackagesCTASection from '@/components/home/PackagesCTASection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PackageComparison from '@/components/home/PackageComparison';
import PackagesAfterTestimonialsCTA from '@/components/home/PackagesAfterTestimonialsCTA';
import FaqSection from '@/components/home/FaqSection';

const HomePage = () => {
  return <>
    <Helmet>
      <title>Conexión América - Aprenda Espanhol Online com Professores Nativos | Aulas ao Vivo</title>
      <meta name="description" content="Escola de espanhol online com professores nativos. Aulas ao vivo personalizadas, metodologia comprovada e certificação internacional. Alcance a fluência em espanhol de forma rápida e eficaz. Teste grátis disponível!" />
      <meta name="keywords" content="curso de espanhol online, aulas de espanhol, professores nativos de espanhol, aprender espanhol, escola de espanhol, espanhol para brasileiros, curso de espanhol ao vivo, aulas particulares de espanhol, espanhol online, fluência em espanhol, aulas de espanhol personalizadas" />
      <link rel="canonical" href="https://www.conexionamerica.com.br/" />

      {/* Open Graph */}
      <meta property="og:title" content="Conexión América - Aprenda Espanhol Online com Professores Nativos" />
      <meta property="og:description" content="Escola de espanhol online com professores nativos. Aulas ao vivo personalizadas, metodologia comprovada e certificação internacional. Teste grátis disponível!" />
      <meta property="og:url" content="https://www.conexionamerica.com.br/" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Conexión América - Aprenda Espanhol Online com Professores Nativos" />
      <meta name="twitter:description" content="Escola de espanhol online com professores nativos. Aulas ao vivo personalizadas e certificação internacional." />
    </Helmet>
    <DiscountBanner />
    <HeroSection />
    <PackagesCTASection />
    <FeaturesSection />
    <StatsSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <PackageComparison />
    <PackagesAfterTestimonialsCTA />
    <FaqSection />
  </>;
};
export default HomePage;