import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import WhatsAppService from '../services/whatsapp/whatsappService';
import { CONFIG } from '../utils/constants/config';

interface FormData { name: string; email: string; phone: string; company: string; service: string; message: string }
interface FormErrors { name?: string; email?: string; phone?: string; service?: string; message?: string }
interface ContactInfo { icon: React.ElementType; title: string; value: string; description: string }
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

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
    setFormStatus('loading');
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const handleWhatsAppContact = (): void => {
    const message = WhatsAppService.generateContactMessage(formData.name || 'Cliente', formData.service || 'Consulta general');
    WhatsAppService.openWhatsApp(message);
  };

  const inputBase = "w-full px-4 py-3 border bg-background text-foreground text-[14px] focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50";

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero banner ── */}
      <section className="relative h-[420px] md:h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center z-0 bg-fixed" style={{ backgroundImage: "url('/assets/images/banners/banner-contact-us.jpg')" }} />
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="relative z-20 max-w-[1296px] mx-auto px-6 md:px-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3.5 text-[11px] text-white/50 mb-6 font-mono uppercase tracking-widest">
              <div className="w-8 h-[1px] bg-white/40" />
              <span>ROKE Industries · Contacto</span>
              <div className="w-8 h-[1px] bg-white/40" />
            </div>
            <h1 className="text-[52px] md:text-[72px] font-bold leading-[0.95] tracking-[-0.035em] mb-6">
              Hablemos de<br />
              <span className="text-white/50 font-medium">tu proyecto.</span>
            </h1>
            <p className="text-[17px] text-white/70 max-w-2xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo de expertos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact info strip ── */}
      <section className="border-t border-border">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="py-10 px-8 border-r border-border last:border-r-0 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                    <div className="roke-icon-box w-10 h-10 border border-border rounded-[4px] flex items-center justify-center text-foreground bg-background">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-[13px] font-semibold text-foreground">{info.title}</div>
                  <div className="text-[13px] text-foreground/80 font-medium leading-snug">{info.value}</div>
                  <div className="text-[12px] text-muted-foreground">{info.description}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + FAQ ── */}
      <section className="py-[120px] border-t border-border relative">
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
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-6">
                <div className="w-8 h-[1px] bg-muted-foreground" />
                <span>Formulario</span>
              </div>
              <h2 className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-foreground m-0">
                Envíanos un <span className="text-muted-foreground font-medium">mensaje.</span>
              </h2>
            </div>
            <p className="text-[17px] leading-[1.55] text-muted-foreground max-w-[520px] pb-1.5">
              Completa el formulario y te responderemos en menos de 24 horas. También puedes contactarnos directamente por WhatsApp.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 border border-border">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-10 border-r border-border"
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
                <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
                  <div className="border-r border-border border-b md:border-b-0 p-0">
                    <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Nombre *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                      className={`${inputBase} px-4 pb-4 pt-2 border-0 ${errors.name ? 'text-red-500' : ''}`}
                      placeholder="Tu nombre completo" />
                    {errors.name && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.name}</p>}
                  </div>
                  <div className="border-b p-0">
                    <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className={`${inputBase} px-4 pb-4 pt-2 border-0 ${errors.email ? 'text-red-500' : ''}`}
                      placeholder="tu@email.com" />
                    {errors.email && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 border border-border -mt-[1px]">
                  <div className="border-r border-border border-b md:border-b-0 p-0">
                    <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Teléfono *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className={`${inputBase} px-4 pb-4 pt-2 border-0 ${errors.phone ? 'text-red-500' : ''}`}
                      placeholder="+52 (234) 567-8900" />
                    {errors.phone && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.phone}</p>}
                  </div>
                  <div className="p-0">
                    <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Empresa</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange}
                      className={`${inputBase} px-4 pb-4 pt-2 border-0`}
                      placeholder="Nombre de tu empresa" />
                  </div>
                </div>

                <div className="border border-border -mt-[1px]">
                  <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Servicio de interés *</label>
                  <select name="service" value={formData.service} onChange={handleInputChange}
                    className={`${inputBase} px-4 pb-4 pt-2 border-0 ${errors.service ? 'text-red-500' : ''}`}>
                    <option value="">Selecciona un servicio</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.service}</p>}
                </div>

                <div className="border border-border -mt-[1px]">
                  <label className="block px-4 pt-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Mensaje *</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5}
                    className={`${inputBase} px-4 pb-4 pt-2 border-0 resize-none ${errors.message ? 'text-red-500' : ''}`}
                    placeholder="Cuéntanos sobre tu proyecto o consulta..." />
                  {errors.message && <p className="px-4 pb-3 text-red-500 text-[12px]">{errors.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-0 pt-6">
                  <button type="submit" disabled={formStatus === 'loading'}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-foreground text-background font-semibold text-[14px] hover:-translate-y-px hover:shadow-lg transition-all disabled:opacity-60">
                    {formStatus === 'loading' ? (
                      <><div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />Enviando...</>
                    ) : (
                      <><Send className="w-4 h-4" />Enviar Mensaje</>
                    )}
                  </button>
                  <button type="button" onClick={handleWhatsAppContact}
                    className="flex-1 flex items-center justify-center gap-2 py-4 border border-border text-muted-foreground hover:text-foreground hover:border-foreground font-semibold text-[14px] transition-colors sm:border-l-0">
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
              className="p-10 bg-muted/10"
            >
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-8">
                <div className="w-8 h-[1px] bg-muted-foreground" />
                <span>FAQ</span>
              </div>
              <h3 className="text-[28px] font-bold text-foreground tracking-[-0.02em] mb-10 leading-tight">
                Preguntas<br />frecuentes.
              </h3>

              <div className="space-y-0 border border-border">
                {[
                  { q: '¿Cuánto tiempo para recibir respuesta?', a: 'Respondemos todos los mensajes en menos de 24 horas durante días laborales.' },
                  { q: '¿Ofrecen consultas gratuitas?', a: 'Sí, ofrecemos una consulta inicial gratuita de 30 minutos para evaluar tus necesidades.' },
                  { q: '¿Trabajan con empresas internacionales?', a: 'Absolutamente. Tenemos experiencia trabajando con clientes de todo el mundo.' },
                  { q: '¿Tienen soporte en español?', a: 'Sí, todo nuestro equipo técnico atiende exclusivamente en español, 24/7.' },
                ].map((faq, i) => (
                  <div key={i} className="p-6 border-b border-border last:border-b-0">
                    <div className="flex gap-4">
                      <span className="font-mono text-[11px] text-muted-foreground mt-0.5 flex-shrink-0">0{i + 1}</span>
                      <div>
                        <h4 className="font-semibold text-[14px] text-foreground mb-2 leading-snug">{faq.q}</h4>
                        <p className="text-[13.5px] text-muted-foreground leading-relaxed">{faq.a}</p>
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
