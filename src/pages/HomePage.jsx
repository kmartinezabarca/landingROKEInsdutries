import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Team from '../components/sections/Team';
import SEO from '../components/common/SEO';

const HomePage = () => {
  return (
    <>
      <SEO
        canonical="/"
        description="ROKE Industries — Hosting web, servidores gaming, cloud, desarrollo de software a la medida y servicios tecnológicos profesionales en México."
        keywords="hosting web México, servidores gaming, cloud hosting, desarrollo software, ROKE Industries"
      />
      <div>
        <Hero />
        <About />
        <Services />
        <Team />
      </div>
    </>
  );
};

export default HomePage;

