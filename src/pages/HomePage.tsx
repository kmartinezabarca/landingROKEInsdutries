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

const HomePage: React.FC = () => {
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
