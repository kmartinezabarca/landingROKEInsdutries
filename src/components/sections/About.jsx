import React from "react";
import { motion } from "framer-motion";
import { Calendar, Rocket, Eye, Gem, HardHat, Wrench, Server } from "lucide-react";
import Container from "../common/Container";
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";

const About = () => {
  const milestones = [
    {
        year: '2018-2021',
        title: 'La Forja del Ingeniero',
        description: 'Años de inmersión autodidacta en ingeniería de ciclo completo: desde la reparación de electrónica de potencia y generadores hasta el ensamblaje de drones y sistemas de control con Arduino y Raspberry Pi.',
        icon: HardHat 
      },
      {
        year: '2022-2023',
        title: 'Construcción del Laboratorio',
        description: 'Inversión y ensamblaje del núcleo del laboratorio de I+D de ROKE: estaciones de trabajo de alto rendimiento, infraestructura de red gestionada y adquisición de herramientas de fabricación digital (CNC, Impresión 3D).',
        icon: Wrench 
      },
      {
        year: '2024',
        title: 'Nacimiento de la Infraestructura',
        description: 'Diseño y construcción de nuestro centro de datos privado, ensamblando un servidor de grado empresarial basado en Xeon para potenciar nuestras futuras operaciones de hosting y servicios en la nube.',
        icon: Server 
      },
      {
        year: '2025',
        title: 'Fundación de ROKE Industries',
        description: 'Lanzamiento oficial de ROKE Industries, la culminación de años de experiencia práctica y la consolidación de un laboratorio de tecnología de vanguardia para servir a nuestros clientes con soluciones reales y probadas.',
        icon: Rocket 
      }
  ];

  const values = [
  {
    icon: Rocket, // Misión: es el motor, el impulso.
    title: "Nuestra Misión",
    description:
      "Empoderar a creadores e innovadores con soluciones tecnológicas de ciclo completo, desde la infraestructura de nube robusta hasta la fabricación de prototipos de hardware, acelerando el viaje de la idea a la realidad.",
  },
  {
    icon: Eye, // Visión: es mirar hacia el futuro.
    title: "Nuestra Visión",
    description:
      "Ser el socio tecnológico fundamental para la próxima generación de startups y empresas, reconocidos no solo por nuestros servicios, sino por nuestra capacidad de construir las herramientas que construyen el futuro.",
  },
  {
    icon: Gem, // Valores: son las joyas, los principios inquebrantables.
    title: "Nuestros Valores",
    description:
      "La curiosidad del ingeniero, la precisión del artesano y la transparencia del socio. Construimos con excelencia, nos obsesionamos con la fiabilidad y creemos en el poder de la tecnología para resolver problemas reales.",
  },
];

  const stats = [
    { number: "500+", label: "Clientes Satisfechos" },
    { number: "99.9%", label: "Uptime Garantizado" },
    { number: "24/7", label: "Soporte Técnico" },
    { number: "6+", label: "Años de Experiencia" },
  ];

  return (
    <section className="py-20 bg-muted/30">
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
            Nuestra Historia
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Desde nuestros inicios, hemos estado comprometidos con la excelencia
            tecnológica y la satisfacción del cliente.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Hitos Importantes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{milestone.year}</CardTitle>
                    <h4 className="font-semibold text-foreground">
                      {milestone.title}
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              );
              })}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Nuestros Principios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default About;
