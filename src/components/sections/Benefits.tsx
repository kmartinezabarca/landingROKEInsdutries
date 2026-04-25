import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Headphones,
} from "lucide-react";
import Container from "../common/Container";

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const Benefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: Zap,
      title: "Rendimiento Ultra Rápido",
      description: "Servidores con almacenamiento NVMe y CDN global para latencia mínima",
    },
    {
      icon: Shield,
      title: "Seguridad Empresarial",
      description: "Protección 24/7 con firewalls WAF y monitoreo contra amenazas",
    },
    {
      icon: Clock,
      title: "Despliegue en 24 Horas",
      description: "Tus servidores listos y funcionando en menos de un día",
    },
    {
      icon: Users,
      title: "Escalabilidad Ilimitada",
      description: "Crece sin límites con infraestructura que se adapta a tu negocio",
    },
    {
      icon: CheckCircle,
      title: "99.9% Uptime Garantizado",
      description: "Infraestructura redundante para máxima disponibilidad",
    },
    {
      icon: Headphones,
      title: "Soporte Real en Español",
      description: "Equipo técnico disponible 24/7 para resolver tus problemas",
    },
  ];

  return (
    <section className="py-20 bg-muted/30 dark:bg-slate-900/40">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Por qué elegir ROKE Industries?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos la solución confiable para empresas que necesitan infraestructura profesional sin complicaciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Benefits;
