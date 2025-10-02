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
import { useServices } from "../../hooks/useServices";

// Mapeo de nombres de íconos a componentes de Lucide React
const iconMap = {
  Server,
  LifeBuoy,
  Zap,
  Shield,
  Code,
  Database,
  Gamepad2,
  Cloud,
  Cpu,
  ScanEye,
};

const Services = () => {
  const { data, isLoading, isError, error } = useServices();

  if (isLoading) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cargando Servicios...
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Obteniendo la información más reciente para ti.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="relative h-full flex flex-col p-6 overflow-hidden bg-gradient-to-br from-card to-card/60 border-border/20 group transition-all duration-300 hover:border-primary/30 animate-pulse">
                  <CardHeader className="p-0 mb-6 z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shrink-0"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow flex flex-col z-10">
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                    <ul className="space-y-2">
                      {[...Array(4)].map((_, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <div className="w-4 h-4 bg-gray-200 rounded-full mr-2 mt-0.5 shrink-0"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">
              Error al cargar los servicios
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Lo sentimos, no pudimos cargar los servicios. Por favor, inténtalo de nuevo más tarde.
            </p>
            <p className="text-sm text-red-400 mt-2">Detalles del error: {error.message}</p>
          </div>
        </Container>
      </section>
    );
  }

  const mainServices = data?.filter(service => service.type === "main") || [];
  const additionalServices = data?.filter(service => service.type === "additional") || [];

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
          {mainServices.map((service, index) => {
            const Icon = iconMap[service.iconName];
            if (!Icon) return null; // Manejar caso de ícono no encontrado
            return (
              <motion.div
                key={service.id || service.title}
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
                      {service.features && service.features.map((feature, idx) => (
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
              const Icon = iconMap[service.iconName];
              if (!Icon) return null; // Manejar caso de ícono no encontrado
              return (
                <motion.div
                  key={service.id || service.title}
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

