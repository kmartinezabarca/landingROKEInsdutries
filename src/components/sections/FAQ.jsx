import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "../common/Container";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cuál es el tiempo de despliegue?",
      answer:
        "Nuestros servidores se despliegan en menos de 24 horas. La mayoría de los clientes están operativos en 12 horas. Ofrecemos despliegue prioritario para clientes empresariales.",
    },
    {
      question: "¿Qué incluye el soporte 24/7?",
      answer:
        "Nuestro soporte incluye asistencia técnica completa, resolución de incidentes, monitoreo proactivo, y actualizaciones de seguridad. Todos nuestros técnicos hablan español.",
    },
    {
      question: "¿Puedo cambiar de plan en cualquier momento?",
      answer:
        "Sí, puedes cambiar de plan en cualquier momento. Los cambios se aplican en el próximo ciclo de facturación. No hay penalizaciones por cambios de plan.",
    },
    {
      question: "¿Qué garantía de uptime ofrecen?",
      answer:
        "Garantizamos 99.9% de uptime con SLA respaldado. Si no cumplimos, recibirás crédito en tu cuenta. Nuestra infraestructura es redundante y distribuida globalmente.",
    },
    {
      question: "¿Incluye certificado SSL?",
      answer:
        "Sí, todos nuestros planes incluyen certificado SSL gratuito de Let's Encrypt. También ofrecemos certificados SSL premium si lo necesitas.",
    },
    {
      question: "¿Cómo funciona la facturación?",
      answer:
        "Ofrecemos facturación mensual y anual. Los planes anuales incluyen descuento. Puedes cambiar tu ciclo de facturación en cualquier momento desde tu panel de control.",
    },
    {
      question: "¿Qué pasa si necesito más recursos?",
      answer:
        "Puedes escalar tu plan en cualquier momento. Nuestros servidores crecen contigo sin tiempo de inactividad. Para necesidades especiales, contáctanos para soluciones personalizadas.",
    },
    {
      question: "¿Hacen backups de mis datos?",
      answer:
        "Sí, hacemos backups automáticos diarios en todos los planes Pro y Premium. También puedes descargar backups manuales en cualquier momento desde tu panel.",
    },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Respuestas a las preguntas más comunes sobre nuestros servicios
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground text-left">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border"
                    >
                      <p className="px-6 py-4 text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA after FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-6">
              ¿No encontraste tu pregunta? Nuestro equipo está listo para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/+1234567890?text=Hola%20ROKE%20Industries%2C%20tengo%20una%20pregunta%20sobre%20sus%20servicios"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Contactar por WhatsApp
              </a>
              <a
                href="mailto:contact@rokeindustries.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted/50 transition-colors"
              >
                Enviar Email
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FAQ;
