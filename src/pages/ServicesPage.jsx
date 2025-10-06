import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Gamepad2,
  Cloud,
  Shield,
  CheckCircle,
  ArrowRight,
  CircuitBoard,
  Printer,
  Bot,
  DatabaseZap,
  Code2,
  ShieldCheck,
  Route,
  LifeBuoy,
} from "lucide-react";
import Container from "../components/common/Container";
import { Card } from "../components/common/Card";
import Button from "../components/common/Button";
import { CONFIG } from "../utils/constants/config";
import { useAllServices } from "../hooks/useAllServices";

// Mapeo de nombres de íconos a componentes de Lucide React
const iconMap = {
  Server,
  Gamepad2,
  Cloud,
  Shield,
  CheckCircle,
  ArrowRight,
  CircuitBoard,
  Printer,
  Bot,
  DatabaseZap,
  Code2,
  ShieldCheck,
  Route,
  LifeBuoy,
};

const ServicesPage = () => {
  const { data: fetchedServices, isLoading, isError, error } = useAllServices();
  const [activeServiceId, setActiveServiceId] = useState(null);

  // Categorizar servicios una vez que se cargan
  const mainServices = fetchedServices?.filter(s => s.group === 'main_category') || [];
  const consultingServices = fetchedServices?.filter(s => s.group === 'consulting') || [];
  const rokeLabsServices = fetchedServices?.filter(s => s.group === 'roke_labs') || [];

  // Establecer el primer servicio principal como activo por defecto
  useEffect(() => {
    if (mainServices.length > 0 && !activeServiceId) {
      setActiveServiceId(mainServices[0].id);
    }
  }, [mainServices, activeServiceId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando servicios...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-red-500">Error al cargar los servicios: {error.message}</p>
      </div>
    );
  }

  const currentService = mainServices.find(
    (service) => service.id === activeServiceId
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
          style={{
            backgroundImage:
              "url(\"/assets/images/banners/banner-data-center.jpg\")",
          }}
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Ofrecemos una amplia gama de servicios tecnológicos diseñados para
              impulsar tu presencia digital y optimizar tu infraestructura.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Services Navigation */}
      <section className="py-12 bg-card/50">
        <Container>
          <div className="flex flex-wrap justify-center gap-4">
            {mainServices.map((service, index) => {
              const Icon = iconMap[service.iconName];
              if (!Icon) return null; // Manejar caso de ícono no encontrado
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeServiceId === service.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {service.title}
                </motion.button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Active Service Details */}
      {currentService && (
        <section className="py-6">
          <Container>
            <motion.div
              key={activeServiceId}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
            >
              {/* Service Image */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={currentService.image}
                    alt={currentService.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* Service Info */}
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  {currentService.title}
                </h2>
                <p className="text-xl text-primary font-semibold mb-4">
                  {currentService.subtitle}
                </p>
                <p className="text-muted-foreground text-lg mb-6">
                  {currentService.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {currentService.features && currentService.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="group">
                  Ver Planes
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            {/* Plans Section */}
            {currentService.plans && currentService.plans.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <h3 className="text-3xl font-bold text-center text-foreground mb-10">
                  Planes de {currentService.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentService.plans.map((plan, index) => (
                    <Card
                      key={index}
                      className="flex flex-col p-6 border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <h4 className="text-2xl font-bold text-primary mb-2">
                        {plan.name}
                      </h4>
                      <p className="text-4xl font-extrabold text-foreground mb-4">
                        {plan.price}
                        <span className="text-lg font-medium text-muted-foreground">
                          {plan.period}
                        </span>
                      </p>
                      <ul className="space-y-3 flex-grow mb-6">
                        {plan.features && plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-muted-foreground">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.specs && (
                        <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-md mb-6">
                          {plan.specs.ram && (
                            <div>
                              <div className="font-medium text-foreground">{plan.specs.ram}</div>
                              <div className="text-muted-foreground">Memoria</div>
                            </div>
                          )}
                          {plan.specs.cpu && (
                            <div>
                              <div className="font-medium text-foreground">{plan.specs.cpu}</div>
                              <div className="text-muted-foreground">Procesador</div>
                            </div>
                          )}
                          {plan.specs.storage && (
                            <div>
                              <div className="font-medium text-foreground">{plan.specs.storage}</div>
                              <div className="text-muted-foreground">Almacenamiento</div>
                            </div>
                          )}
                          {plan.specs.slots && (
                            <div>
                              <div className="font-medium text-foreground">{plan.specs.slots}</div>
                              <div className="text-muted-foreground">Slots</div>
                            </div>
                          )}
                        </div>
                      )}
                      <Button className="w-full mt-auto">
                        Contratar {plan.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </Container>
        </section>
      )}

      {/* Consulting Services */}
      {consultingServices.length > 0 && (
        <section className="py-16 bg-muted/30">
          <Container>
            <h3 className="text-3xl font-bold text-center text-foreground mb-10">
              Consultoría y Soluciones Personalizadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {consultingServices.map((service, index) => {
                const Icon = iconMap[service.iconName];
                if (!Icon) return null;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground mb-3">
                        {service.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {service.description}
                      </p>
                      <ul className="space-y-2 text-left w-full">
                        {service.features && service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-muted-foreground text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ROKE Labs Services */}
      {rokeLabsServices.length > 0 && (
        <section className="py-16">
          <Container>
            <h3 className="text-3xl font-bold text-center text-foreground mb-10">
              ROKE Labs: Innovación y Prototipado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rokeLabsServices.map((service, index) => {
                const Icon = iconMap[service.iconName];
                if (!Icon) return null;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground mb-3">
                        {service.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {service.description}
                      </p>
                      <ul className="space-y-2 text-left w-full">
                        {service.features && service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-muted-foreground text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <Container className="text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            ¿Listo para llevar tu proyecto al siguiente nivel?
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
            Contáctanos hoy mismo para una consulta gratuita y descubre cómo
            nuestros servicios pueden ayudarte a alcanzar tus objetivos.
          </p>
          <Button size="lg" asChild>
            <a href={CONFIG.WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              Hablar con un Experto
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default ServicesPage;

