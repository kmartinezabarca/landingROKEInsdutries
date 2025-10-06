import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Gamepad2,
  Cloud,
  Database,
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
  Globe,
} from "lucide-react";
import Container from "../components/common/Container";
import { Card } from "../components/common/Card";
import Button from "../components/common/Button";
import { CONFIG } from "../utils/constants/config";
import { useServicePlans } from "../hooks/useServicePlans";
import { useCategories } from "../hooks/useCategories";
import { useBillingCycles } from "../hooks/useBillingCycles";

// Mapeo de nombres de íconos a componentes de Lucide React
const iconMap = {
  Server, Globe, Gamepad2, Cloud, Database, Shield, CheckCircle, ArrowRight, CircuitBoard, Printer, Bot, DatabaseZap, Code2, ShieldCheck, Route, LifeBuoy,
};

// Datos hardcodeados para consultoría y ROKE Labs
const allConsultingServices = [
    {
      iconName: "DatabaseZap",
      title: "Arquitectura de Bases de Datos",
      description:
        "Diseñamos y gestionamos sistemas de bases de datos de alto rendimiento y alta disponibilidad, optimizados para tus cargas de trabajo específicas.",
      features: [
        "Diseño y Modelado de Datos (MySQL, PostgreSQL, MongoDB)",
        "Configuración de Replicación y Alta Disponibilidad",
        "Estrategias de Backup y Recuperación de Desastres",
        "Optimización de Consultas (Query Tuning)",
      ],
    },
    {
      iconName: "Code2",
      title: "Desarrollo de Software a Medida",
      description:
        "Construimos aplicaciones web y móviles robustas y escalables, desde el concepto hasta el despliegue y más allá.",
      features: [
        "Desarrollo Full-Stack (Laravel, React, Vue.js)",
        "Aplicaciones Móviles Multiplataforma (Flutter)",
        "Diseño de Arquitectura de Software",
        "Integración de APIs y Servicios de Terceros",
      ],
    },
    {
      iconName: "ShieldCheck",
      title: "Consultoría de Seguridad y DevOps",
      description:
        "Fortalecemos tu infraestructura y automatizamos tus procesos para que puedas innovar con velocidad y confianza.",
      features: [
        "Auditorías de Seguridad y Hardening de Servidores",
        "Diseño e Implementación de Pipelines CI/CD (Jenkins)",
        "Arquitectura de Red Segura (VLANs, Firewalls)",
        "Estrategias de Monitoreo y Alertas",
      ],
    },
    {
      iconName: "Route",
      title: "Migración y Modernización",
      description:
        "Te ayudamos a mover tus aplicaciones legadas a una infraestructura moderna, optimizando el rendimiento, la seguridad y los costos.",
      features: [
        'Migración "White Glove" de Infraestructura Completa',
        "Refactorización de Código Heredado (Legacy Code)",
        "Contenerización de Aplicaciones (Docker)",
        "Optimización de Costos de Infraestructura (FinOps)",
      ],
    },
    {
      iconName: "LifeBuoy",
      title: "Soporte de Misión Crítica 24/7",
      description:
        "Nuestro equipo de ingenieros está disponible 24/7 para resolver cualquier inconveniente y asegurar la continuidad de tu operación.",
      features: [
        "Acceso a Ingenieros Expertos",
        "Tiempos de Respuesta Garantizados (SLA)",
        "Monitoreo Proactivo de Servicios",
        "Canales de Comunicación Dedicados",
      ],
    },
  ];

const rokeLabsServices = [
    {
      iconName: "CircuitBoard",
      title: "Fabricación de PCBs a Medida",
      description: "Prototipado rápido de placas de circuito impreso (PCBs) de una o dos capas, fresadas con precisión en nuestra maquinaria CNC.",
      features: ["Fresado de Alta Precisión", "Perforación y Corte a Medida", "Ideal para Prototipos y Lotes Pequeños", "Tiempos de Entrega Rápidos (24-48h)"],
    },
    {
      iconName: "Printer",
      title: "Impresión 3D y Prototipado Rápido",
      description: "Materializa tus diseños. Ofrecemos servicios de impresión 3D de alta resolución para piezas funcionales, carcasas y prototipos.",
      features: ["Tecnología FDM de Alta Calidad", "Amplia Gama de Materiales (PLA, PETG, ABS)", "Optimización de Diseño para Fabricación (DFM)", "Servicios de Post-Procesado"],
    },
    {
      iconName: "Bot",
      title: "Consultoría en Mecatrónica e IoT",
      description: "Te ayudamos a diseñar y construir tus propios productos de hardware. Desde la elección de componentes hasta la integración de firmware.",
      features: ["Diseño de Sistemas Embebidos (Arduino/ESP32)", "Integración de Sensores y Actuadores", "Diseño Mecánico para CNC y 3D", "Desarrollo de Firmware a Medida"],
    },
  ];

