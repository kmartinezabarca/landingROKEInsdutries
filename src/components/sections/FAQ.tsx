import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Mail, MessageCircle } from "lucide-react";
import Container from "../common/Container";
import { CONFIG } from "../../utils/constants/config";
import WhatsAppService from "../../services/whatsapp/whatsappService";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
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
    <section className="relative overflow-hidden border-t border-border bg-background py-[80px]">
      <div className="roke-grid-bg opacity-60" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-[1296px]"
        >
          <div className="mb-16 grid grid-cols-1 items-end gap-12 md:grid-cols-[0.95fr_1.45fr]">
            <div>
              <div className="roke-eyebrow mb-6">
                <span className="roke-eyebrow-line" />
                <span>06 / FAQ</span>
              </div>
              <h2 className="m-0 font-sans text-[52px] font-bold leading-[0.98] text-foreground md:text-[64px]">
                Preguntas<br />
                <span className="font-medium text-muted-foreground">frecuentes.</span>
              </h2>
            </div>
            <p className="max-w-[560px] text-[17px] leading-[1.55] text-muted-foreground">
              Respuestas claras sobre despliegue, soporte, escalamiento, seguridad
              y facturación antes de contratar infraestructura con ROKE.
            </p>
          </div>

          <div className="grid grid-cols-1 border border-border lg:grid-cols-2">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                viewport={{ once: true }}
                className="border border-border -m-[1px] bg-card transition-colors hover:bg-muted/50"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-start justify-between gap-5 px-6 py-5 text-left transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex gap-4">
                    <span className="pt-1 font-sans text-[11px] text-muted-foreground">
                      / {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[16px] font-bold leading-[1.35] text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
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
                      <div className="grid grid-cols-[72px_1fr] px-6 py-5">
                        <div className="font-sans text-[10px] text-muted-foreground">
                          ROKE
                        </div>
                        <p className="m-0 text-[14px] leading-[1.65] text-muted-foreground">
                          {faq.answer}
                        </p>
                      </div>
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
            className="mt-16 border border-border bg-card p-8 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10"
          >
            <div>
              <div className="mb-2 font-sans text-[11px] text-muted-foreground">
                Soporte directo
              </div>
              <p className="m-0 max-w-[560px] text-[16px] leading-[1.55] text-muted-foreground">
                ¿No encontraste tu pregunta? Nuestro equipo puede ayudarte a aterrizar
                una solución concreta para tu caso.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row md:mt-0">
              <button
                type="button"
                onClick={() => WhatsAppService.openWhatsApp("Hola ROKE Industries, tengo una pregunta sobre sus servicios.")}
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-foreground px-6 py-[14px] text-[14px] font-semibold text-background transition-all hover:-translate-y-px hover:shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                Contactar por WhatsApp
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={`mailto:${CONFIG.CONTACT?.EMAIL || "contact@rokeindustries.com"}`}
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-border px-6 py-[14px] text-[14px] font-semibold text-foreground transition-all hover:border-foreground hover:bg-muted"
              >
                <Mail className="h-4 w-4" />
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
