import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, FileText, Cookie } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    { icon: Eye, title: "Información que Recopilamos", num: "01", content: [
      "Información personal que nos proporcionas voluntariamente (nombre, email, teléfono)",
      "Información técnica sobre tu dispositivo y navegación",
      "Cookies y tecnologías similares para mejorar tu experiencia",
      "Registros de comunicaciones y soporte técnico",
    ]},
    { icon: Database, title: "Cómo Utilizamos tu Información", num: "02", content: [
      "Proporcionar y mantener nuestros servicios de hosting y tecnología",
      "Comunicarnos contigo sobre tu cuenta y servicios",
      "Mejorar nuestros servicios y desarrollar nuevas funcionalidades",
      "Cumplir con obligaciones legales y regulatorias",
    ]},
    { icon: Lock, title: "Protección de Datos", num: "03", content: [
      "Implementamos medidas de seguridad técnicas y organizativas",
      "Cifrado de datos en tránsito y en reposo",
      "Acceso restringido solo a personal autorizado",
      "Auditorías regulares de seguridad y cumplimiento",
    ]},
    { icon: UserCheck, title: "Tus Derechos", num: "04", content: [
      "Derecho de acceso a tus datos personales",
      "Derecho de rectificación y actualización",
      "Derecho de supresión ('derecho al olvido')",
      "Derecho de portabilidad de datos",
    ]},
  ];

  const cookieTypes = [
    { title: "Cookies Esenciales",     text: "Necesarias para el funcionamiento básico del sitio web y no pueden desactivarse." },
    { title: "Cookies de Rendimiento", text: "Nos ayudan a entender cómo interactúas con nuestro sitio para mejorarlo." },
    { title: "Cookies Funcionales",    text: "Permiten funcionalidades mejoradas y personalización de la experiencia." },
    { title: "Cookies de Marketing",   text: "Utilizadas para mostrar contenido relevante y personalizado al usuario." },
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
                Política de <span className="text-muted-foreground font-medium">Privacidad.</span>
              </h1>
              <p className="text-[17px] leading-[1.55] text-muted-foreground max-w-[520px] pb-1.5">
                En ROKE Industries, protegemos tu privacidad y datos personales con los más altos estándares de seguridad y transparencia.
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
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-[22px] font-bold text-foreground tracking-[-0.01em]">Introducción</h2>
            </div>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-3xl">
              Esta Política de Privacidad describe cómo ROKE Industries recopila, utiliza y protege tu información personal cuando utilizas nuestros servicios de hosting, servidores gaming y soluciones tecnológicas. Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política.
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
            <span>Datos Personales</span>
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

      {/* ── Cookies ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border bg-muted/10">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-4">
            <div className="w-8 h-[1px] bg-muted-foreground" />
            <span>Cookies</span>
          </div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 border border-border flex items-center justify-center text-foreground">
              <Cookie className="w-5 h-5" />
            </div>
            <h2 className="text-[28px] font-bold text-foreground tracking-[-0.02em]">Política de Cookies</h2>
          </div>
          <p className="text-[15px] text-muted-foreground mb-10 max-w-2xl">
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web y ofrecerte contenido relevante.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            {cookieTypes.map((cookie, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-8 border border-border -m-[1px] bg-card hover:bg-muted/20 transition-colors">
                <div className="font-mono text-[11px] text-muted-foreground mb-3">0{index + 1}</div>
                <h4 className="text-[17px] font-bold text-foreground mb-3 tracking-[-0.01em]">{cookie.title}</h4>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">{cookie.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Additional ── */}
      <section className="py-[80px] border-b border-border relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10 space-y-0 border border-border divide-y divide-border">
          {[
            { icon: Database, title: "Retención y Eliminación de Datos", items: [
              { label: "Período de retención", text: "Conservamos tus datos personales durante el tiempo necesario para los fines descritos en esta política o según lo requieran las leyes aplicables." },
              { label: "Solicitud de eliminación", text: "Puedes solicitar la eliminación de tus datos en cualquier momento contactando a nuestro equipo de privacidad." },
              { label: "Datos de facturación", text: "Los registros financieros se mantienen por el período exigido por la legislación fiscal aplicable." },
            ]},
            { icon: Shield, title: "Transferencias Internacionales", items: [
              { label: "Alcance global", text: "ROKE Industries puede transferir datos a países que ofrezcan niveles adecuados de protección según las regulaciones vigentes." },
              { label: "Salvaguardas", text: "Implementamos salvaguardas contractuales y técnicas adecuadas para proteger tus datos en transferencias internacionales." },
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
                <span>Privacidad</span>
              </div>
              <h3 className="text-[36px] md:text-[44px] font-bold text-background tracking-[-0.03em] leading-tight mb-4">
                ¿Preguntas sobre <span className="text-background/50 font-medium">tu privacidad?</span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 text-[14px] text-background/60">
                <span><strong className="text-background/80">Email:</strong> privacy@rokeindustries.com</span>
                <span><strong className="text-background/80">Teléfono:</strong> +52 (55) 2717-5816</span>
              </div>
            </div>
            <a href="mailto:privacy@rokeindustries.com"
              className="inline-flex items-center px-8 py-4 bg-background text-foreground font-semibold text-[14px] mi-cta whitespace-nowrap">
              Contactar área de privacidad
            </a>
          </div>
        </div>
      </section>

      {/* ── Notice ── */}
      <section className="py-8 border-b border-border">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <p className="text-[13px] text-muted-foreground text-center font-mono">
            Esta Política de Privacidad puede ser actualizada periódicamente. Te notificaremos sobre cambios significativos con al menos 30 días de anticipación.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
