import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import WhatsAppService from '@/services/whatsapp/whatsappService';
import { submitContactRequest } from '@/services/contactService';
import Turnstile, { type TurnstileHandle } from '@/components/common/Turnstile';
import { useTheme } from '@/contexts/ThemeContext';
import { useSeo } from '@/components/common/Seo';
import { CONFIG } from '@/utils/constants/config';

interface FormData { name: string; email: string; phone: string; company: string; service: string; message: string }
interface FormErrors { name?: string; email?: string; phone?: string; service?: string; message?: string }
interface ContactInfo { icon: React.ElementType; title: string; value: string; description: string }
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const { isDark } = useTheme();
  useSeo({
    title: 'Contacto',
    description: 'Hablemos de tu proyecto. Contacta a ROKE Industries por formulario o WhatsApp — respuesta en menos de 24 horas.',
    path: '/contact',
  });

  const services: string[] = ['Hosting Web', 'Servidores Gaming', 'Cloud Hosting', 'Desarrollo Web', 'Seguridad Web', 'Consultoría Técnica', 'Migración de Sitios', 'Otro'];

  const contactInfo: ContactInfo[] = [
    { icon: Mail,    title: 'Email',    value: CONFIG.CONTACT.EMAIL,              description: 'Respuesta en menos de 24 horas' },
    { icon: Phone,   title: 'Teléfono', value: CONFIG.CONTACT.PHONE,              description: 'Lunes a Viernes 9:00 – 18:00' },
    { icon: MapPin,  title: 'Oficina',  value: CONFIG.CONTACT.ADDRESS,            description: 'Visitas con cita previa' },
    { icon: Clock,   title: 'Horario',  value: 'Lun – Vie: 9:00 – 18:00',        description: 'Soporte técnico 24/7 disponible' },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim())    newErrors.name    = 'El nombre es requerido';
    if (!formData.email.trim())   newErrors.email   = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'El email no es válido';
    if (!formData.phone.trim())   newErrors.phone   = 'El teléfono es requerido';
    if (!formData.service)        newErrors.service = 'Selecciona un servicio';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';
    else if (formData.message.trim().length < 10) newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!turnstileToken) {
      setErrors(prev => ({ ...prev, message: prev.message }));
      setFormStatus('error');
      return;
    }
    setFormStatus('loading');
    try {
      await submitContactRequest(
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          message: formData.message,
        },
        turnstileToken,
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch {
      setFormStatus('error');
    } finally {
      // El token de Turnstile es de un solo uso: resetear para el próximo envío.
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    }
  };

  const handleWhatsAppContact = (): void => {
    const message = WhatsAppService.generateContactMessage(formData.name || 'Cliente', formData.service || 'Consulta general');
    WhatsAppService.openWhatsApp(message);
  };

  const inputBase = "w-full px-4 py-3 border bg-[var(--roke-surface)] text-[var(--roke-text)] text-[14px] focus:outline-none focus:border-[var(--roke-text)] transition-colors placeholder:text-[var(--roke-text-dimmer)]";

  return (
    <div className="min-h-screen bg-[var(--roke-bg)]">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden border-b border-[var(--roke-border-strong)]"
        style={{ background: "var(--roke-bg)", paddingTop: 72, paddingBottom: 72 }}
      >
        <div className="roke-grid-bg" />
        {/* Figura diagonal (igual que el hero del Blog) */}
        <div
          className="roke-slash-band"
          style={{
            position: "absolute",
            top: "110px",
            right: "-200px",
            width: "1800px",
            height: "160px",
            transform: "rotate(-30deg)",
            transformOrigin: "50% 50%",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[760px]"
          >
            <div className="roke-eyebrow">
              <span className="roke-eyebrow-line" />
              <span>CONTACTO</span>
            </div>
            <h1
              className="font-sans font-bold leading-[0.95] tracking-[-0.04em] m-0 mb-5"
              style={{ fontSize: "clamp(48px, 6.5vw, 76px)", color: "var(--roke-text)" }}
            >
              Hablemos de<br />
              <span style={{ color: "var(--roke-text-dim)", fontWeight: 500 }}>tu proyecto.</span>
            </h1>
            <p className="text-[17px] leading-[1.5] m-0 max-w-[460px]" style={{ color: "var(--roke-text-dim)" }}>
              Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo de expertos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact info strip ── */}
      <section>
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--roke-border-strong)]">
            {contactInfo.map((info, index) => {
              const Icon = info.icon as React.FC<{ className?: string }>;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="py-10 px-8 border-r border-[var(--roke-border-strong)] last:border-r-0 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-[var(--roke-text-dimmer)]">0{index + 1}</span>
                    <div className="roke-icon-box w-10 h-10 border border-[var(--roke-border-strong)] rounded-[4px] flex items-center justify-center text-[var(--roke-text)] bg-[var(--roke-surface)]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-[13px] font-semibold text-[var(--roke-text)]">{info.title}</div>
                  <div className="text-[13px] text-[var(--roke-text-dim)] font-medium leading-snug">{info.value}</div>
                  <div className="text-[12px] text-[var(--roke-text-dimmer)]">{info.description}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + FAQ ── */}
      <section className="py-[120px] border-t border-[var(--roke-border-strong)] relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">

          {/* Section header */}
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
                <span>Formulario</span>
              </div>
              <h2 className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-[var(--roke-text)] m-0">
                Envíanos un <span className="text-[var(--roke-text-dim)] font-medium">mensaje.</span>
              </h2>
            </div>
            <p className="text-[17px] leading-[1.55] text-[var(--roke-text-dim)] max-w-[520px] pb-1.5">
              Completa el formulario y te responderemos en menos de 24 horas. También puedes contactarnos directamente por WhatsApp.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 border border-[var(--roke-border-strong)]">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-10 border-r border-[var(--roke-border-strong)]"
            >
              {formStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 dark:text-green-200 font-semibold text-[14px]">¡Mensaje enviado con éxito!</p>
                    <p className="text-green-700 dark:text-green-300 text-[13px]">Te responderemos pronto.</p>
                  </div>
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 dark:text-red-200 font-semibold text-[14px]">Error al enviar</p>
                    <p className="text-red-700 dark:text-red-300 text-[13px]">Intenta nuevamente o contáctanos por WhatsApp.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-0">
                <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--roke-border-strong)]">
                  <div className="border-r border-[var(--roke-border-strong)] border-b md:border-b-0 p-0">
                    <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-[var(--roke-text-dimmer)]">Nombre *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                      className={`${inputBase} px-4 pb-4 pt-2 border-0 ${errors.name ? 'text-red-500' : ''}`}
                      placeholder="Tu nombre completo" />
                    {errors.name && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.name}</p>}
                  </div>
                  <div className="border-b p-0">
                    <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-[var(--roke-text-dimmer)]">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className={`${inputBase} px-4 pb-4 pt-2 border-0 ${errors.email ? 'text-red-500' : ''}`}
                      placeholder="tu@email.com" />
                    {errors.email && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--roke-border-strong)] -mt-[1px]">
                  <div className="border-r border-[var(--roke-border-strong)] border-b md:border-b-0 p-0">
                    <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-[var(--roke-text-dimmer)]">Teléfono *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className={`${inputBase} px-4 pb-4 pt-2 border-0 ${errors.phone ? 'text-red-500' : ''}`}
                      placeholder="+52 (234) 567-8900" />
                    {errors.phone && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.phone}</p>}
                  </div>
                  <div className="p-0">
                    <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-[var(--roke-text-dimmer)]">Empresa</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange}
                      className={`${inputBase} px-4 pb-4 pt-2 border-0`}
                      placeholder="Nombre de tu empresa" />
                  </div>
                </div>

                <div className="border border-[var(--roke-border-strong)] -mt-[1px]">
                  <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-[var(--roke-text-dimmer)]">Servicio de interés *</label>
                  <select name="service" value={formData.service} onChange={handleInputChange}
                    className={`${inputBase} px-4 pb-4 pt-2 border-0 ${errors.service ? 'text-red-500' : ''}`}>
                    <option value="">Selecciona un servicio</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.service}</p>}
                </div>

                <div className="border border-[var(--roke-border-strong)] -mt-[1px]">
                  <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-[var(--roke-text-dimmer)]">Mensaje *</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5}
                    className={`${inputBase} px-4 pb-4 pt-2 border-0 resize-none ${errors.message ? 'text-red-500' : ''}`}
                    placeholder="Cuéntanos sobre tu proyecto o consulta..." />
                  {errors.message && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.message}</p>}
                </div>

                <div className="pt-6">
                  <Turnstile
                    ref={turnstileRef}
                    theme={isDark ? 'dark' : 'light'}
                    onVerify={setTurnstileToken}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-0 pt-4">
                  <button type="submit" disabled={formStatus === 'loading' || !turnstileToken}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-[var(--roke-text)] text-[var(--roke-bg)] font-semibold text-[14px] mi-cta disabled:opacity-60">
                    {formStatus === 'loading' ? (
                      <><div className="w-4 h-4 border-2 border-[var(--roke-bg)]/30 border-t-[var(--roke-bg)] rounded-full animate-spin" />Enviando...</>
                    ) : (
                      <><Send className="w-4 h-4" />Enviar Mensaje</>
                    )}
                  </button>
                  <button type="button" onClick={handleWhatsAppContact}
                    className="flex-1 flex items-center justify-center gap-2 py-4 border border-[var(--roke-border-strong)] text-[var(--roke-text-dimmer)] hover:text-[var(--roke-text)] hover:border-[var(--roke-text)] font-semibold text-[14px] transition-colors sm:border-l-0">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>
              </form>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="p-10 bg-[var(--roke-surface)]"
            >
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-[var(--roke-text-dimmer)] mb-8">
                <div className="w-8 h-[1px] bg-[var(--roke-text-dimmer)]" />
                <span>FAQ</span>
              </div>
              <h3 className="text-[28px] font-bold text-[var(--roke-text)] tracking-[-0.02em] mb-10 leading-tight">
                Preguntas<br />frecuentes.
              </h3>

              <div className="space-y-0 border border-[var(--roke-border-strong)]">
                {[
                  { q: '¿Cuánto tiempo para recibir respuesta?', a: 'Respondemos todos los mensajes en menos de 24 horas durante días laborales.' },
                  { q: '¿Ofrecen consultas gratuitas?', a: 'Sí, ofrecemos una consulta inicial gratuita de 30 minutos para evaluar tus necesidades.' },
                  { q: '¿Trabajan con empresas internacionales?', a: 'Absolutamente. Tenemos experiencia trabajando con clientes de todo el mundo.' },
                  { q: '¿Tienen soporte en español?', a: 'Sí, todo nuestro equipo técnico atiende exclusivamente en español, 24/7.' },
                ].map((faq, i) => (
                  <div key={i} className="p-6 border-b border-[var(--roke-border-strong)] last:border-b-0">
                    <div className="flex gap-4">
                      <span className="font-mono text-[11px] text-[var(--roke-text-dimmer)] mt-0.5 flex-shrink-0">0{i + 1}</span>
                      <div>
                        <h4 className="font-semibold text-[14px] text-[var(--roke-text)] mb-2 leading-snug">{faq.q}</h4>
                        <p className="text-[13.5px] text-[var(--roke-text-dim)] leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
