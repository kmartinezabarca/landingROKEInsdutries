import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Globe, 
  Shield, 
  Headphones, 
  Code, 
  Database,
  Gamepad2,
  Cloud,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import Button from '../common/Button';
import { ROUTES } from '../../utils/constants/config';

const Services = () => {
  const services = [
    {
      icon: Server,
      title: 'Hosting Web',
      description: 'Hosting confiable y rápido para sitios web y aplicaciones con garantía de uptime del 99.9%.',
      features: ['SSD Storage', 'SSL Gratuito', 'Backup Diario', 'Panel cPanel'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Gamepad2,
      title: 'Servidores Gaming',
      description: 'Servidores optimizados para Minecraft, CS:GO, Rust y otros juegos populares.',
      features: ['Anti-DDoS', 'Instalación 1-Click', 'Mods Personalizados', 'Soporte 24/7'],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Cloud,
      title: 'Cloud Hosting',
      description: 'Soluciones cloud escalables con recursos dedicados y alta disponibilidad.',
      features: ['Auto-scaling', 'Load Balancer', 'CDN Global', 'API Management'],
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    },
    {
      icon: Database,
      title: 'Bases de Datos',
      description: 'Gestión profesional de bases de datos MySQL, PostgreSQL y MongoDB.',
      features: ['Backup Automático', 'Replicación', 'Monitoreo 24/7', 'Optimización'],
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Shield,
      title: 'Seguridad Web',
      description: 'Protección avanzada contra malware, DDoS y vulnerabilidades de seguridad.',
      features: ['Firewall WAF', 'Monitoreo Malware', 'Certificados SSL', 'Auditorías'],
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: Code,
      title: 'Desarrollo Web',
      description: 'Desarrollo de sitios web y aplicaciones personalizadas con tecnologías modernas.',
      features: ['React/Vue.js', 'Node.js/PHP', 'Diseño Responsive', 'SEO Optimizado'],
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  const additionalServices = [
    {
      icon: Headphones,
      title: 'Soporte Técnico 24/7',
      description: 'Equipo de expertos disponible las 24 horas para resolver cualquier inconveniente.'
    },
    {
      icon: Globe,
      title: 'Migración Gratuita',
      description: 'Migramos tu sitio web desde tu proveedor actual sin costo adicional.'
    }
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
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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
            Nuestro equipo de expertos está listo para ayudarte a encontrar 
            la solución perfecta para tus necesidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to={ROUTES.CONTACT}>
                Solicitar Cotización
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to={ROUTES.HOSTING}>
                Ver Planes de Hosting
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;

