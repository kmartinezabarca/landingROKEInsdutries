import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Team from '../components/sections/Team';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Team />
    </div>
  );
};

export default HomePage;

