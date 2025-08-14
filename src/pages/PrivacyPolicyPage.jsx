import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, FileText } from 'lucide-react';
import Container from '../components/common/Container';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Información que Recopilamos",
      content: [
        "Información personal que nos proporcionas voluntariamente (nombre, email, teléfono)",
        "Información técnica sobre tu dispositivo y navegación",
        "Cookies y tecnologías similares para mejorar tu experiencia",
        "Registros de comunicaciones y soporte técnico"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Cómo Utilizamos tu Información",
      content: [
        "Proporcionar y mantener nuestros servicios de hosting y tecnología",
        "Comunicarnos contigo sobre tu cuenta y servicios",
        "Mejorar nuestros servicios y desarrollar nuevas funcionalidades",
        "Cumplir con obligaciones legales y regulatorias"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Protección de Datos",
      content: [
        "Implementamos medidas de seguridad técnicas y organizativas",
        "Cifrado de datos en tránsito y en reposo",
        "Acceso restringido solo a personal autorizado",
        "Auditorías regulares de seguridad y cumplimiento"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Tus Derechos",
      content: [
        "Derecho de acceso a tus datos personales",
        "Derecho de rectificación y actualización",
        "Derecho de supresión ('derecho al olvido')",
        "Derecho de portabilidad de datos"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Shield className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Política de Privacidad
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              En Roke Industries, protegemos tu privacidad y datos personales con los más altos estándares de seguridad y transparencia.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              Última actualización: 14 de agosto de 2025
            </div>
          </div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-lg p-8 mb-12 border"
          >
            <h2 className="text-2xl font-semibold mb-4">Introducción</h2>
            <p className="text-muted-foreground leading-relaxed">
              Esta Política de Privacidad describe cómo Roke Industries ("nosotros", "nuestro" o "la empresa") 
              recopila, utiliza y protege tu información personal cuando utilizas nuestros servicios de hosting, 
              servidores gaming y soluciones tecnológicas. Al utilizar nuestros servicios, aceptas las prácticas 
              descritas en esta política.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-card rounded-lg p-8 border"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-semibold">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Cookies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card rounded-lg p-8 border mt-8"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary/10 rounded-lg mr-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Política de Cookies</h3>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Cookies Esenciales</h4>
                  <p className="text-sm">Necesarias para el funcionamiento básico del sitio web.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Cookies de Rendimiento</h4>
                  <p className="text-sm">Nos ayudan a entender cómo interactúas con nuestro sitio.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Cookies Funcionales</h4>
                  <p className="text-sm">Permiten funcionalidades mejoradas y personalización.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Cookies de Marketing</h4>
                  <p className="text-sm">Utilizadas para mostrar contenido relevante y personalizado.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-primary/5 rounded-lg p-8 mt-12 text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">¿Tienes Preguntas sobre tu Privacidad?</h3>
            <p className="text-muted-foreground mb-6">
              Si tienes alguna pregunta sobre esta Política de Privacidad o sobre cómo manejamos tus datos, 
              no dudes en contactarnos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-sm">
                <strong>Email:</strong> privacy@rokeindustries.com
              </div>
              <div className="text-sm">
                <strong>Teléfono:</strong> +1 (234) 567-8900
              </div>
            </div>
          </motion.div>

          {/* Legal Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 p-6 bg-muted/50 rounded-lg"
          >
            <p className="text-sm text-muted-foreground text-center">
              Esta Política de Privacidad puede ser actualizada periódicamente. Te notificaremos sobre 
              cambios significativos a través de nuestro sitio web o por email. El uso continuado de 
              nuestros servicios después de dichos cambios constituye tu aceptación de la nueva política.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;

