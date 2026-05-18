import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const TermsPage: React.FC = () => {
  const sections = [
    { icon: CheckCircle, title: "Aceptación de Términos", num: "01", content: [
      "Al acceder y utilizar los servicios de ROKE Industries, aceptas estar sujeto a estos Términos y Condiciones.",
      "Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.",
      "Nos reservamos el derecho de modificar estos términos en cualquier momento con previo aviso.",
      "El uso continuado de nuestros servicios después de cambios constituye aceptación de los nuevos términos.",
    ]},
    { icon: Shield, title: "Servicios Ofrecidos", num: "02", content: [
      "Proporcionamos servicios de hosting web, servidores gaming y soluciones tecnológicas.",
      "Nos esforzamos por mantener un uptime del 99.9% pero no garantizamos disponibilidad absoluta.",
      "Los servicios están sujetos a mantenimientos programados con previo aviso.",
      "Nos reservamos el derecho de suspender servicios por violaciones de estos términos.",
    ]},
    { icon: Scale, title: "Responsabilidades del Usuario", num: "03", content: [
      "Eres responsable de mantener la confidencialidad de tus credenciales de acceso.",
      "No debes utilizar nuestros servicios para actividades ilegales o no autorizadas.",
      "Debes cumplir con todas las leyes aplicables en tu jurisdicción.",
      "Eres responsable de todo el contenido que alojes en nuestros servidores.",
    ]},
    { icon: XCircle, title: "Uso Prohibido", num: "04", content: [
      "Actividades ilegales, fraudulentas o que violen derechos de terceros.",
      "Distribución de malware, virus o código malicioso.",
      "Spam, phishing o actividades de ingeniería social.",
      "Uso excesivo de recursos que afecte el rendimiento de otros usuarios.",
    ]},
  ];

  const pricingTerms = [
    { title: "Facturación", items: ["Los servicios se facturan por adelantado según el plan seleccionado", "Los pagos deben realizarse antes del vencimiento para evitar suspensión", "Aceptamos tarjetas de crédito, PayPal y transferencias bancarias", "Todas las tarifas están sujetas a impuestos aplicables"] },
    { title: "Reembolsos",  items: ["Ofrecemos garantía de devolución de dinero de 30 días para nuevos clientes", "Los reembolsos se procesan en 5-10 días hábiles", "No se reembolsan servicios utilizados por más de 30 días", "Los dominios y licencias de terceros no son reembolsables"] },
    { title: "Suspensión",  items: ["Los servicios pueden suspenderse por falta de pago", "Suspensión inmediata por violación de términos de uso", "Notificación previa de 7 días para suspensiones por falta de pago", "Los datos pueden eliminarse después de 30 días de suspensión"] },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── Header ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border relative">
        <div className="roke-grid-bg opacity-40" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-6">
              <div className="w-8 h-[1px] bg-muted-foreground" />
              <span>Legal · Última actualización: 14 de agosto de 2025</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end">
              <h1 className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-foreground m-0">
                Términos y <span className="text-muted-foreground font-medium">Condiciones.</span>
              </h1>
              <p className="text-[17px] leading-[1.55] text-muted-foreground max-w-[520px] pb-1.5">
                Estos términos rigen el uso de los servicios de ROKE Industries. Por favor, léelos cuidadosamente antes de utilizar nuestros servicios.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-[80px] border-b border-border">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="border border-border p-10 bg-muted/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 border border-border flex items-center justify-center text-foreground">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-[22px] font-bold text-foreground tracking-[-0.01em]">Introducción</h2>
            </div>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-3xl">
              Bienvenido a ROKE Industries. Estos Términos y Condiciones rigen tu uso de nuestros servicios de hosting web, servidores gaming y soluciones tecnológicas. Al utilizar nuestros servicios, aceptas cumplir con estos términos y todas las políticas aplicables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Sections grid ── */}
      <section className="py-[80px] md:py-[120px] border-b border-border relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-10">
            <div className="w-8 h-[1px] bg-muted-foreground" />
            <span>Condiciones</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="p-9 border border-border -m-[1px] bg-card hover:bg-muted/20 transition-colors flex flex-col gap-5">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground">{section.num}</span>
                    <div className="roke-icon-box w-12 h-12 border border-border flex items-center justify-center text-foreground bg-background">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-[20px] font-bold text-foreground tracking-[-0.01em]">{section.title}</h3>
                  <ul className="space-y-2.5">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-foreground/40 flex-shrink-0 mt-2" />
                        <span className="text-[13.5px] text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Billing ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border bg-muted/10">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-10">
            <div className="w-8 h-[1px] bg-muted-foreground" />
            <span>Facturación y Pagos</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
            {pricingTerms.map((term, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-9 border border-border -m-[1px] bg-card hover:bg-muted/20 transition-colors">
                <div className="font-mono text-[11px] text-muted-foreground mb-2">0{index + 1}</div>
                <h4 className="text-[18px] font-bold text-foreground mb-5">{term.title}</h4>
                <ul className="space-y-3">
                  {term.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-foreground/40 flex-shrink-0 mt-2" />
                      <span className="text-[13px] text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Additional sections ── */}
      <section className="py-[80px] border-b border-border relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10 space-y-0 border border-border divide-y divide-border">
          {[
            { icon: AlertTriangle, title: "Limitación de Responsabilidad", items: [
              { label: "Servicios «Como Están»", text: "Nuestros servicios se proporcionan «como están» sin garantías de ningún tipo, expresas o implícitas." },
              { label: "Limitación de Daños", text: "En ningún caso seremos responsables por daños indirectos, incidentales, especiales o consecuentes." },
              { label: "Límite Máximo", text: "Nuestra responsabilidad total no excederá el monto pagado por los servicios en los 12 meses anteriores al evento." },
              { label: "Backup y Datos", text: "Aunque realizamos backups regulares, eres responsable de mantener copias de seguridad de tus datos." },
            ]},
            { icon: Scale, title: "Ley Aplicable y Jurisdicción", items: [
              { label: "Ley Aplicable", text: "Estos términos se rigen por las leyes del país donde ROKE Industries tiene su sede principal." },
              { label: "Disputas", text: "Cualquier disputa será resuelta mediante arbitraje vinculante o en los tribunales competentes de nuestra jurisdicción." },
            ]},
          ].map((block, bi) => {
            const Icon = block.icon;
            return (
              <motion.div key={bi}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-10">
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 border border-border flex items-center justify-center text-foreground">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[22px] font-bold text-foreground tracking-[-0.01em]">{block.title}</h3>
                </div>
                <div className="space-y-4">
                  {block.items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1.5 h-1.5 bg-foreground/40 flex-shrink-0 mt-2.5" />
                      <p className="text-[14px] text-muted-foreground leading-relaxed">
                        <strong className="text-foreground font-semibold">{item.label}:</strong> {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border bg-foreground text-background">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-background/50 mb-5">
                <div className="w-8 h-[1px] bg-background/40" />
                <span>Consultas</span>
              </div>
              <h3 className="text-[36px] md:text-[44px] font-bold text-background tracking-[-0.03em] leading-tight mb-4">
                ¿Preguntas sobre <span className="text-background/50 font-medium">estos términos?</span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 text-[14px] text-background/60">
                <span><strong className="text-background/80">Email legal:</strong> legal@rokeindustries.com</span>
                <span><strong className="text-background/80">Teléfono:</strong> +52 (55) 2717-5816</span>
              </div>
            </div>
            <a href="mailto:legal@rokeindustries.com"
              className="inline-flex items-center px-8 py-4 bg-background text-foreground font-semibold text-[14px] hover:-translate-y-px hover:shadow-lg transition-all whitespace-nowrap">
              Contactar área legal
            </a>
          </div>
        </div>
      </section>

      {/* ── Notice ── */}
      <section className="py-8 border-b border-border">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <p className="text-[13px] text-muted-foreground text-center font-mono">
            Estos Términos y Condiciones pueden ser actualizados periódicamente con al menos 30 días de anticipación para cambios significativos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
