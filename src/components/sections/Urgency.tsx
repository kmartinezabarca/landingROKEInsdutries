import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Auditamos tu stack, identificamos cuellos de botella y armamos una propuesta concreta. Sin compromiso, sin jerga inútil.",
    tags: ["3 - 5 días", "Auditoría técnica", "Propuesta + presupuesto"],
    arrow: true,
  },
  {
    num: "02",
    title: "Implementación",
    desc: "Diseño, despliegue y migración sin downtime. Trabajamos en paralelo con tu equipo para que aprendan a la par.",
    tags: ["2 - 6 semanas", "Cero downtime", "Docs y handover"],
    arrow: true,
  },
  {
    num: "03",
    title: "Soporte continuo",
    desc: "Monitoreo 24/7, SLA real, parches de seguridad y mejora continua. Tu infra envejece bien.",
    tags: ["SLA 99.9%", "Alertas WhatsApp", "Revisión mensual"],
    arrow: false,
  },
];

const Urgency: React.FC = () => {
  return (
    <section className="bg-[#f6f7f6] px-6 py-16 text-[#141821] md:px-14 md:py-20">
      <div className="mx-auto max-w-[1296px]">
        <div className="mb-16 grid gap-10 md:grid-cols-[1fr_1.05fr] md:items-start lg:mb-20">
          <div>
            <div className="roke-eyebrow mb-7">
              <span className="roke-eyebrow-line" />
              <span>04 / CÓMO TRABAJAMOS</span>
            </div>

            <h2 className="text-[54px] font-bold leading-[0.96] tracking-[-0.045em] text-[#141821] md:text-[64px] lg:text-[66px]">
              Tres pasos.
              <br />
              <span className="font-medium text-[#465363]">Sin sorpresas.</span>
            </h2>
          </div>

          <p className="max-w-[560px] pt-10 text-[18px] leading-[1.45] tracking-[-0.01em] text-[#24324b] md:justify-self-center">
            Nuestro proceso es honesto y rastreable. Cada fase tiene
            entregables, plazos y un canal de WhatsApp directo con tu
            líder técnico.
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="border-[#d4d9dd] py-10 md:min-h-[328px] md:px-10 md:py-9 md:[&:not(:last-child)]:border-r lg:px-10"
            >
              <div className="mb-7 flex items-center gap-5">
                <span className="text-[54px] font-bold leading-none tracking-[-0.045em] text-[#141821]">
                  {step.num}
                </span>
                {step.arrow && (
                  <ArrowRight className="mt-1 h-5 w-5 text-[#7a8594]" strokeWidth={1.8} />
                )}
              </div>

              <h3 className="mb-4 text-[24px] font-bold leading-tight tracking-[-0.03em] text-[#141821]">
                {step.title}
              </h3>

              <p className="mb-7 max-w-[390px] text-[16px] leading-[1.38] tracking-[-0.01em] text-[#24324b]">
                {step.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#d4d9dd] bg-[#f6f7f6] px-2.5 py-1 font-mono text-[10px] leading-none tracking-[0.18em] text-[#6f7b8b]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Urgency;
