import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ServerCog, ShieldCheck, Rabbit } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../common/Container";
import Button from "../common/Button";
import { ROUTES, CONFIG } from "../../utils/constants/config";

const Hero = () => {
  const { t } = useTranslation("hero");

  const features = [
    {
      icon: ServerCog,
      title: t("features.infrastructure.title"),
      description: t("features.infrastructure.description"),
    },
    {
      icon: ShieldCheck,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
    {
      icon: Rabbit,
      title: t("features.performance.title"),
      description: t("features.performance.description"),
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/assets/hero-bg.png)" }}
      >
        <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {CONFIG.COMPANY_NAME}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {CONFIG.COMPANY_TAGLINE}. {t("subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link to={ROUTES.SERVICES} className="flex items-center">
                {t("cta.explore")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
              <Link to={ROUTES.CONTACT}>{t("cta.contact")}</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/70 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
