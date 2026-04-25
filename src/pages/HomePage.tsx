import React from 'react';
import Hero from '../components/sections/Hero';
import Benefits from '../components/sections/Benefits';
import Pricing from '../components/sections/Pricing';
import SocialProof from '../components/sections/SocialProof';
import Urgency from '../components/sections/Urgency';
import FAQ from '../components/sections/FAQ';
import FinalCTA from '../components/sections/FinalCTA';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Benefits />
      <Pricing />
      <SocialProof />
      <Urgency />
      <FAQ />
      <FinalCTA />
    </div>
  );
};

export default HomePage;
