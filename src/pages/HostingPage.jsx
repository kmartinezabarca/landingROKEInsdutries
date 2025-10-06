import React from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  Globe,
  Gamepad2,
  Crown,
  Star,
  ArrowRight,
  Link
} from 'lucide-react';
import Container from '../components/common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import Button from '../components/common/Button';
import WhatsAppService from '../services/whatsapp/whatsappService';
import { useServicePlans } from '../hooks/useServicePlans';

const HostingPage = () => {
  const [activeTab, setActiveTab] = React.useState('hosting');
  const { data: servicePlans, isLoading, isError, error } = useServicePlans();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando planes de servicio...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-red-500">Error al cargar los planes de servicio: {error.message}</p>
      </div>
    );
  }

  const hostingPlans = servicePlans?.filter(plan => plan.type === 'hosting') || [];
  const gamingPlans = servicePlans?.filter(plan => plan.type === 'gaming') || [];

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
                key={plan.id || plan.name}
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
                        {plan.currency}{plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features && plan.features.map((feature, idx) => (
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
                key={plan.id || plan.name}
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
                        {plan.currency}{plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {plan.description}
                    </p>

                    {/* Specs */}
                    {plan.specs && (
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
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features && plan.features.map((feature, idx) => (
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
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
              <Link to="/contact" className="flex items-center">
                Solicitar Cotización
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/hosting">Ver Planes de Hosting</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default HostingPage;

