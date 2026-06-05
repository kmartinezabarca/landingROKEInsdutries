/* eslint-disable react-refresh/only-export-components -- módulo de datos: los SVG locales no se exportan y Fast Refresh no aplica aquí */
import { ROUTES } from "@/utils/constants/config";

/* ── Inline SVG icons (presentational) ─────────────── */
const SvgServer = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);
const SvgGamepad = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" />
    <circle cx="15" cy="12" r="1" /><circle cx="17" cy="10" r="1" />
    <path d="M6 3h12a2 2 0 0 1 2 2v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2z" />
  </svg>
);
const SvgCode = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const SvgCpu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);
const SvgShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const SvgDatabase = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const SvgRoute = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3" /><circle cx="18" cy="5" r="3" />
    <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H12" />
  </svg>
);
const SvgHeadset = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);
const SvgPrinter = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);
const SvgBot = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" /><line x1="12" y1="7" x2="12" y2="11" />
    <line x1="8" y1="15" x2="8" y2="15" /><line x1="16" y1="15" x2="16" y2="15" />
  </svg>
);

/* ── Service lines data ────────────────────────────── */
// categoryKeyword: used to find the matching API category and scroll+select it
export const serviceLines = [
  {
    num: "01", Icon: SvgServer,
    title: "Infraestructura & Hosting", subtitle: "Servidores que no te fallan.",
    desc: "Hosting web, VPS administrados y soluciones cloud para equipos que no pueden permitirse downtime. Desplegamos en menos de 24 horas con soporte humano en español.",
    tags: ["Web Hosting", "VPS Administrado", "Cloud / DevOps", "SSL Gratuito", "Backups Diarios"],
    cta: "Ver planes de hosting",
    categoryKeyword: "hosting",
    scrollToPlans: true,
    href: null,
  },
  {
    num: "02", Icon: SvgGamepad,
    title: "Game Servers", subtitle: "Latencia baja. Uptime real.",
    desc: "Servidores optimizados para juegos multijugador: Minecraft, Rust, ARK, CS2 y más. Hardware dedicado, panel Pterodactyl y escalado de slots sin reiniciar el servidor.",
    tags: ["Minecraft", "Rust / ARK", "CS2 / Valheim", "Panel Pterodactyl", "DDoS Mitigation"],
    cta: "Ver planes gaming",
    categoryKeyword: "game",
    scrollToPlans: true,
    href: null,
  },
  {
    num: "03", Icon: SvgCode,
    title: "Desarrollo & Consultoría", subtitle: "Desde el código hasta producción.",
    desc: "Desarrollo full-stack, arquitectura de bases de datos, DevOps y migración de sistemas legados. Nos integramos con tu equipo o lo hacemos de inicio a fin.",
    tags: ["Full-Stack Web", "Bases de Datos", "CI/CD & DevOps", "Migración Cloud", "Seguridad"],
    cta: "Solicitar propuesta",
    categoryKeyword: null,
    scrollToPlans: false,
    href: ROUTES.CONTACT,
  },
  {
    num: "04", Icon: SvgCpu,
    title: "ROKE Labs — Hardware", subtitle: "Del diseño al prototipo.",
    desc: "Fabricación de PCBs a medida, impresión 3D de alta resolución y consultoría en mecatrónica e IoT para equipos que construyen productos físicos.",
    tags: ["PCBs a medida", "Impresión 3D", "IoT / ESP32", "Prototipado CNC", "Firmware"],
    cta: "Hablar con el equipo",
    categoryKeyword: null,
    scrollToPlans: false,
    href: ROUTES.CONTACT,
  },
] as const;

/* ── Consulting services (list layout) ─────────────── */
export const consultingServices = [
  { Icon: SvgDatabase, num: "/ 01", title: "Arquitectura de Bases de Datos",    desc: "MySQL, PostgreSQL, MongoDB. Replicación, alta disponibilidad, query tuning y estrategias de backup y recuperación ante desastres." },
  { Icon: SvgCode,     num: "/ 02", title: "Desarrollo de Software a Medida",   desc: "Full-stack con Laravel, React, Vue.js y Flutter. Desde arquitectura hasta integración de APIs y servicios de terceros." },
  { Icon: SvgShield,   num: "/ 03", title: "Seguridad & DevOps",                desc: "Auditorías de seguridad, hardening de servidores, pipelines CI/CD con Jenkins y diseño de red segura con VLANs y firewalls." },
  { Icon: SvgRoute,    num: "/ 04", title: "Migración y Modernización",          desc: "Migración white-glove, refactorización de código heredado, contenerización con Docker y optimización de costos (FinOps)." },
  { Icon: SvgHeadset,  num: "/ 05", title: "Soporte de Misión Crítica 24/7",    desc: "Ingenieros expertos disponibles 24/7, SLA garantizado, monitoreo proactivo y canales de comunicación dedicados." },
];

/* ── ROKE Labs ─────────────────────────────────────── */
export const labsServices = [
  { Icon: SvgCpu,     num: "/ 01", title: "Fabricación de PCBs a Medida",     desc: "Fresado CNC de alta precisión, una o dos capas. Ideal para prototipos y lotes pequeños en 24-48h." },
  { Icon: SvgPrinter, num: "/ 02", title: "Impresión 3D y Prototipado",        desc: "FDM de alta calidad con PLA, PETG y ABS. Optimización para fabricación y post-procesado incluido." },
  { Icon: SvgBot,     num: "/ 03", title: "Consultoría Mecatrónica & IoT",     desc: "Sistemas embebidos con Arduino/ESP32, integración de sensores, diseño mecánico y firmware a medida." },
];
