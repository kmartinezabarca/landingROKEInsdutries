import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Gamepad2, 
  Cloud, 
  Shield, 
  Database, 
  Code, 
  CheckCircle, 
  ArrowRight,
  Users,
  Clock,
  Zap,
  Globe,
  Lock,
  Settings
} from 'lucide-react';
import Container from '../components/common/Container';
import { Card } from '../components/common/Card';
import Button from '../components/common/Button';
import { CONFIG } from '../utils/constants/config';

const ServicesPage = () => {
  const [activeService, setActiveService] = useState('hosting');

  const services = [
    {
      id: 'hosting',
      title: 'Hosting Web',
      subtitle: 'Hosting confiable y rápido',
      description: 'Hosting profesional para sitios web y aplicaciones con garantía de uptime del 99.9%. Servidores optimizados con tecnología SSD y panel de control intuitivo.',
      image: '/assets/hosting-web.png',
      icon: Server,
      color: 'from-blue-500 to-blue-600',
      features: [
        'SSD Storage de alta velocidad',
        'SSL Gratuito incluido',
        'Backup diario automático',
        'Panel cPanel intuitivo',
        'Soporte PHP, MySQL, WordPress',
        'CDN global incluido',
        'Migración gratuita',
        'Uptime garantizado 99.9%'
      ],
      plans: [
        {
          name: 'Básico',
          price: '$9.99',
          period: '/mes',
          features: ['10 GB SSD', '1 Sitio Web', '100 GB Transferencia', 'SSL Gratuito', 'Soporte 24/7']
        },
        {
          name: 'Profesional',
          price: '$19.99',
          period: '/mes',
          features: ['50 GB SSD', '5 Sitios Web', '500 GB Transferencia', 'SSL Gratuito', 'Backup Diario', 'CDN Global']
        },
        {
          name: 'Empresarial',
          price: '$39.99',
          period: '/mes',
          features: ['200 GB SSD', 'Sitios Ilimitados', '2 TB Transferencia', 'SSL Wildcard', 'Backup Diario', 'CDN Global', 'Soporte Prioritario']
        }
      ]
    },
    {
      id: 'gaming',
      title: 'Servidores Gaming',
      subtitle: 'Servidores optimizados para gaming',
      description: 'Servidores especializados para Minecraft, CS:GO, Rust y otros juegos populares. Hardware de última generación con protección anti-DDoS incluida.',
      image: '/assets/gaming-servers.png',
      icon: Gamepad2,
      color: 'from-purple-500 to-pink-600',
      features: [
        'Hardware de última generación',
        'Protección Anti-DDoS avanzada',
        'Instalación 1-Click de juegos',
        'Mods y plugins personalizados',
        'Panel de control gaming',
        'Soporte 24/7 especializado',
        'Backups automáticos',
        'Latencia ultra baja'
      ],
      plans: [
        {
          name: 'Starter',
          price: '$14.99',
          period: '/mes',
          features: ['2 GB RAM', '20 Slots', 'SSD 10 GB', 'Anti-DDoS', 'Soporte 24/7']
        },
        {
          name: 'Pro Gamer',
          price: '$29.99',
          period: '/mes',
          features: ['6 GB RAM', '50 Slots', 'SSD 50 GB', 'Anti-DDoS Pro', 'Mods Ilimitados', 'Backup Diario']
        },
        {
          name: 'Elite',
          price: '$59.99',
          period: '/mes',
          features: ['16 GB RAM', '100 Slots', 'SSD 200 GB', 'Anti-DDoS Elite', 'CPU Dedicado', 'Soporte Prioritario']
        }
      ]
    },
    {
      id: 'cloud',
      title: 'Cloud Hosting',
      subtitle: 'Soluciones cloud escalables',
      description: 'Infraestructura cloud moderna con recursos dedicados y alta disponibilidad. Escalabilidad automática y balanceador de carga incluido.',
      image: '/assets/cloud-hosting.png',
      icon: Cloud,
      color: 'from-cyan-500 to-blue-600',
      features: [
        'Auto-scaling inteligente',
        'Load Balancer incluido',
        'CDN global distribuido',
        'API de gestión completa',
        'Monitoreo en tiempo real',
        'Backup automático',
        'Seguridad avanzada',
        'SLA 99.99% uptime'
      ],
      plans: [
        {
          name: 'Cloud Start',
          price: '$24.99',
          period: '/mes',
          features: ['2 vCPU', '4 GB RAM', '50 GB SSD', 'Load Balancer', 'CDN Global']
        },
        {
          name: 'Cloud Pro',
          price: '$49.99',
          period: '/mes',
          features: ['4 vCPU', '8 GB RAM', '200 GB SSD', 'Auto-scaling', 'API Management', 'Monitoreo 24/7']
        },
        {
          name: 'Cloud Enterprise',
          price: '$99.99',
          period: '/mes',
          features: ['8 vCPU', '32 GB RAM', '1 TB SSD', 'Recursos Dedicados', 'Soporte Dedicado', 'SLA Premium']
        }
      ]
    },
    {
      id: 'security',
      title: 'Seguridad Web',
      subtitle: 'Protección avanzada 24/7',
      description: 'Servicios de seguridad web completos con protección contra malware, DDoS y vulnerabilidades. Monitoreo continuo y respuesta rápida.',
      image: '/assets/security-web.png',
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
      features: [
        'Firewall WAF avanzado',
        'Monitoreo de malware 24/7',
        'Certificados SSL/TLS',
        'Auditorías de seguridad',
        'Protección DDoS',
        'Análisis de vulnerabilidades',
        'Respuesta a incidentes',
        'Informes detallados'
      ],
      plans: [
        {
          name: 'Básico',
          price: '$19.99',
          period: '/mes',
          features: ['SSL Básico', 'Firewall WAF', 'Monitoreo Malware', 'Soporte Email']
        },
        {
          name: 'Avanzado',
          price: '$39.99',
          period: '/mes',
          features: ['SSL Wildcard', 'WAF Avanzado', 'Anti-DDoS', 'Auditorías Mensuales', 'Soporte 24/7']
        },
        {
          name: 'Enterprise',
          price: '$79.99',
          period: '/mes',
          features: ['SSL EV', 'WAF Enterprise', 'DDoS Protection Pro', 'Auditorías Semanales', 'Respuesta Incidentes', 'Soporte Dedicado']
        }
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Database,
      title: 'Bases de Datos',
      description: 'Gestión profesional de MySQL, PostgreSQL y MongoDB con backup automático y optimización.',
      features: ['Backup Automático', 'Replicación', 'Monitoreo 24/7', 'Optimización']
    },
    {
      icon: Code,
      title: 'Desarrollo Web',
      description: 'Desarrollo de sitios web y aplicaciones personalizadas con tecnologías modernas.',
      features: ['React/Vue.js', 'Node.js/PHP', 'Diseño Responsive', 'SEO Optimizado']
    }
  ];

  const currentService = services.find(service => service.id === activeService);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Nuestros <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Servicios</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ofrecemos una amplia gama de servicios tecnológicos diseñados para impulsar tu presencia digital y optimizar tu infraestructura.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Services Navigation */}
      <section className="py-12 bg-card/50">
        <Container>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
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
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background text-muted-foreground hover:bg-primary/10 hover:text-foreground'
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
      <section className="py-16">
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
                <div className={`absolute inset-0 bg-gradient-to-t ${currentService.color} opacity-20`} />
              </div>
            </div>

            {/* Service Info */}
            <div className="order-1 lg:order-2">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentService.color} text-white mb-4`}>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">
              Planes de {currentService.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentService.plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className={`p-8 text-center relative overflow-hidden ${
                    index === 1 ? 'border-primary shadow-lg scale-105' : ''
                  }`}>
                    {index === 1 && (
                      <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-sm font-medium py-2">
                        Más Popular
                      </div>
                    )}
                    
                    <h4 className="text-xl font-bold text-foreground mb-4 mt-2">
                      {plan.name}
                    </h4>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full" 
                      variant={index === 1 ? 'default' : 'outline'}
                    >
                      Elegir Plan
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              Complementa tu infraestructura con nuestros servicios especializados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {service.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Support Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Soporte Técnico 24/7
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Equipo de expertos disponible las 24 horas para resolver cualquier inconveniente.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Expertos certificados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>Respuesta rápida</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Migración Gratuita
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Migramos tu sitio web desde tu proveedor actual sin costo adicional.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Proceso seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span>Sin tiempo de inactividad</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
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
              Nuestro equipo de expertos está listo para ayudarte a encontrar la solución perfecta para tus necesidades específicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Solicitar Cotización
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
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

