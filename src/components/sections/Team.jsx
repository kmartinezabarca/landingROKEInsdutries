import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import Container from '../common/Container';
import { Card, CardContent } from '../common/Card';

const Team = () => {
  const teamMembers = [
    {
      name: 'Carlos Rodríguez',
      position: 'CEO & Fundador',
      description: 'Ingeniero en Sistemas con más de 10 años de experiencia en infraestructura cloud y desarrollo de software.',
      image: '/src/assets/team-placeholder.png',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'carlos@rokeindustries.com'
      }
    },
    {
      name: 'Ana García',
      position: 'CTO',
      description: 'Especialista en arquitectura de sistemas y seguridad informática. Lidera nuestro equipo técnico con innovación.',
      image: '/src/assets/team-placeholder.png',
      social: {
        linkedin: '#',
        github: '#',
        email: 'ana@rokeindustries.com'
      }
    },
    {
      name: 'Miguel Torres',
      position: 'Director de Operaciones',
      description: 'Experto en gestión de servidores y optimización de rendimiento. Garantiza la máxima disponibilidad de nuestros servicios.',
      image: '/src/assets/team-placeholder.png',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'miguel@rokeindustries.com'
      }
    },
    {
      name: 'Laura Martínez',
      position: 'Gerente de Atención al Cliente',
      description: 'Psicóloga especializada en experiencia del usuario. Lidera nuestro equipo de soporte 24/7 con excelencia.',
      image: '/src/assets/team-placeholder.png',
      social: {
        linkedin: '#',
        email: 'laura@rokeindustries.com'
      }
    },
    {
      name: 'David López',
      position: 'Desarrollador Senior',
      description: 'Full-stack developer con expertise en React, Node.js y tecnologías cloud. Impulsa nuestras soluciones web.',
      image: '/src/assets/team-placeholder.png',
      social: {
        github: '#',
        linkedin: '#',
        email: 'david@rokeindustries.com'
      }
    },
    {
      name: 'Sofia Herrera',
      position: 'Especialista en Seguridad',
      description: 'Certificada en ciberseguridad con experiencia en protección de infraestructuras críticas y análisis de vulnerabilidades.',
      image: '/src/assets/team-placeholder.png',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sofia@rokeindustries.com'
      }
    }
  ];

  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: Linkedin,
      twitter: Twitter,
      github: Github,
      email: Mail
    };
    return icons[platform];
  };

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
            Nuestro Equipo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conoce a los profesionales apasionados que hacen posible nuestros 
            servicios de excelencia y están comprometidos con tu éxito.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-muted">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">
                    {member.position}
                  </p>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const Icon = getSocialIcon(platform);
                      return (
                        <motion.a
                          key={platform}
                          href={platform === 'email' ? `mailto:${url}` : url}
                          target={platform !== 'email' ? '_blank' : undefined}
                          rel={platform !== 'email' ? 'noopener noreferrer' : undefined}
                          className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            ¿Quieres unirte a nuestro equipo?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Estamos siempre buscando talento excepcional para fortalecer nuestro equipo. 
            Si compartes nuestra pasión por la tecnología y la excelencia, nos encantaría conocerte.
          </p>
          <motion.a
            href="mailto:careers@rokeindustries.com"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4 mr-2" />
            Enviar CV
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Team;

