import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, AlertTriangle, XCircle, Clock, Server, Globe, Database, Shield, Zap } from 'lucide-react';

type ServiceStatus   = 'operational' | 'maintenance' | 'degraded' | 'outage';
type IncidentStatus  = 'resolved' | 'in-progress' | 'investigating';
type IncidentSeverity = 'low' | 'medium' | 'high';

interface ServiceItem { name: string; status: ServiceStatus; uptime: string; responseTime: string; icon: React.ReactNode }
interface IncidentUpdate { time: string; message: string }
interface Incident { id: number; title: string; status: IncidentStatus; severity: IncidentSeverity; startTime: string; endTime?: string; description: string; updates: IncidentUpdate[] }

const SystemStatusPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const services: ServiceItem[] = [
    { name: "Hosting Web",        status: "operational", uptime: "99.98%", responseTime: "145ms", icon: <Globe    className="w-5 h-5" /> },
    { name: "Servidores Gaming",  status: "operational", uptime: "99.95%", responseTime: "89ms",  icon: <Server   className="w-5 h-5" /> },
    { name: "Base de Datos",      status: "operational", uptime: "99.99%", responseTime: "12ms",  icon: <Database className="w-5 h-5" /> },
    { name: "CDN Global",         status: "operational", uptime: "99.97%", responseTime: "67ms",  icon: <Zap      className="w-5 h-5" /> },
    { name: "Sistema de Seguridad", status: "operational", uptime: "100%", responseTime: "23ms",  icon: <Shield   className="w-5 h-5" /> },
    { name: "Panel de Control",   status: "maintenance", uptime: "99.92%", responseTime: "234ms", icon: <Activity className="w-5 h-5" /> },
  ];

  const incidents: Incident[] = [
    { id: 1, title: "Mantenimiento Programado — Panel de Control", status: "in-progress", severity: "low",
      startTime: "2025-08-14 02:00 UTC", description: "Actualización de seguridad programada. Tiempo estimado: 2 horas.",
      updates: [
        { time: "2025-08-14 02:00 UTC", message: "Mantenimiento iniciado. El panel de control puede experimentar intermitencias." },
        { time: "2025-08-14 01:45 UTC", message: "Mantenimiento programado comenzará en 15 minutos." },
      ]
    },
    { id: 2, title: "Resolución de Latencia en Servidores EU", status: "resolved", severity: "medium",
      startTime: "2025-08-13 14:30 UTC", endTime: "2025-08-13 15:45 UTC",
      description: "Se detectó latencia elevada en algunos servidores de la región europea.",
      updates: [
        { time: "2025-08-13 15:45 UTC", message: "Problema resuelto. Todos los servicios funcionan normalmente." },
        { time: "2025-08-13 15:20 UTC", message: "Implementando solución. Latencia mejorando gradualmente." },
        { time: "2025-08-13 14:30 UTC", message: "Investigando reportes de latencia elevada en región EU." },
      ]
    },
  ];

  const statusIcon  = (s: ServiceStatus) => ({ operational: <CheckCircle className="w-4 h-4 text-green-500" />, maintenance: <AlertTriangle className="w-4 h-4 text-yellow-500" />, degraded: <AlertTriangle className="w-4 h-4 text-orange-500" />, outage: <XCircle className="w-4 h-4 text-red-500" /> }[s]);
  const statusText  = (s: ServiceStatus) => ({ operational: 'Operacional', maintenance: 'Mantenimiento', degraded: 'Degradado', outage: 'Fuera de Servicio' }[s]);
  const statusColor = (s: ServiceStatus) => ({ operational: 'text-green-500', maintenance: 'text-yellow-500', degraded: 'text-orange-500', outage: 'text-red-500' }[s]);

  const incidentStatusBadge = (s: IncidentStatus) => ({
    resolved: 'border-green-500/40 text-green-600 dark:text-green-400',
    'in-progress': 'border-yellow-500/40 text-yellow-600 dark:text-yellow-400',
    investigating: 'border-blue-500/40 text-blue-600 dark:text-blue-400',
  }[s]);
  const incidentStatusLabel = (s: IncidentStatus) => ({ resolved: 'Resuelto', 'in-progress': 'En Progreso', investigating: 'Investigando' }[s]);

  const severityBadge = (s: IncidentSeverity) => ({
    low: 'border-green-500/40 text-green-600 dark:text-green-400',
    medium: 'border-yellow-500/40 text-yellow-600 dark:text-yellow-400',
    high: 'border-red-500/40 text-red-600 dark:text-red-400',
  }[s]);
  const severityLabel = (s: IncidentSeverity) => ({ low: 'Baja', medium: 'Media', high: 'Alta' }[s]);

  const overallStatus: ServiceStatus = services.every(s => s.status === 'operational') ? 'operational'
    : services.some(s => s.status === 'outage') ? 'outage' : 'degraded';

  return (
    <div className="min-h-screen bg-background">

      {/* ── Page header ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border relative">
        <div className="roke-grid-bg opacity-40" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-6">
              <div className="w-8 h-[1px] bg-muted-foreground" />
              <span>Estado del Sistema</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end">
              <h1 className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-foreground m-0">
                Estado de <span className="text-muted-foreground font-medium">servicios.</span>
              </h1>
              <div className="flex flex-col gap-4 pb-1.5">
                <p className="text-[17px] leading-[1.55] text-muted-foreground">
                  Monitoreo en tiempo real de todos nuestros servicios e infraestructura.
                </p>
                <div className="flex items-center gap-3">
                  {statusIcon(overallStatus)}
                  <span className={`text-[15px] font-semibold ${statusColor(overallStatus)}`}>{statusText(overallStatus)}</span>
                  <span className="text-muted-foreground text-[13px] font-mono">— {currentTime.toLocaleString('es-ES', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Metrics strip ── */}
      <section className="border-b border-border">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-3 border-r border-border">
            {[
              { label: "Uptime General",       value: "99.97", unit: "%" },
              { label: "Tiempo de Respuesta",  value: "127",   unit: "ms" },
              { label: "Servicios Activos",    value: "6",     unit: "" },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="py-10 px-8 border-l border-border">
                <div className="font-mono text-[11px] text-muted-foreground mb-3">{m.label}</div>
                <div className="text-[48px] font-bold text-foreground leading-none tracking-[-0.04em]">
                  {m.value}<span className="text-[28px] text-muted-foreground">{m.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services + Incidents ── */}
      <section className="py-[80px] md:py-[120px] relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10 space-y-16">

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-8">
              <div className="w-8 h-[1px] bg-muted-foreground" />
              <span>Servicios</span>
            </div>
            <div className="border border-border divide-y divide-border">
              {services.map((service, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="flex items-center justify-between px-7 py-5 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground">
                      {service.icon}
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold text-foreground">{service.name}</div>
                      <div className="text-[12px] text-muted-foreground font-mono">
                        Uptime: {service.uptime} · Respuesta: {service.responseTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusIcon(service.status)}
                    <span className={`text-[13px] font-medium ${statusColor(service.status)}`}>{statusText(service.status)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Incidents */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-8">
              <div className="w-8 h-[1px] bg-muted-foreground" />
              <span>Incidentes Recientes</span>
            </div>
            <div className="border border-border divide-y divide-border">
              {incidents.map(incident => (
                <div key={incident.id} className="p-8">
                  <div className="flex items-start justify-between gap-6 mb-6">
                    <div>
                      <h4 className="text-[18px] font-bold text-foreground tracking-[-0.01em] mb-2">{incident.title}</h4>
                      <p className="text-[14px] text-muted-foreground mb-4 leading-relaxed">{incident.description}</p>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 border text-[11px] font-mono ${incidentStatusBadge(incident.status)}`}>
                          {incidentStatusLabel(incident.status)}
                        </span>
                        <span className={`px-3 py-1 border text-[11px] font-mono ${severityBadge(incident.severity)}`}>
                          Severidad: {severityLabel(incident.severity)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-[12px] text-muted-foreground font-mono flex-shrink-0">
                      <div className="flex items-center gap-1.5 justify-end mb-1">
                        <Clock className="w-3.5 h-3.5" />{incident.startTime}
                      </div>
                      {incident.endTime && <div>Resuelto: {incident.endTime}</div>}
                    </div>
                  </div>
                  <div className="border border-border divide-y divide-border">
                    {incident.updates.map((update, ui) => (
                      <div key={ui} className="flex gap-5 p-4">
                        <div className="w-1.5 h-1.5 bg-foreground/40 flex-shrink-0 mt-2" />
                        <div>
                          <div className="text-[12px] font-mono text-muted-foreground mb-1">{update.time}</div>
                          <div className="text-[13.5px] text-foreground/80">{update.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Subscribe CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="border border-border bg-foreground text-background p-10 md:p-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-background/50 mb-5">
                <div className="w-8 h-[1px] bg-background/40" />
                <span>Notificaciones</span>
              </div>
              <h3 className="text-[36px] font-bold text-background tracking-[-0.03em] leading-tight mb-3">
                Mantente <span className="text-background/50 font-medium">informado.</span>
              </h3>
              <p className="text-[15px] text-background/70 leading-relaxed">
                Suscríbete para recibir actualizaciones en tiempo real sobre el estado de nuestros servicios.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <button className="px-7 py-3.5 bg-background text-foreground font-semibold text-[14px] mi-cta">
                Suscribirse por Email
              </button>
              <button className="px-7 py-3.5 border border-background/30 text-background/80 hover:border-background hover:text-background font-semibold text-[14px] transition-colors">
                RSS Feed
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SystemStatusPage;
