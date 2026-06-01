import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../ui/scroll-motion";

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
    <section className="bg-[var(--roke-bg)] px-6 py-16 text-[var(--roke-text)] md:px-14 md:py-20">
      <div className="mx-auto max-w-[1296px]">
        <div className="mb-16 grid gap-10 md:grid-cols-[1fr_1.05fr] md:items-start lg:mb-20">
          <Reveal>
            <div className="roke-eyebrow mb-7">
              <span className="roke-eyebrow-line" />
              <span>04 / CÓMO TRABAJAMOS</span>
            </div>

            <h2 className="text-[54px] font-bold leading-[0.96] tracking-[-0.045em] text-[var(--roke-text)] md:text-[64px] lg:text-[66px]">
              Tres pasos.
              <br />
              <span className="font-medium text-[var(--roke-text-dim)]">Sin sorpresas.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-[560px] pt-10 text-[18px] leading-[1.45] tracking-[-0.01em] text-[var(--roke-text-dim)] md:justify-self-center">
              Nuestro proceso es honesto y rastreable. Cada fase tiene
              entregables, plazos y un canal de WhatsApp directo con tu
              líder técnico.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-0 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mi-icon-pop border-[var(--roke-border-strong)] py-10 md:min-h-[328px] md:px-10 md:py-9 md:[&:not(:last-child)]:border-r lg:px-10"
            >
              <div className="mb-7 flex items-center gap-5">
                <span className="text-[54px] font-bold leading-none tracking-[-0.045em] text-[var(--roke-text)]">
                  {step.num}
                </span>
                {step.arrow && (
                  <ArrowRight className="mt-1 h-5 w-5 text-[var(--roke-text-dimmer)]" strokeWidth={1.8} />
                )}
              </div>

              <h3 className="mb-4 text-[24px] font-bold leading-tight tracking-[-0.03em] text-[var(--roke-text)]">
                {step.title}
              </h3>

              <p className="mb-7 max-w-[390px] text-[16px] leading-[1.38] tracking-[-0.01em] text-[var(--roke-text-dim)]">
                {step.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[var(--roke-border-strong)] bg-[var(--roke-surface-2)] px-2.5 py-1 font-mono text-[10px] leading-none tracking-[0.18em] text-[var(--roke-text-dimmer)]"
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
