import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Container from '../components/common/Container';

const TermsPage = () => {
  const sections = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Aceptación de Términos",
      content: [
        "Al acceder y utilizar los servicios de Roke Industries, aceptas estar sujeto a estos Términos y Condiciones.",
        "Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.",
        "Nos reservamos el derecho de modificar estos términos en cualquier momento con previo aviso.",
        "El uso continuado de nuestros servicios después de cambios constituye aceptación de los nuevos términos."
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Servicios Ofrecidos",
      content: [
        "Proporcionamos servicios de hosting web, servidores gaming y soluciones tecnológicas.",
        "Nos esforzamos por mantener un uptime del 99.9% pero no garantizamos disponibilidad absoluta.",
        "Los servicios están sujetos a mantenimientos programados con previo aviso.",
        "Nos reservamos el derecho de suspender servicios por violaciones de estos términos."
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Responsabilidades del Usuario",
      content: [
        "Eres responsable de mantener la confidencialidad de tus credenciales de acceso.",
        "No debes utilizar nuestros servicios para actividades ilegales o no autorizadas.",
        "Debes cumplir con todas las leyes aplicables en tu jurisdicción.",
        "Eres responsable de todo el contenido que alojes en nuestros servidores."
      ]
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: "Uso Prohibido",
      content: [
        "Actividades ilegales, fraudulentas o que violen derechos de terceros.",
        "Distribución de malware, virus o código malicioso.",
        "Spam, phishing o actividades de ingeniería social.",
        "Uso excesivo de recursos que afecte el rendimiento de otros usuarios."
      ]
    }
  ];

  const pricingTerms = [
    {
      title: "Facturación",
      items: [
        "Los servicios se facturan por adelantado según el plan seleccionado",
        "Los pagos deben realizarse antes del vencimiento para evitar suspensión",
        "Aceptamos tarjetas de crédito, PayPal y transferencias bancarias",
        "Todas las tarifas están sujetas a impuestos aplicables"
      ]
    },
    {
      title: "Reembolsos",
      items: [
        "Ofrecemos garantía de devolución de dinero de 30 días para nuevos clientes",
        "Los reembolsos se procesan en 5-10 días hábiles",
        "No se reembolsan servicios utilizados por más de 30 días",
        "Los dominios y licencias de terceros no son reembolsables"
      ]
    },
    {
      title: "Suspensión",
      items: [
        "Los servicios pueden suspenderse por falta de pago",
        "Suspensión inmediata por violación de términos de uso",
        "Notificación previa de 7 días para suspensiones por falta de pago",
        "Los datos pueden eliminarse después de 30 días de suspensión"
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
                <FileText className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Términos y Condiciones
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estos términos rigen el uso de los servicios de Roke Industries. Por favor, léelos cuidadosamente antes de utilizar nuestros servicios.
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
              Bienvenido a Roke Industries. Estos Términos y Condiciones ("Términos") rigen tu uso de nuestros 
              servicios de hosting web, servidores gaming y soluciones tecnológicas. Al utilizar nuestros servicios, 
              aceptas cumplir con estos términos y todas las políticas aplicables. Si representas a una organización, 
              confirmas que tienes autoridad para vincular a esa organización a estos términos.
            </p>
          </motion.div>

          {/* Main Sections */}
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

          {/* Pricing and Billing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card rounded-lg p-8 border mt-8"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary/10 rounded-lg mr-4">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Facturación y Pagos</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingTerms.map((term, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="font-semibold text-lg">{term.title}</h4>
                  <ul className="space-y-2">
                    {term.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Limitation of Liability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-card rounded-lg p-8 border mt-8"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary/10 rounded-lg mr-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Limitación de Responsabilidad</h3>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Servicios "Como Están":</strong> Nuestros servicios se proporcionan 
                "como están" sin garantías de ningún tipo, expresas o implícitas.
              </p>
              <p>
                <strong className="text-foreground">Limitación de Daños:</strong> En ningún caso seremos responsables 
                por daños indirectos, incidentales, especiales o consecuentes.
              </p>
              <p>
                <strong className="text-foreground">Límite Máximo:</strong> Nuestra responsabilidad total no excederá 
                el monto pagado por los servicios en los 12 meses anteriores al evento.
              </p>
              <p>
                <strong className="text-foreground">Backup y Datos:</strong> Aunque realizamos backups regulares, 
                eres responsable de mantener copias de seguridad de tus datos.
              </p>
            </div>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-card rounded-lg p-8 border mt-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Propiedad Intelectual</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Nuestros Derechos</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Todos los derechos sobre nuestra plataforma y tecnología
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Marcas comerciales y logos de Roke Industries
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Documentación y materiales de soporte
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Tus Derechos</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Mantienes todos los derechos sobre tu contenido
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Licencia para usar nuestros servicios según estos términos
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Derecho a exportar tus datos en cualquier momento
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Termination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-card rounded-lg p-8 border mt-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Terminación del Servicio</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Puedes cancelar tu cuenta en cualquier momento desde tu panel de control o contactando a nuestro 
                equipo de soporte. La cancelación será efectiva al final del período de facturación actual.
              </p>
              <p>
                Nos reservamos el derecho de suspender o terminar tu cuenta inmediatamente si violas estos términos, 
                realizas actividades ilegales, o si tu cuenta presenta riesgos de seguridad.
              </p>
              <p>
                Tras la terminación, tendrás 30 días para descargar tus datos antes de que sean eliminados 
                permanentemente de nuestros sistemas.
              </p>
            </div>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="bg-card rounded-lg p-8 border mt-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Ley Aplicable y Jurisdicción</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Estos términos se rigen por las leyes del país donde Roke Industries tiene su sede principal, 
                sin considerar conflictos de principios legales.
              </p>
              <p>
                Cualquier disputa relacionada con estos términos será resuelta mediante arbitraje vinculante 
                o en los tribunales competentes de nuestra jurisdicción.
              </p>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-primary/5 rounded-lg p-8 mt-12 text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">¿Preguntas sobre estos Términos?</h3>
            <p className="text-muted-foreground mb-6">
              Si tienes alguna pregunta sobre estos Términos y Condiciones, no dudes en contactarnos. 
              Estamos aquí para ayudarte a entender tus derechos y obligaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-sm">
                <strong>Email Legal:</strong> legal@rokeindustries.com
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
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-12 p-6 bg-muted/50 rounded-lg"
          >
            <p className="text-sm text-muted-foreground text-center">
              Estos Términos y Condiciones pueden ser actualizados periódicamente. Te notificaremos sobre 
              cambios significativos con al menos 30 días de anticipación. Si no estás de acuerdo con los 
              cambios, puedes cancelar tu cuenta antes de que entren en vigor.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default TermsPage;

