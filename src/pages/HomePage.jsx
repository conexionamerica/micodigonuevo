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
      <title>Conexión América - Espanhol: O Caminho Inteligente para a Fluência</title>
      <meta name="description" content="Alcance a fluência no Espanhol com aulas personalizadas ao vivo, professores nativos e uma metodologia que garante resultados reais." />
    </Helmet>
    <DiscountBanner />
    <HeroSection />
    <DiscountBanner />
    <PackagesCTASection />
    <FeaturesSection />
    <StatsSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <PackageComparison />
    <PackagesAfterTestimonialsCTA />
    <FaqSection />
    <SocialProofPopup />
  </>;
};
export default HomePage;