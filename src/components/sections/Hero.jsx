import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import { ROUTES, CONFIG } from "../../utils/constants/config";

const Hero = () => {
  const quickBenefits = [
    {
      icon: Rocket,
      title: "Lanzamiento en 24h",
      description: "Servidores listos en un día",
    },
    {
      icon: Shield,
      title: "Uptime 99.9%",
      description: "Infraestructura confiable",
    },
    {
      icon: Zap,
      title: "Soporte Real 24/7",
      description: "Equipo en español",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/hero-bg.png)",
        }}
      >
        <div className="absolute inset-0 bg-background/85 dark:bg-background/90" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title - Conversion Focused */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Infraestructura, Hosting y Soluciones Digitales
              </span>
              <br />
              <span className="text-foreground">listas para crecer tu negocio</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Lanza servidores, automatiza procesos y desarrolla software profesional con soporte real. Desde hosting de videojuegos hasta soluciones empresariales con IA.
            </p>
          </motion.div>

          {/* CTA Buttons - Primary Focus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link to={ROUTES.HOSTING} className="flex items-center">
                Ver Planes y Precios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
              asChild
            >
              <a href="https://wa.me/+1234567890?text=Hola%20ROKE%20Industries%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20sus%20servicios">
                Hablar por WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Quick Benefits - Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {quickBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/70 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-8 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-6">
              Confiado por empresas en México y Latinoamérica
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-xs text-muted-foreground">Clientes Activos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime Garantizado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Soporte en Español</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
