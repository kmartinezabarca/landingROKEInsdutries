import React from "react";
import { motion } from "framer-motion";
import {
  Server,
  LifeBuoy,
  Zap,
  Shield,
  Code,
  Database,
  Gamepad2,
  Cloud,
  ArrowRight,
  Cpu,
  ScanEye,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";
import Button from "../common/Button";
import { ROUTES } from "../../utils/constants/config";

const Services = () => {
  const services = [
    // --- Servicios de Infraestructura Cloud ---
    {
      icon: Server,
      title: "Hosting Web Gestionado",
      description:
        "Plataforma de hosting de alto rendimiento para sitios y aplicaciones, con un uptime del 99.9% garantizado y gestión experta.",
      features: [
        "Almacenamiento NVMe SSD",
        "Certificados SSL Gratuitos",
        "Backups Diarios Automatizados",
        "Panel de Control Intuitivo",
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Gamepad2,
      title: "Servidores Gaming de Baja Latencia",
      description:
        "Infraestructura optimizada para la mejor experiencia de juego. Despliega servidores para Minecraft, Rust, y más, con protección Anti-DDoS.",
      features: [
        "Protección Anti-DDoS Incluida",
        "Instalador de Mods 1-Click",
        "Panel de Control Pterodactyl",
        "Soporte Técnico 24/7",
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Cloud,
      title: "Infraestructura Cloud a Medida (VPS)",
      description:
        "Servidores virtuales privados (VPS) con recursos dedicados, escalabilidad instantánea y control total para tus aplicaciones más exigentes.",
      features: [
        "Recursos Dedicados (CPU/RAM)",
        "Escalado Automático (Auto-scaling)",
        "Red Privada Virtual (VPC)",
        "Acceso Root Completo",
      ],
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    // --- Servicios de Plataforma y Desarrollo ---
    {
      icon: Database,
      title: "Bases de Datos Gestionadas",
      description:
        "Servicios de bases de datos de alto rendimiento (MySQL, PostgreSQL, MongoDB) con replicación, backups y optimización experta.",
      features: [
        "Backups Automatizados y Seguros",
        "Configuración de Replicación",
        "Monitoreo de Rendimiento 24/7",
        "Optimización de Consultas",
      ],
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Shield,
      title: "Seguridad y Hardening",
      description:
        "Protección integral para tu infraestructura digital. Aseguramos tus aplicaciones contra las amenazas más avanzadas.",
      features: [
        "Firewall de Aplicaciones Web (WAF)",
        "Monitoreo Proactivo de Malware",
        "Auditorías de Seguridad",
        "Hardening de Servidores",
      ],
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: Code,
      title: "Desarrollo de Software a Medida",
      description:
        "Convertimos tu visión en realidad. Desarrollamos aplicaciones web y móviles personalizadas con las tecnologías más modernas.",
      features: [
        "Desarrollo Full-Stack (React, Laravel)",
        "Aplicaciones Móviles (Flutter)",
        "Diseño de Experiencia de Usuario (UX/UI)",
        "Optimización para SEO",
      ],
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    // --- TUS SERVICIOS ÚNICOS Y DIFERENCIADORES ---
    {
      icon: Cpu, // Ícono de un chip/procesador
      title: "Prototipado de Hardware e IoT",
      description:
        "De la idea al prototipo funcional. Diseñamos, fabricamos y programamos dispositivos de hardware a medida para soluciones de IoT.",
      features: [
        "Diseño de Circuitos y PCBs",
        "Fabricación con Impresión 3D y CNC",
        "Programación de Firmware (Arduino/ESP32)",
        "Integración con Plataformas Cloud",
      ],
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: ScanEye, // Ícono de un ojo escaneando
      title: "Soluciones de Automatización y Robótica",
      description:
        "Implementamos sistemas inteligentes para automatizar tus procesos. Desde la visión por computadora hasta la robótica a medida.",
      features: [
        "Integración de Sistemas Robóticos",
        "Visión por Computadora (NVIDIA Jetson)",
        "Control de Maquinaria Industrial",
        "Automatización de Procesos",
      ],
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
  ];

  const additionalServices = [
    {
      icon: LifeBuoy, // Un salvavidas comunica "rescate" y "seguridad" mejor que unos auriculares.
      title: "Soporte de Misión Crítica 24/7",
      description:
        "Nuestro equipo de ingenieros está disponible 24/7 para resolver cualquier inconveniente y asegurar la continuidad de tu operación.",
    },
    {
      icon: Zap, // Un rayo comunica velocidad, facilidad y "magia".
      title: 'Migración "White Glove" Gratuita',
      description:
        "Nos encargamos de todo. Migramos tu sitio web, aplicaciones y bases de datos desde tu proveedor actual a ROKE, sin costo y con tiempo de inactividad mínimo.",
    },
  ];
  return (
    <section className="py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios tecnológicos diseñados para
            impulsar tu presencia digital y optimizar tu infraestructura.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card
                  className="relative h-full flex flex-col p-6 overflow-hidden
                     bg-gradient-to-br from-card to-card/60
                     border-border/20 group transition-all duration-300
                     hover:border-primary/30"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       -translate-x-full group-hover:translate-x-0"
                    style={{ transitionDuration: "500ms" }}
                  />

                  <CardHeader
                    className="p-0 mb-6 z-10 transition-transform duration-300
             group-hover:-translate-y-1 flex items-center gap-4"
                  >
                    <div
                      className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center
               transition-all duration-300 shrink-0`}
                    >
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl text-card-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 flex-grow flex flex-col z-10">
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-primary
                           opacity-0 group-hover:opacity-100
                           translate-y-4 group-hover:translate-y-0
                           transition-all duration-300"
                        asChild
                      >
                        <Link
                          to={`/servicios/${service.slug}`}
                          className="flex items-center"
                        >
                          Saber más
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-muted/30 rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Servicios Adicionales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            ¿Necesitas una solución personalizada?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a encontrar la
            solución perfecta para tus necesidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to={ROUTES.CONTACT} className="flex items-center">
                Solicitar Cotización
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to={ROUTES.HOSTING}>Ver Planes de Hosting</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;
