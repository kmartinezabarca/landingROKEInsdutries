import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";
import Button from "../common/Button";
import { ROUTES } from "../../utils/constants/config";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Hosting Básico",
      price: "99",
      period: "MXN/mes",
      description: "Perfecto para proyectos pequeños",
      features: [
        "5 GB de almacenamiento",
        "Ancho de banda ilimitado",
        "1 base de datos",
        "Certificado SSL gratis",
        "Soporte por email",
      ],
      cta: "Comenzar",
      highlighted: false,
    },
    {
      name: "Hosting Pro",
      price: "199",
      period: "MXN/mes",
      description: "Para empresas en crecimiento",
      features: [
        "50 GB de almacenamiento",
        "Ancho de banda ilimitado",
        "Bases de datos ilimitadas",
        "Certificado SSL gratis",
        "Soporte prioritario 24/7",
        "Backups automáticos diarios",
        "CDN global incluido",
      ],
      cta: "Contratar Ahora",
      highlighted: true,
    },
    {
      name: "Hosting Premium",
      price: "399",
      period: "MXN/mes",
      description: "Para aplicaciones empresariales",
      features: [
        "Almacenamiento ilimitado",
        "Ancho de banda ilimitado",
        "Bases de datos ilimitadas",
        "Certificado SSL gratis",
        "Soporte técnico 24/7",
        "Backups en tiempo real",
        "CDN global + DDoS protection",
        "IP dedicada",
      ],
      cta: "Contratar Ahora",
      highlighted: false,
    },
  ];

  const enterprisePlans = [
    {
      name: "Automatización Empresarial",
      price: "2,999",
      period: "MXN",
      description: "Solución personalizada",
    },
    {
      name: "Landing Pages Profesionales",
      price: "4,999",
      period: "MXN",
      description: "Diseño + Desarrollo",
    },
    {
      name: "Soluciones IA Personalizadas",
      price: "Consultar",
      period: "Según proyecto",
      description: "Cotización personalizada",
    },
  ];

  return (
    <section className="py-20">
      <Container>
        {/* Hosting Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Planes de Hosting
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Elige el plan perfecto para tu negocio. Todos incluyen soporte técnico y garantía de uptime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Más Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full flex flex-col transition-all duration-300 ${
                    plan.highlighted
                      ? "border-primary shadow-lg md:scale-105"
                      : "hover:border-primary/50"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <p className="text-muted-foreground text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-bold text-primary">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {plan.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.highlighted ? "default" : "outline"}
                      asChild
                    >
                      <Link to={ROUTES.HOSTING} className="flex items-center justify-center gap-2">
                        {plan.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enterprise Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-muted/50 rounded-2xl p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
            Servicios Empresariales
          </h3>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Soluciones personalizadas para automatización, desarrollo y IA
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enterprisePlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {plan.name}
                </h4>
                <p className="text-3xl font-bold text-primary mb-2">
                  {plan.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              ¿Necesitas una solución personalizada? Hablemos de tu proyecto.
            </p>
            <Button size="lg" asChild>
              <Link to={ROUTES.CONTACT} className="flex items-center justify-center gap-2">
                Solicitar Cotización
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Pricing;
