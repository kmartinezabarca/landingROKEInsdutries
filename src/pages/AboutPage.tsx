import React from "react";
import { motion } from "framer-motion";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import {
  Users, Target, Eye, Heart, Award, Shield, Zap,
  MapPin, Mail, Phone, HardHat, Server, Wrench, Rocket,
} from "lucide-react";
import { CONFIG } from "../utils/constants/config";

interface Stat { number: string; label: string; icon: React.ElementType }
interface TimelineItem { year: string; title: string; description: string; icon: React.ElementType }
interface Value { icon: React.ElementType; title: string; description: string }
interface TeamMember { name: string; position: string; image: string; description: string; linkedin: string; twitter: string }

const AboutPage: React.FC = () => {
  const stats: Stat[] = [
    { number: "500+", label: "Clientes Satisfechos", icon: Users },
    { number: "99.9%", label: "Uptime Garantizado",  icon: Shield },
    { number: "24/7",  label: "Soporte Técnico",     icon: Zap },
    { number: "6+",    label: "Años de Experiencia", icon: Award },
  ];

  const timeline: TimelineItem[] = [
    { year: "2018–2021", title: "La Forja del Ingeniero",           icon: HardHat, description: "Inmersión autodidacta en ingeniería de ciclo completo: reparación de electrónica de potencia, ensamblaje de drones y sistemas de control con Arduino y Raspberry Pi." },
    { year: "2022–2023", title: "Construcción del Laboratorio",     icon: Wrench,  description: "Inversión y ensamblaje del núcleo del laboratorio de I+D: estaciones de alto rendimiento, infraestructura de red gestionada y herramientas de fabricación digital." },
    { year: "2024",      title: "Nace la Infraestructura",          icon: Server,  description: "Diseño y construcción del centro de datos privado, ensamblando un servidor de grado empresarial basado en Xeon para potenciar operaciones de hosting y servicios en la nube." },
    { year: "2025",      title: "Fundación de ROKE Industries",     icon: Rocket,  description: "Lanzamiento oficial de ROKE Industries, la culminación de años de experiencia práctica y un laboratorio de tecnología de vanguardia para servir con soluciones reales y probadas." },
  ];

  const values: Value[] = [
    { icon: Target, title: "Excelencia",    description: "Comprometidos con la más alta calidad, superando las expectativas de nuestros clientes en cada proyecto." },
    { icon: Heart,  title: "Compromiso",    description: "Establecemos relaciones duraderas siendo tu socio tecnológico de confianza a largo plazo." },
    { icon: Shield, title: "Confiabilidad", description: "Garantizamos la seguridad y disponibilidad con los más altos estándares de la industria." },
    { icon: Zap,    title: "Innovación",    description: "Adoptamos las últimas tecnologías para mantenerte a la vanguardia del mundo digital." },
  ];

  const team: TeamMember[] = [
    { name: "Kevin Martinez", position: "CEO & Fundador", image: "/assets/team-ceo.png", description: "Arquitecto de soluciones tecnológicas con experiencia que abarca desde ingeniería de hardware y robótica hasta desarrollo de software e infraestructura DevOps. Lidero ROKE Industries con una obsesión por la excelencia técnica y la misión de hacer que la tecnología de vanguardia sea confiable y accesible.", linkedin: "https://www.linkedin.com/in/kevmartinezabarca", twitter: "#" },
    { name: "Rocio Salazar",  position: "CTO & Co-Fundadora", image: "/assets/team-cto.png", description: "Directora de Tecnología e Ingeniera de Datos experta que traduce la visión de negocio en arquitectura robusta y segura. Lidera nuestras iniciativas de Business Intelligence y la excelencia operativa, asegurando que cada producto de ROKE esté construido sobre una base inteligente y segura.", linkedin: "https://www.linkedin.com/in/roc%C3%ADo-salazar-parra-92984720a", twitter: "#" },
  ];

  return (
    <div className="min-h-screen bg-[var(--roke-bg)]">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden border-b border-[var(--roke-border-strong)]"
        style={{ background: "var(--roke-bg)", paddingTop: 72, paddingBottom: 72 }}
      >
        <div className="roke-grid-bg opacity-40" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[820px]"
          >
            <div className="roke-eyebrow">
              <span className="roke-eyebrow-line" />
              <span>SOBRE NOSOTROS</span>
            </div>
            <h1
              className="font-sans font-bold leading-[0.95] tracking-[-0.04em] m-0 mb-5"
              style={{ fontSize: "clamp(48px, 6.5vw, 76px)", color: "var(--roke-text)" }}
            >
              Construimos la infraestructura<br />
              <span style={{ color: "var(--roke-text-dim)", fontWeight: 500 }}>que no puede fallar.</span>
            </h1>
            <p className="text-[17px] leading-[1.5] m-0 max-w-[520px]" style={{ color: "var(--roke-text-dim)" }}>
              Un equipo de ingenieros apasionados comprometidos con impulsar el crecimiento digital de nuestros clientes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats grid ── */}
      <section>
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--roke-border-strong)]">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="py-12 px-8 border-r border-[var(--roke-border-strong)] last:border-r-0 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-[var(--roke-text-dimmer)]">0{index + 1}</span>
                    <div className="roke-icon-box w-10 h-10 border border-[var(--roke-border-strong)] rounded-[4px] flex items-center justify-center text-[var(--roke-text)] bg-[var(--roke-surface)]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-[48px] md:text-[56px] font-bold leading-none tracking-[-0.04em] text-[var(--roke-text)]">{stat.number}</div>
                  <div className="text-[13px] text-[var(--roke-text-dimmer)]">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Misión / Visión / Valores ── */}
      <section className="py-[120px] border-t border-[var(--roke-border-strong)] relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end mb-16"
          >
            <div>
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-[var(--roke-text-dimmer)] mb-6">
                <div className="w-8 h-[1px] bg-[var(--roke-text-dimmer)]" />
                <span>Principios</span>
              </div>
              <h2 className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-[var(--roke-text)] m-0">
                Nuestros <span className="text-[var(--roke-text-dim)] font-medium">principios.</span>
              </h2>
            </div>
            <p className="text-[17px] leading-[1.55] text-[var(--roke-text-dim)] max-w-[520px] pb-1.5">
              Los valores que guían cada decisión y acción en ROKE Industries, desde el primer circuito hasta la nube más grande.
            </p>
          </motion.div>

          {/* MVV grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--roke-border-strong)] mb-16">
            {[
              { icon: Target, label: "Misión",  num: "01", text: "Proporcionar soluciones tecnológicas confiables y accesibles que impulsen el crecimiento digital de nuestros clientes, democratizando el acceso a tecnologías avanzadas." },
              { icon: Eye,    label: "Visión",  num: "02", text: "Ser la empresa líder en servicios de hosting y tecnología en América Latina, reconocida por nuestra excelencia, innovación constante y compromiso con el éxito." },
              { icon: Heart,  label: "Valores", num: "03", text: "Compromiso, transparencia, innovación y excelencia en el servicio al cliente son los pilares fundamentales que definen nuestra cultura organizacional." },
            ].map(({ icon: Icon, label, num, text }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-9 border border-[var(--roke-border-strong)] -m-[1px] bg-[var(--roke-surface)] hover:bg-[var(--roke-surface-2)] transition-colors duration-200 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-[11px] text-[var(--roke-text-dimmer)]">{num}</span>
                  <div className="roke-icon-box w-14 h-14 border border-[var(--roke-border-strong)] rounded-[6px] flex items-center justify-center text-[var(--roke-text)] bg-[var(--roke-surface)]">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-[22px] font-bold text-[var(--roke-text)] tracking-[-0.01em] leading-tight m-0">{label}</h3>
                <p className="text-[14.5px] leading-[1.5] text-[var(--roke-text-dim)] m-0">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Values sub-grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[var(--roke-border-strong)]">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="p-8 border border-[var(--roke-border-strong)] -m-[1px] bg-[var(--roke-surface)] hover:bg-[var(--roke-surface-2)] transition-colors duration-200 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-mono text-[11px] text-[var(--roke-text-dimmer)]">0{index + 1}</span>
                    <div className="roke-icon-box w-10 h-10 border border-[var(--roke-border-strong)] rounded-[4px] flex items-center justify-center text-[var(--roke-text)] bg-[var(--roke-surface)]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-[18px] font-bold text-[var(--roke-text)] tracking-[-0.01em] m-0">{value.title}</h4>
                  <p className="text-[13.5px] leading-[1.5] text-[var(--roke-text-dim)] m-0">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-[120px] border-t border-[var(--roke-border-strong)] bg-[var(--roke-surface)] relative">
        <div className="roke-grid-bg opacity-30" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end mb-16"
          >
            <div>
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-[var(--roke-text-dimmer)] mb-6">
                <div className="w-8 h-[1px] bg-[var(--roke-text-dimmer)]" />
                <span>Historia</span>
              </div>
              <h2 className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-[var(--roke-text)] m-0">
                Cómo llegamos <span className="text-[var(--roke-text-dim)] font-medium">aquí.</span>
              </h2>
            </div>
            <p className="text-[17px] leading-[1.55] text-[var(--roke-text-dim)] max-w-[520px] pb-1.5">
              Un recorrido por los hitos más importantes que consolidaron nuestra experiencia técnica y dieron vida a ROKE Industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--roke-border-strong)]">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-9 border border-[var(--roke-border-strong)] -m-[1px] bg-[var(--roke-surface)] hover:bg-[var(--roke-surface-2)] transition-colors duration-200 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-[var(--roke-text-dimmer)] uppercase tracking-widest">{item.year}</span>
                    <div className="roke-icon-box w-12 h-12 border border-[var(--roke-border-strong)] rounded-[6px] flex items-center justify-center text-[var(--roke-text)] bg-[var(--roke-surface)]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-[22px] font-bold text-[var(--roke-text)] tracking-[-0.01em] leading-tight m-0">{item.title}</h3>
                  <p className="text-[14.5px] leading-[1.5] text-[var(--roke-text-dim)] m-0">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Equipo ── */}
      <section className="py-[120px] border-t border-[var(--roke-border-strong)] relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end mb-16"
          >
            <div>
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-[var(--roke-text-dimmer)] mb-6">
                <div className="w-8 h-[1px] bg-[var(--roke-text-dimmer)]" />
                <span>Equipo Directivo</span>
              </div>
              <h2 className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-[var(--roke-text)] m-0">
                Las personas <span className="text-[var(--roke-text-dim)] font-medium">detrás.</span>
              </h2>
            </div>
            <p className="text-[17px] leading-[1.55] text-[var(--roke-text-dim)] max-w-[520px] pb-1.5">
              Conoce a los líderes visionarios que impulsan la innovación y excelencia en ROKE Industries día a día.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--roke-border-strong)]">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-10 border border-[var(--roke-border-strong)] -m-[1px] bg-[var(--roke-surface)] hover:bg-[var(--roke-surface-2)] transition-colors duration-200 flex flex-col gap-6"
              >
                {/* Photo + name */}
                <div className="flex items-center gap-5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border border-[var(--roke-border-strong)]"
                  />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--roke-text-dimmer)] mb-1">{member.position}</div>
                    <h3 className="text-[24px] font-bold text-[var(--roke-text)] tracking-[-0.02em] leading-tight">{member.name}</h3>
                  </div>
                </div>

                <p className="text-[14.5px] leading-[1.6] text-[var(--roke-text-dim)]">{member.description}</p>

                <div className="flex gap-2.5 mt-auto pt-2 border-t border-[var(--roke-border-strong)]">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 border border-[var(--roke-border-strong)] flex items-center justify-center text-[var(--roke-text-dimmer)] hover:text-[var(--roke-text)] hover:border-[var(--roke-text)] transition-colors"
                    aria-label={`LinkedIn de ${member.name}`}>
                    <FaLinkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href={member.twitter}
                    className="w-9 h-9 border border-[var(--roke-border-strong)] flex items-center justify-center text-[var(--roke-text-dimmer)] hover:text-[var(--roke-text)] hover:border-[var(--roke-text)] transition-colors"
                    aria-label={`Twitter de ${member.name}`}>
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Careers CTA (sección invertida) ── */}
      <section className="py-[120px] border-t border-[var(--roke-border-strong)] bg-foreground text-background relative overflow-hidden">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-background/50 mb-6">
                <div className="w-8 h-[1px] bg-background/40" />
                <span>Únete al equipo</span>
              </div>
              <h2 className="font-sans text-[48px] md:text-[60px] font-bold leading-[0.98] tracking-[-0.035em] text-background mb-6">
                ¿Quieres construir<br />
                <span className="text-background/50 font-medium">con nosotros?</span>
              </h2>
              <p className="text-[17px] text-background/70 max-w-xl leading-relaxed mb-8">
                Siempre buscamos talento excepcional. Si compartes nuestra pasión por la tecnología y la excelencia, nos encantaría conocerte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-background/60 text-[14px]">
                <div className="flex items-center gap-2.5"><Mail className="w-4 h-4" /><span>careers@rokeindustries.com</span></div>
                <div className="flex items-center gap-2.5"><Phone className="w-4 h-4" /><span>{CONFIG.CONTACT?.PHONE}</span></div>
                <div className="flex items-center gap-2.5"><MapPin className="w-4 h-4" /><span>{CONFIG.CONTACT?.ADDRESS}</span></div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:careers@rokeindustries.com`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background text-foreground font-semibold text-[15px] hover:-translate-y-px hover:shadow-lg transition-all"
              >
                Enviar CV
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
