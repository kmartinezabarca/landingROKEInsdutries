import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Award, Target } from 'lucide-react';
import Container from '../common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';

const About = () => {
  const milestones = [
    {
      year: '2018',
      title: 'Fundación',
      description: 'Inicio de operaciones con servicios de hosting básico'
    },
    {
      year: '2020',
      title: 'Expansión Gaming',
      description: 'Lanzamiento de servidores especializados para gaming'
    },
    {
      year: '2022',
      title: 'Certificaciones',
      description: 'Obtención de certificaciones de seguridad internacionales'
    },
    {
      year: '2024',
      title: 'Innovación',
      description: 'Implementación de tecnologías cloud de última generación'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Misión',
      description: 'Proporcionar soluciones tecnológicas confiables y accesibles que impulsen el crecimiento digital de nuestros clientes.'
    },
    {
      icon: Award,
      title: 'Visión',
      description: 'Ser la empresa líder en servicios de hosting y tecnología, reconocida por nuestra excelencia e innovación constante.'
    },
    {
      icon: Users,
      title: 'Valores',
      description: 'Compromiso, transparencia, innovación y excelencia en el servicio al cliente son los pilares de nuestra organización.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Clientes Satisfechos' },
    { number: '99.9%', label: 'Uptime Garantizado' },
    { number: '24/7', label: 'Soporte Técnico' },
    { number: '6+', label: 'Años de Experiencia' }
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
              <div className="text-muted-foreground">
                {stat.label}
              </div>
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
            {milestones.map((milestone, index) => (
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
                      <Calendar className="w-6 h-6 text-primary-foreground" />
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
            ))}
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

