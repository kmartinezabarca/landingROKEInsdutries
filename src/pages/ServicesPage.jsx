import React, { useState } from "react";
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
import { useServices } from "../hooks/useServices"; // Importar el hook useServices

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
  const [activeService, setActiveService] = useState("hosting");

  const { data: fetchedServices, isLoading, isError, error } = useServices();

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

  // Filtrar y categorizar los servicios obtenidos de la API
  // Asumimos que la API devuelve un campo 'category' o 'group' para diferenciar
  // entre los servicios principales, de consultoría y de ROKE Labs.
  // Para esta refactorización, usaré el campo 'type' que definimos en el backend para 'main' y 'additional'
  // y añadiré una lógica para categorizar los servicios de consultoría y ROKE Labs
  // basándome en los títulos o un nuevo campo 'group' si la API lo proporciona.
  // Por ahora, usaré una lógica de filtrado basada en el 'id' hardcodeado para mantener la estructura visual.

  // Los servicios principales (hosting, gaming, cloud, security) se obtendrán de la API
  // y se agruparán por un 'id' o 'slug' que coincida con los IDs hardcodeados.
  // Los servicios de consultoría y ROKE Labs también se obtendrán de la API.

  // Para simplificar la refactorización y asumir que la API devuelve todos los servicios
  // en una sola lista, los categorizaremos aquí. Idealmente, la API podría tener endpoints
  // o campos específicos para estas categorías.

  const mainServicesFromApi = fetchedServices?.filter(s => s.group === 'main_category') || [];
  const consultingServicesFromApi = fetchedServices?.filter(s => s.group === 'consulting') || [];
  const rokeLabsServicesFromApi = fetchedServices?.filter(s => s.group === 'roke_labs') || [];

  // Si no hay servicios principales, usamos un array vacío para evitar errores
  const services = mainServicesFromApi.length > 0 ? mainServicesFromApi : [
    {
      id: "hosting",
      title: "Hosting Web",
      subtitle: "Hosting confiable y rápido",
      description:
        "Hosting profesional para sitios web y aplicaciones con garantía de uptime del 99.9%. Servidores optimizados con tecnología SSD y panel de control intuitivo.",
      image: "/assets/hosting-web.png",
      iconName: "Server",
      color: "from-blue-500 to-blue-600",
      features: [
        "SSD Storage de alta velocidad",
        "SSL Gratuito incluido",
        "Backup diario automático",
        "Panel cPanel intuitivo",
        "Soporte PHP, MySQL, WordPress",
        "CDN global incluido",
        "Migración gratuita",
        "Uptime garantizado 99.9%",
      ],
      plans: [], // Los planes se cargarán de otra API o se integrarán aquí si la API de marketing los devuelve
    },
    {
      id: "gaming",
      title: "Servidores Gaming",
      subtitle: "Servidores optimizados para gaming",
      description:
        "Servidores especializados para Minecraft, CS:GO, Rust y otros juegos populares. Hardware de última generación con protección anti-DDoS incluida.",
      image: "/assets/gaming-servers.png",
      iconName: "Gamepad2",
      color: "from-purple-500 to-pink-600",
      features: [
        "Hardware de última generación",
        "Protección Anti-DDoS avanzada",
        "Instalación 1-Click de juegos",
        "Mods y plugins personalizados",
        "Panel de control gaming",
        "Soporte 24/7 especializado",
        "Backups automáticos",
        "Latencia ultra baja",
      ],
      plans: [],
    },
    {
      id: "cloud",
      title: "Cloud Hosting",
      subtitle: "Soluciones cloud escalables",
      description:
        "Infraestructura cloud moderna con recursos dedicados y alta disponibilidad. Escalabilidad automática y balanceador de carga incluido.",
      image: "/assets/cloud-hosting.png",
      iconName: "Cloud",
      color: "from-cyan-500 to-blue-600",
      features: [
        "Auto-scaling inteligente",
        "Load Balancer incluido",
        "CDN global distribuido",
        "API de gestión completa",
        "Monitoreo en tiempo real",
        "Backup automático",
        "Seguridad avanzada",
        "SLA 99.99% uptime",
      ],
      plans: [],
    },
    {
      id: "security",
      title: "Seguridad Web",
      subtitle: "Protección avanzada 24/7",
      description:
        "Servicios de seguridad web completos con protección contra malware, DDoS y vulnerabilidades. Monitoreo continuo y respuesta rápida.",
      image: "/assets/security-web.png",
      iconName: "Shield",
      color: "from-green-500 to-emerald-600",
      features: [
        "Firewall WAF avanzado",
        "Monitoreo de malware 24/7",
        "Certificados SSL/TLS",
        "Auditorías de seguridad",
        "Protección DDoS",
        "Análisis de vulnerabilidades",
        "Respuesta a incidentes",
        "Informes detallados",
      ],
      plans: [],
    },
  ];

  const allConsultingServices = consultingServicesFromApi.length > 0 ? consultingServicesFromApi : [
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

  const rokeLabsServices = rokeLabsServicesFromApi.length > 0 ? rokeLabsServicesFromApi : [
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

  const currentService = services.find(
    (service) => service.id === activeService
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
          style={{
            backgroundImage:
              "url(\'/assets/images/banners/banner-data-center.jpg\')",
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
            {services.map((service, index) => {
              const Icon = iconMap[service.iconName];
              if (!Icon) return null; // Manejar caso de ícono no encontrado
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveService(service.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeService === service.id
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
              key={activeService}
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
      <section className="py-16 bg-muted/30">
        <Container>
          <h3 className="text-3xl font-bold text-center text-foreground mb-10">
            Consultoría y Soluciones Personalizadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allConsultingServices.map((service, index) => {
              const Icon = iconMap[service.iconName];
              if (!Icon) return null;
              return (
                <motion.div
                  key={index}
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

      {/* ROKE Labs Services */}
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
                  key={index}
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