const ServicesPage = () => {
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useCategories();
  const { data: servicePlans, isLoading: isLoadingServicePlans, isError: isErrorServicePlans } = useServicePlans();
  const { data: billingCycles, isLoading: isLoadingBillingCycles, isError: isErrorBillingCycles } = useBillingCycles();

  const [activeCategorySlug, setActiveCategorySlug] = useState(null);
  const [activeBillingCycleSlug, setActiveBillingCycleSlug] = useState('monthly');

  useEffect(() => {
    if (categories && categories.length > 0 && !activeCategorySlug) {
      setActiveCategorySlug(categories[0].slug);
    }
  }, [categories, activeCategorySlug]);

  const currentBillingCycle = useMemo(() => {
    return billingCycles?.find(cycle => cycle.slug === activeBillingCycleSlug);
  }, [billingCycles, activeBillingCycleSlug]);

  const currentCategory = useMemo(() => {
    return categories?.find(cat => cat.slug === activeCategorySlug);
  }, [categories, activeCategorySlug]);

  const filteredPlans = useMemo(() => {
    if (!servicePlans || !activeCategorySlug) return [];
    return servicePlans.filter(plan => plan.category.slug === activeCategorySlug);
  }, [servicePlans, activeCategorySlug]);

  const calculatePrice = (basePrice) => {
    if (!currentBillingCycle) return basePrice;
    const discount = parseFloat(currentBillingCycle.discount_percentage) / 100;
    const finalPrice = parseFloat(basePrice) * (1 - discount);
    return finalPrice.toFixed(2);
  };

  const isLoading = isLoadingCategories || isLoadingServicePlans || isLoadingBillingCycles;
  const isError = isErrorCategories || isErrorServicePlans || isErrorBillingCycles;

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
        <p className="text-lg text-red-500">Error al cargar la información. Por favor, intente de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
          style={{ backgroundImage: "url('/assets/images/banners/banner-data-center.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
        <Container className="relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">Nuestros Servicios</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Ofrecemos una amplia gama de servicios tecnológicos diseñados para impulsar tu presencia digital y optimizar tu infraestructura.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-12 bg-card/50">
        <Container>
          <div className="flex flex-wrap justify-center gap-4">
            {categories?.map((category, index) => {
              const Icon = iconMap[category.icon];
              if (!Icon) return null;
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveCategorySlug(category.slug)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeCategorySlug === category.slug
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </Container>
      </section>

      {currentCategory && (
        <section className="py-6">
          <Container>
            <motion.div key={activeCategorySlug} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src={`/assets/images/services/${currentCategory.slug}.jpg`} alt={currentCategory.name} className="w-full h-80 object-cover" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-foreground mb-4">{currentCategory.name}</h2>
                <p className="text-muted-foreground text-lg mb-6">{currentCategory.description}</p>
                <Button size="lg" className="group">
                  Ver Planes
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            <div className="flex justify-center mb-10">
              <div className="bg-muted p-1 rounded-lg flex gap-1">
                {billingCycles?.map(cycle => (
                  <button
                    key={cycle.id}
                    onClick={() => setActiveBillingCycleSlug(cycle.slug)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeBillingCycleSlug === cycle.slug ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted-foreground/10'
                    }`}>
                    {cycle.name}
                  </button>
                ))}
              </div>
            </div>

            {filteredPlans.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
                <h3 className="text-3xl font-bold text-center text-foreground mb-10">Planes de {currentCategory.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPlans.map((plan) => (
                    <Card key={plan.id} className="flex flex-col p-6 border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <h4 className="text-2xl font-bold text-primary mb-2">{plan.name}</h4>
                      <p className="text-4xl font-extrabold text-foreground mb-4">
                        ${calculatePrice(plan.price)}
                        <span className="text-lg font-medium text-muted-foreground">/{currentBillingCycle?.name.toLowerCase().slice(0, -2)}</span>
                      </p>
                      <ul className="space-y-3 flex-grow mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-muted-foreground">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature.name}</span>
                          </li>
                        ))}
                      </ul>
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

      <section className="py-16 bg-muted/30">
        <Container>
          <h3 className="text-3xl font-bold text-center text-foreground mb-10">Consultoría y Soluciones Personalizadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allConsultingServices.map((service, index) => {
              const Icon = iconMap[service.iconName];
              if (!Icon) return null;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 * index }} viewport={{ once: true }}>
                  <Card className="h-full p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">{service.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{service.description}</p>
                    <ul className="space-y-2 text-left w-full">
                      {service.features.map((feature, idx) => (
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

      <section className="py-16">
        <Container>
          <h3 className="text-3xl font-bold text-center text-foreground mb-10">ROKE Labs: Innovación y Prototipado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rokeLabsServices.map((service, index) => {
              const Icon = iconMap[service.iconName];
              if (!Icon) return null;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 * index }} viewport={{ once: true }}>
                  <Card className="h-full p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">{service.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{service.description}</p>
                    <ul className="space-y-2 text-left w-full">
                      {service.features.map((feature, idx) => (
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

      <section className="py-16 bg-primary/10">
        <Container className="text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">¿Listo para llevar tu proyecto al siguiente nivel?</h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
            Contáctanos hoy mismo para una consulta gratuita y descubre cómo nuestros servicios pueden ayudarte a alcanzar tus objetivos.
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

