import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Eye, 
  Heart, 
  Award, 
  TrendingUp, 
  Shield, 
  Zap,
  Globe,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter
} from 'lucide-react';
import Container from '../components/common/Container';
import { Card } from '../components/common/Card';
import Button from '../components/common/Button';
import { CONFIG } from '../utils/constants/config';

const AboutPage = () => {
  const stats = [
    { number: '500+', label: 'Clientes Satisfechos', icon: Users },
    { number: '99.9%', label: 'Uptime Garantizado', icon: Shield },
    { number: '24/7', label: 'Soporte Técnico', icon: Zap },
    { number: '6+', label: 'Años de Experiencia', icon: Award }
  ];

  const timeline = [
    {
      year: '2018',
      title: 'Fundación',
      description: 'Inicio de operaciones con servicios de hosting básico y visión de crecimiento.',
      icon: Calendar
    },
    {
      year: '2020',
      title: 'Expansión Gaming',
      description: 'Lanzamiento de servidores especializados para gaming y comunidades online.',
      icon: TrendingUp
    },
    {
      year: '2022',
      title: 'Certificaciones',
      description: 'Obtención de certificaciones de seguridad internacionales ISO 27001.',
      icon: Award
    },
    {
      year: '2024',
      title: 'Innovación Cloud',
      description: 'Implementación de tecnologías cloud de última generación y IA.',
      icon: Globe
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excelencia',
      description: 'Nos comprometemos a ofrecer servicios de la más alta calidad, superando las expectativas de nuestros clientes en cada proyecto.'
    },
    {
      icon: Heart,
      title: 'Compromiso',
      description: 'Establecemos relaciones duraderas con nuestros clientes, siendo su socio tecnológico de confianza a largo plazo.'
    },
    {
      icon: Shield,
      title: 'Confiabilidad',
      description: 'Garantizamos la seguridad y disponibilidad de nuestros servicios con los más altos estándares de la industria.'
    },
    {
      icon: Zap,
      title: 'Innovación',
      description: 'Adoptamos las últimas tecnologías para mantener a nuestros clientes a la vanguardia del mundo digital.'
    }
  ];

  const team = [
    {
      name: 'Carlos Rodríguez',
      position: 'CEO & Fundador',
      image: '/assets/team-ceo.png',
      description: 'Ingeniero en Sistemas con más de 10 años de experiencia en infraestructura cloud y desarrollo de software. Visionario líder que fundó Roke Industries con la misión de democratizar el acceso a tecnologías avanzadas.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Ana García',
      position: 'CTO',
      image: '/assets/team-cto.png',
      description: 'Especialista en arquitectura de sistemas y seguridad informática. Lidera nuestro equipo técnico con innovación y expertise en tecnologías emergentes, garantizando la excelencia operacional.',
      linkedin: '#',
      twitter: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/about-hero.png)',
          }}
        >
          <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
        </div>
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Sobre <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Nosotros</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Somos un equipo apasionado de profesionales tecnológicos comprometidos con impulsar 
              el crecimiento digital de nuestros clientes a través de soluciones innovadoras y confiables.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nuestros Principios
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Los valores que guían cada decisión y acción en Roke Industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 text-center h-full">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Misión</h3>
                <p className="text-muted-foreground">
                  Proporcionar soluciones tecnológicas confiables y accesibles que impulsen 
                  el crecimiento digital de nuestros clientes, democratizando el acceso a 
                  tecnologías avanzadas.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-8 text-center h-full">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Visión</h3>
                <p className="text-muted-foreground">
                  Ser la empresa líder en servicios de hosting y tecnología en América Latina, 
                  reconocida por nuestra excelencia, innovación constante y compromiso con 
                  el éxito de nuestros clientes.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 text-center h-full">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Valores</h3>
                <p className="text-muted-foreground">
                  Compromiso, transparencia, innovación y excelencia en el servicio al cliente 
                  son los pilares fundamentales que definen nuestra cultura organizacional.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-card/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nuestra Historia
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un recorrido por los hitos más importantes que han marcado nuestro crecimiento
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <Card className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center ${index % 2 !== 0 ? 'order-2' : ''}`}>
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className={index % 2 !== 0 ? 'order-1' : ''}>
                            <div className="text-2xl font-bold text-primary">{item.year}</div>
                            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="relative z-10 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                    
                    <div className="w-1/2"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nuestro Equipo Directivo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce a los líderes visionarios que impulsan la innovación y excelencia en Roke Industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8 text-center h-full">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {member.position}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {member.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center hover:bg-blue-500/20 transition-colors duration-200"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin className="w-5 h-5 text-blue-500" />
                    </a>
                    <a
                      href={member.twitter}
                      className="w-10 h-10 bg-sky-500/10 rounded-full flex items-center justify-center hover:bg-sky-500/20 transition-colors duration-200"
                      aria-label={`Twitter de ${member.name}`}
                    >
                      <Twitter className="w-5 h-5 text-sky-500" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              ¿Quieres formar parte de nuestro equipo?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Estamos siempre buscando talento excepcional para fortalecer nuestro equipo. 
              Si compartes nuestra pasión por la tecnología y la excelencia, nos encantaría conocerte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>careers@rokeindustries.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Tech District, Ciudad</span>
              </div>
            </div>
            
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Enviar CV
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;

