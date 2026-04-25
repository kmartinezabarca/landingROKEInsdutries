import React from "react";
import { motion } from "framer-motion";
import { Star, Users, Zap, Award } from "lucide-react";
import {
  FaLinux,
  FaDocker,
  FaAws,
  FaNode,
  FaPython,
  FaReact,
  FaAws as FaAmazonAws
} from "react-icons/fa";
import { SiKubernetes, SiPostgresql } from "react-icons/si";
import Container from "../common/Container";

interface Stat {
  icon: React.ElementType;
  number: string;
  label: string;
  description: string;
}

interface Testimonial {
  name: string;
  company: string;
  text: string;
  rating: number;
}

interface Technology {
  name: string;
  icon: React.ElementType;
  color: string;
}

const SocialProof: React.FC = () => {
  const stats: Stat[] = [
    {
      icon: Users,
      number: "500+",
      label: "Clientes Activos",
      description: "Empresas confiando en nuestra infraestructura",
    },
    {
      icon: Award,
      number: "99.9%",
      label: "Uptime Garantizado",
      description: "Infraestructura redundante y confiable",
    },
    {
      icon: Zap,
      number: "24h",
      label: "Despliegue Rápido",
      description: "Tus servidores listos en un día",
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Calificación Promedio",
      description: "Satisfacción de nuestros clientes",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Carlos Mendoza",
      company: "TechStart MX",
      text: "ROKE Industries transformó nuestra infraestructura. El soporte es excepcional y los precios son muy competitivos.",
      rating: 5,
    },
    {
      name: "María García",
      company: "Gaming Studio LA",
      text: "Los servidores gaming son increíblemente rápidos. Nuestros jugadores notaron la diferencia inmediatamente.",
      rating: 5,
    },
    {
      name: "Roberto López",
      company: "E-commerce Solutions",
      text: "Escalamos nuestro negocio sin preocupaciones. La infraestructura de ROKE crece con nosotros.",
      rating: 5,
    },
  ];

  const technologies: Technology[] = [
    { name: "Linux", icon: FaLinux, color: "hover:text-[#FCC624]" },
    { name: "Docker", icon: FaDocker, color: "hover:text-[#2496ED]" },
    { name: "Kubernetes", icon: SiKubernetes, color: "hover:text-[#326CE5]" },
    { name: "AWS", icon: FaAws, color: "hover:text-[#FF9900]" },
    { name: "Node.js", icon: FaNode, color: "hover:text-[#339933]" },
    { name: "Python", icon: FaPython, color: "hover:text-[#3776AB]" },
    { name: "React", icon: FaReact, color: "hover:text-[#61DAFB]" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "hover:text-[#4169E1]" },
  ];

  return (
    <section className="py-20 bg-muted/20 dark:bg-gradient-to-br dark:from-slate-950 dark:via-primary/5 dark:to-slate-950">
      <Container>
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center mb-12">
            Empresas reales que confían en ROKE Industries para su infraestructura crítica.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Tecnologías que utilizamos
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  viewport={{ once: true }}
                  className={`bg-card border border-border rounded-lg px-6 py-3 flex items-center gap-3 transition-all duration-300 group ${tech.color} hover:border-current hover:shadow-md`}
                >
                  <Icon className="w-6 h-6 text-muted-foreground group-hover:text-current transition-colors" />
                  <span className="font-semibold text-foreground group-hover:text-current transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default SocialProof;
