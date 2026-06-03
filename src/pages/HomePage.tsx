import React from 'react';
import Hero from '@/components/sections/Hero';
import Benefits from '@/components/sections/Benefits';
import Services from '@/components/sections/Services';
import Pricing from '@/components/sections/Pricing';
import SocialProof from '@/components/sections/SocialProof';
import Urgency from '@/components/sections/Urgency';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import { ScrollProgressBar } from '@/components/ui/scroll-motion';
import { useSeo } from '@/components/common/Seo';

const HomePage: React.FC = () => {
  useSeo({
    description: 'Hosting web, servidores gaming y soluciones cloud/IA con uptime 99.9% y soporte 24/7 en español. Despliegue en menos de 24 horas.',
    path: '/',
  });
  return (
    <div className="home-modern">
      <ScrollProgressBar />
      <Hero />
      <Services />
      <SocialProof />
      <Urgency />
      <Pricing />
      <Benefits />
      <FAQ />
      <FinalCTA />
    </div>
  );
};

export default HomePage;
