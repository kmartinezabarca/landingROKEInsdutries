import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Server, 
  Shield, 
  Zap, 
  HardDrive, 
  Globe, 
  Users,
  Gamepad2,
  Crown,
  Star,
  ArrowRight
} from 'lucide-react';
import Container from '../components/common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import Button from '../components/common/Button';
import WhatsAppService from '../services/whatsapp/whatsappService';

const HostingPage = () => {
  const [activeTab, setActiveTab] = React.useState('hosting');

  const hostingPlans = [
    {
      name: 'Básico',
      price: '$9.99',
      period: '/mes',
      description: 'Perfect para sitios web personales y pequeños proyectos',
      popular: false,
      features: [
        { name: '10 GB SSD Storage', included: true },
        { name: '100 GB Bandwidth', included: true },
        { name: '1 Dominio Incluido', included: true },
        { name: '5 Cuentas de Email', included: true },
        { name: 'SSL Gratuito', included: true },
        { name: 'Backup Diario', included: true },
        { name: 'Soporte 24/7', included: true },
        { name: 'Panel cPanel', included: true },
        { name: 'CDN Global', included: false },
        { name: 'Staging Environment', included: false }
      ]
    },
    {
      name: 'Profesional',
      price: '$19.99',
      period: '/mes',
      description: 'Ideal para empresas y sitios web con tráfico medio',
      popular: true,
      features: [
        { name: '50 GB SSD Storage', included: true },
        { name: '500 GB Bandwidth', included: true },
        { name: '5 Dominios Incluidos', included: true },
        { name: '25 Cuentas de Email', included: true },
        { name: 'SSL Gratuito', included: true },
        { name: 'Backup Diario', included: true },
        { name: 'Soporte 24/7', included: true },
        { name: 'Panel cPanel', included: true },
        { name: 'CDN Global', included: true },
        { name: 'Staging Environment', included: true }
      ]
    },
    {
      name: 'Empresarial',
      price: '$39.99',
      period: '/mes',
      description: 'Para sitios web de alto tráfico y aplicaciones críticas',
      popular: false,
      features: [
        { name: '200 GB SSD Storage', included: true },
        { name: 'Bandwidth Ilimitado', included: true },
        { name: 'Dominios Ilimitados', included: true },
        { name: 'Cuentas Email Ilimitadas', included: true },
        { name: 'SSL Gratuito', included: true },
        { name: 'Backup Diario', included: true },
        { name: 'Soporte Prioritario 24/7', included: true },
        { name: 'Panel cPanel Avanzado', included: true },
        { name: 'CDN Global Premium', included: true },
        { name: 'Staging Environment', included: true }
      ]
    }
  ];

  const gamingPlans = [
    {
      name: 'Minecraft Básico',
      price: '$12.99',
      period: '/mes',
      description: 'Perfecto para servidores pequeños con amigos',
      game: 'Minecraft',
      popular: false,
      specs: {
        ram: '2 GB RAM',
        cpu: '2 CPU Cores',
        storage: '20 GB SSD',
        players: '10 Jugadores'
      },
      features: [
        { name: 'Instalación 1-Click', included: true },
        { name: 'Panel de Control Web', included: true },
        { name: 'Mods y Plugins', included: true },
        { name: 'Backup Automático', included: true },
        { name: 'Protección Anti-DDoS', included: true },
        { name: 'Soporte 24/7', included: true },
        { name: 'FTP Access', included: true },
        { name: 'Base de Datos MySQL', included: false }
      ]
    },
    {
      name: 'Gaming Pro',
      price: '$24.99',
      period: '/mes',
      description: 'Para comunidades gaming medianas',
      game: 'Multi-Game',
      popular: true,
      specs: {
        ram: '4 GB RAM',
        cpu: '4 CPU Cores',
        storage: '50 GB SSD',
        players: '50 Jugadores'
      },
      features: [
        { name: 'Instalación 1-Click', included: true },
        { name: 'Panel de Control Avanzado', included: true },
        { name: 'Mods y Plugins Ilimitados', included: true },
        { name: 'Backup Automático', included: true },
        { name: 'Protección Anti-DDoS Premium', included: true },
        { name: 'Soporte Prioritario 24/7', included: true },
        { name: 'FTP Access', included: true },
        { name: 'Base de Datos MySQL', included: true }
      ]
    },
    {
      name: 'Gaming Elite',
      price: '$49.99',
      period: '/mes',
      description: 'Para grandes comunidades y servidores profesionales',
      game: 'Multi-Game',
      popular: false,
      specs: {
        ram: '8 GB RAM',
        cpu: '8 CPU Cores',
        storage: '100 GB SSD',
        players: '100+ Jugadores'
      },
      features: [
        { name: 'Instalación 1-Click', included: true },
        { name: 'Panel de Control Profesional', included: true },
        { name: 'Mods y Plugins Ilimitados', included: true },
        { name: 'Backup Automático Múltiple', included: true },
        { name: 'Protección Anti-DDoS Enterprise', included: true },
        { name: 'Soporte Dedicado 24/7', included: true },
        { name: 'FTP/SFTP Access', included: true },
        { name: 'Bases de Datos Ilimitadas', included: true }
      ]
    }
  ];

  const handleContactSales = (planName, planType) => {
    const message = WhatsAppService.generateServiceMessage(
      planType === 'hosting' ? 'hosting' : 'gaming'
    ) + ` Estoy interesado en el plan ${planName}.`;
    WhatsAppService.openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
          style={{
            backgroundImage:
              "url('/assets/images/banners/banner-hosting.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Hosting & Gaming
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Planes de hosting web profesional y servidores gaming optimizados
              para el mejor rendimiento y experiencia.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("hosting")}
              className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === "hosting"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Hosting Web
            </button>
            <button
              onClick={() => setActiveTab("gaming")}
              className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === "gaming"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Gamepad2 className="w-4 h-4 inline mr-2" />
              Servidores Gaming
            </button>
          </div>
        </motion.div>

        {/* Hosting Plans */}
        {activeTab === "hosting" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {hostingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Más Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    plan.popular ? "border-primary shadow-lg scale-105" : ""
                  }`}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1 my-4">
                      <span className="text-4xl font-bold text-primary">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-6"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleContactSales(plan.name, "hosting")}
                    >
                      Contratar Plan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Gaming Plans */}
        {activeTab === "gaming" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {gamingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Recomendado
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    plan.popular ? "border-primary shadow-lg scale-105" : ""
                  }`}
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Gamepad2 className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1 my-4">
                      <span className="text-4xl font-bold text-primary">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {plan.description}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="font-medium text-foreground">
                          {plan.specs.ram}
                        </div>
                        <div className="text-muted-foreground">Memoria</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="font-medium text-foreground">
                          {plan.specs.cpu}
                        </div>
                        <div className="text-muted-foreground">Procesador</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="font-medium text-foreground">
                          {plan.specs.storage}
                        </div>
                        <div className="text-muted-foreground">
                          Almacenamiento
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="font-medium text-foreground">
                          {plan.specs.players}
                        </div>
                        <div className="text-muted-foreground">Jugadores</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-6"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleContactSales(plan.name, "gaming")}
                    >
                      Contratar Servidor
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-muted/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            ¿Por qué elegir Roke Industries?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Seguridad Garantizada
              </h4>
              <p className="text-muted-foreground">
                Protección DDoS, SSL gratuito y monitoreo 24/7 para mantener tus
                datos seguros.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Rendimiento Óptimo
              </h4>
              <p className="text-muted-foreground">
                Servidores SSD de alta velocidad y CDN global para la mejor
                experiencia de usuario.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Soporte Experto
              </h4>
              <p className="text-muted-foreground">
                Equipo técnico especializado disponible 24/7 para resolver
                cualquier inconveniente.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default HostingPage;

