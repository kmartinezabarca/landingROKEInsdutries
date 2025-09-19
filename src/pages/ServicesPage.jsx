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

const ServicesPage = () => {
  const [activeService, setActiveService] = useState("hosting");

  const services = [
    {
      id: "hosting",
      title: "Hosting Web",
      subtitle: "Hosting confiable y rápido",
      description:
        "Hosting profesional para sitios web y aplicaciones con garantía de uptime del 99.9%. Servidores optimizados con tecnología SSD y panel de control intuitivo.",
      image: "/assets/hosting-web.png",
      icon: Server,
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
      plans: [
        {
          name: "Básico",
          price: "$9.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "10 GB SSD",
            "1 Sitio Web",
            "100 GB Transferencia",
            "SSL Gratuito",
            "Soporte 24/7",
          ],
        },
        {
          name: "Profesional",
          price: "$19.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "50 GB SSD",
            "5 Sitios Web",
            "500 GB Transferencia",
            "SSL Gratuito",
            "Backup Diario",
            "CDN Global",
          ],
        },
        {
          name: "Empresarial",
          price: "$39.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "200 GB SSD",
            "Sitios Ilimitados",
            "2 TB Transferencia",
            "SSL Wildcard",
            "Backup Diario",
            "CDN Global",
            "Soporte Prioritario",
          ],
        },
      ],
    },
    {
      id: "gaming",
      title: "Servidores Gaming",
      subtitle: "Servidores optimizados para gaming",
      description:
        "Servidores especializados para Minecraft, CS:GO, Rust y otros juegos populares. Hardware de última generación con protección anti-DDoS incluida.",
      image: "/assets/gaming-servers.png",
      icon: Gamepad2,
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
      plans: [
        {
          name: "Starter",
          price: "$14.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "2 GB RAM",
            "20 Slots",
            "SSD 10 GB",
            "Anti-DDoS",
            "Soporte 24/7",
          ],
        },
        {
          name: "Pro Gamer",
          price: "$29.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "6 GB RAM",
            "50 Slots",
            "SSD 50 GB",
            "Anti-DDoS Pro",
            "Mods Ilimitados",
            "Backup Diario",
          ],
        },
        {
          name: "Elite",
          price: "$59.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "16 GB RAM",
            "100 Slots",
            "SSD 200 GB",
            "Anti-DDoS Elite",
            "CPU Dedicado",
            "Soporte Prioritario",
          ],
        },
      ],
    },
    {
      id: "cloud",
      title: "Cloud Hosting",
      subtitle: "Soluciones cloud escalables",
      description:
        "Infraestructura cloud moderna con recursos dedicados y alta disponibilidad. Escalabilidad automática y balanceador de carga incluido.",
      image: "/assets/cloud-hosting.png",
      icon: Cloud,
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
      plans: [
        {
          name: "Cloud Start",
          price: "$24.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "2 vCPU",
            "4 GB RAM",
            "50 GB SSD",
            "Load Balancer",
            "CDN Global",
          ],
        },
        {
          name: "Cloud Pro",
          price: "$49.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "4 vCPU",
            "8 GB RAM",
            "200 GB SSD",
            "Auto-scaling",
            "API Management",
            "Monitoreo 24/7",
          ],
        },
        {
          name: "Cloud Enterprise",
          price: "$99.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "8 vCPU",
            "32 GB RAM",
            "1 TB SSD",
            "Recursos Dedicados",
            "Soporte Dedicado",
            "SLA Premium",
          ],
        },
      ],
    },
    {
      id: "security",
      title: "Seguridad Web",
      subtitle: "Protección avanzada 24/7",
      description:
        "Servicios de seguridad web completos con protección contra malware, DDoS y vulnerabilidades. Monitoreo continuo y respuesta rápida.",
      image: "/assets/security-web.png",
      icon: Shield,
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
      plans: [
        {
          name: "Básico",
          price: "$19.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "SSL Básico",
            "Firewall WAF",
            "Monitoreo Malware",
            "Soporte Email",
          ],
        },
        {
          name: "Avanzado",
          price: "$39.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "SSL Wildcard",
            "WAF Avanzado",
            "Anti-DDoS",
            "Auditorías Mensuales",
            "Soporte 24/7",
          ],
        },
        {
          name: "Enterprise",
          price: "$79.99",
          period: "/mes",
          specs: {
            ram: "2 GB",
            cpu: "2 Cores",
            storage: "10 GB SSD",
            slots: "20",
          },
          features: [
            "SSL EV",
            "WAF Enterprise",
            "DDoS Protection Pro",
            "Auditorías Semanales",
            "Respuesta Incidentes",
            "Soporte Dedicado",
          ],
        },
      ],
    },
  ];

  const allConsultingServices = [
    {
      icon: DatabaseZap,
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
      icon: Code2,
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
      icon: ShieldCheck,
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
      icon: Route,
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
      icon: LifeBuoy,
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
      icon: CircuitBoard,
      title: "Fabricación de PCBs a Medida",
      description: "Prototipado rápido de placas de circuito impreso (PCBs) de una o dos capas, fresadas con precisión en nuestra maquinaria CNC.",
      features: ["Fresado de Alta Precisión", "Perforación y Corte a Medida", "Ideal para Prototipos y Lotes Pequeños", "Tiempos de Entrega Rápidos (24-48h)"],
    },
    {
      icon: Printer,
      title: "Impresión 3D y Prototipado Rápido",
      description: "Materializa tus diseños. Ofrecemos servicios de impresión 3D de alta resolución para piezas funcionales, carcasas y prototipos.",
      features: ["Tecnología FDM de Alta Calidad", "Amplia Gama de Materiales (PLA, PETG, ABS)", "Optimización de Diseño para Fabricación (DFM)", "Servicios de Post-Procesado"],
    },
    {
      icon: Bot,
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
              "url('/assets/images/banners/banner-data-center.jpg')",
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
              const Icon = service.icon;
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
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${currentService.color} opacity-20`}
                />
              </div>
            </div>

            {/* Service Info */}
            <div className="order-1 lg:order-2">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentService.color} text-white mb-4`}
              >
                <currentService.icon className="w-5 h-5" />
                <span className="font-medium">{currentService.subtitle}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {currentService.title}
              </h2>

              <p className="text-lg text-muted-foreground mb-8">
                {currentService.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentService.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Pricing Plans */}
          <div className="grid gap-6 md:gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] items-stretch">
            {currentService.plans.map((plan, idx) => {
              const featured = plan.featured ?? idx === 1; // ⭐️ destacado (o marca featured en data)
              const [intPart, decimals] = String(plan.price)
                .replace(/[^\d.]/g, "")
                .split(".");
              const Icon = currentService.icon;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="h-full"
                >
                  <Card
                    className={[
                      "relative h-full flex flex-col border bg-card/70 shadow-sm transition-all duration-300",
                      "hover:shadow-xl hover:-translate-y-0.5",
                      featured
                        ? "ring-1 ring-primary/45 border-primary/45 bg-gradient-to-b from-primary/5 to-transparent"
                        : "border-border/60",
                    ].join(" ")}
                  >
                    {/* Banda superior y badge: no se cortan */}
                    {featured && (
                      <>
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-primary/40 to-secondary/70" />
                        <span className="mx-auto mt-3 inline-block rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                          Más Popular
                        </span>
                      </>
                    )}

                    <div
                      className={`p-6 md:p-7 ${
                        featured ? "pt-3" : ""
                      } flex flex-col text-center`}
                    >
                      {/* Icono */}
                      <div className="mx-auto mb-3">
                        <div className="size-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                          <Icon className="size-5 text-foreground/70" />
                        </div>
                      </div>

                      {/* Título */}
                      <h4 className="text-lg font-semibold text-foreground">
                        {plan.name}
                      </h4>

                      {/* Precio compacto */}
                      <div className="mt-2 mb-5 flex items-end justify-center gap-1">
                        <span className="text-xs text-muted-foreground">$</span>
                        <span className="text-4xl md:text-5xl font-extrabold leading-none tracking-tight">
                          {intPart ?? plan.price}
                        </span>
                        {decimals && (
                          <span className="text-lg md:text-2xl -mb-0.5 font-bold">
                            .{decimals}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {plan.period || "/mes"}
                        </span>
                      </div>

                      {/* Píldoras de specs (opcionales): se muestran solo si existen */}
                      {plan.specs && (
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          {plan.specs.ram && (
                            <div className="rounded-xl bg-muted/60 px-3 py-2.5">
                              <div className="text-sm font-semibold">
                                {plan.specs.ram}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                Memoria
                              </div>
                            </div>
                          )}
                          {plan.specs.cpu && (
                            <div className="rounded-xl bg-muted/60 px-3 py-2.5">
                              <div className="text-sm font-semibold">
                                {plan.specs.cpu}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                Procesador
                              </div>
                            </div>
                          )}
                          {plan.specs.storage && (
                            <div className="rounded-xl bg-muted/60 px-3 py-2.5">
                              <div className="text-sm font-semibold">
                                {plan.specs.storage}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                Almacenamiento
                              </div>
                            </div>
                          )}
                          {plan.specs.slots && (
                            <div className="rounded-xl bg-muted/60 px-3 py-2.5">
                              <div className="text-sm font-semibold">
                                {plan.specs.slots}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                Jugadores
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Features (incluidos / excluidos con "x " al inicio) */}
                      <ul className="space-y-2.5 mb-5 text-left mx-auto max-w-[22rem]">
                        {plan.features.map((f, i) => {
                          const excluded = /^x\s/i.test(f);
                          return (
                            <li key={i} className="flex items-start gap-2.5">
                              <CheckCircle
                                className={`w-4 h-4 mt-0.5 shrink-0 ${
                                  excluded
                                    ? "text-muted-foreground"
                                    : "text-green-500"
                                }`}
                              />
                              <span
                                className={`text-sm ${
                                  excluded
                                    ? "line-through text-muted-foreground/90"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {f.replace(/^x\s*/i, "")}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      {/* CTA */}
                      <Button
                        className="w-full"
                        variant={featured ? "default" : "outline"}
                      >
                        {currentService.id === "gaming"
                          ? "Contratar Servidor"
                          : "Elegir Plan"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-card/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Servicios Adicionales
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complementa tu infraestructura con nuestros servicios
              especializados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allConsultingServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="p-6 md:p-8 h-full hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex-grow">
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

       <section className="py-6 bg-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ROKE Labs: Fabricación Digital y Prototipado
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transformamos tus conceptos en realidades tangibles. Nuestro taller de I+D está equipado para llevar tu proyecto de hardware desde el diseño hasta el prototipo funcional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {rokeLabsServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="p-6 md:p-8 h-full hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex-grow">
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              ¿Necesitas una solución personalizada?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nuestro equipo de expertos está listo para ayudarte a encontrar la
              solución perfecta para tus necesidades específicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4"
              >
                Solicitar Cotización
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                className="
    text-lg px-8 py-4 transition-colors
    bg-black text-white border border-black hover:bg-black/90
    dark:bg-white dark:text-black dark:border-white dark:hover:bg-white/90
    focus-visible:ring-2 focus-visible:ring-primary/50
    focus-visible:ring-offset-2 focus-visible:ring-offset-background
  "
              >
                Ver Planes de Hosting
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default ServicesPage;
