import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronRight, FileText, Video, Code, Download, ExternalLink, Star, Clock, User } from 'lucide-react';

type DocType = 'guide' | 'tutorial' | 'reference' | 'troubleshooting';
interface DocCategory { id: string; name: string; count: number }
interface DocItem { id: number; title: string; description: string; category: string; type: DocType; readTime: string; difficulty: string; rating: number; lastUpdated: string; popular?: boolean }
interface QuickLink { title: string; description: string; icon: React.ReactNode; link: string }

const DocumentationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories: DocCategory[] = [
    { id: 'all',             name: 'Todos',                  count: 24 },
    { id: 'getting-started', name: 'Primeros Pasos',         count: 6  },
    { id: 'hosting',         name: 'Hosting Web',            count: 8  },
    { id: 'gaming',          name: 'Servidores Gaming',      count: 5  },
    { id: 'api',             name: 'API',                    count: 3  },
    { id: 'troubleshooting', name: 'Solución de Problemas',  count: 2  },
  ];

  const documents: DocItem[] = [
    { id: 1, title: "Guía de Inicio Rápido",             description: "Aprende a configurar tu primer servicio de hosting en menos de 5 minutos.",                     category: "getting-started", type: "guide",           readTime: "5 min",  difficulty: "Principiante", rating: 4.9, lastUpdated: "2025-08-10", popular: true  },
    { id: 2, title: "Configuración de Dominio y DNS",    description: "Cómo configurar tu dominio para que apunte a tu hosting de ROKE Industries.",                   category: "hosting",         type: "tutorial",        readTime: "10 min", difficulty: "Intermedio",   rating: 4.8, lastUpdated: "2025-08-08"              },
    { id: 3, title: "Instalación de Minecraft Server",  description: "Guía paso a paso para instalar y configurar tu servidor de Minecraft.",                          category: "gaming",          type: "tutorial",        readTime: "15 min", difficulty: "Intermedio",   rating: 4.9, lastUpdated: "2025-08-12", popular: true  },
    { id: 4, title: "Referencia de API v1",              description: "Documentación completa de todos los endpoints disponibles en nuestra API.",                       category: "api",             type: "reference",       readTime: "30 min", difficulty: "Avanzado",     rating: 4.7, lastUpdated: "2025-08-14"              },
    { id: 5, title: "Configuración de SSL/TLS",          description: "Cómo habilitar y configurar certificados SSL para tu sitio web.",                               category: "hosting",         type: "guide",           readTime: "8 min",  difficulty: "Intermedio",   rating: 4.6, lastUpdated: "2025-08-05"              },
    { id: 6, title: "Optimización de Rendimiento",      description: "Mejores prácticas para optimizar el rendimiento de tu hosting.",                                  category: "hosting",         type: "guide",           readTime: "20 min", difficulty: "Avanzado",     rating: 4.8, lastUpdated: "2025-08-07", popular: true  },
    { id: 7, title: "Configuración de Mods en Minecraft", description: "Cómo instalar y gestionar mods en tu servidor de Minecraft.",                                  category: "gaming",          type: "tutorial",        readTime: "12 min", difficulty: "Intermedio",   rating: 4.7, lastUpdated: "2025-08-09"              },
    { id: 8, title: "Solución de Problemas Comunes",    description: "Resolución de los problemas más frecuentes en hosting y gaming.",                                 category: "troubleshooting", type: "troubleshooting", readTime: "25 min", difficulty: "Intermedio",   rating: 4.5, lastUpdated: "2025-08-11"              },
  ];

  const quickLinks: QuickLink[] = [
    { title: "Panel de Control",    description: "Accede a tu panel de administración", icon: <ExternalLink className="w-4 h-4" />, link: "#" },
    { title: "Descargas",           description: "Herramientas y utilidades",            icon: <Download      className="w-4 h-4" />, link: "#" },
    { title: "Videos Tutoriales",   description: "Aprende con contenido visual",          icon: <Video         className="w-4 h-4" />, link: "#" },
    { title: "Ejemplos de Código",  description: "Snippets y ejemplos prácticos",         icon: <Code          className="w-4 h-4" />, link: "#" },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const typeLabel: Record<DocType, string> = { guide: 'Guía', tutorial: 'Tutorial', reference: 'Referencia', troubleshooting: 'Ayuda' };
  const typeIcon: Record<DocType, React.ReactNode> = {
    guide: <BookOpen className="w-3.5 h-3.5" />, tutorial: <Video className="w-3.5 h-3.5" />,
    reference: <FileText className="w-3.5 h-3.5" />, troubleshooting: <Search className="w-3.5 h-3.5" />,
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── Page header ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border relative">
        <div className="roke-grid-bg opacity-40" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-6">
              <div className="w-8 h-[1px] bg-muted-foreground" />
              <span>Documentación</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end">
              <h1 className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-foreground m-0">
                Centro de <span className="text-muted-foreground font-medium">ayuda.</span>
              </h1>
              <p className="text-[17px] leading-[1.55] text-muted-foreground max-w-[520px] pb-1.5">
                Guías, tutoriales y referencias para aprovechar al máximo nuestros servicios de hosting y gaming.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Search + filters ── */}
      <section className="border-b border-border">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="flex flex-col lg:flex-row gap-0">
            <div className="relative flex-1 border-r border-border">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Buscar en la documentación..."
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-5 py-5 bg-background text-[14px] text-foreground border-0 focus:outline-none placeholder:text-muted-foreground/50" />
            </div>
            <div className="flex items-center gap-2 px-5 py-4 flex-wrap">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-[12px] font-mono transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-foreground text-background'
                      : 'border border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                  }`}>
                  {cat.name} <span className="opacity-50">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-[80px] md:py-[120px] relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid lg:grid-cols-[260px_1fr] gap-12">

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-8">

              {/* Quick links */}
              <div className="border border-border">
                <div className="px-6 py-4 border-b border-border">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Enlaces Rápidos</span>
                </div>
                <div className="divide-y divide-border">
                  {quickLinks.map((link, i) => (
                    <a key={i} href={link.link}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors group">
                      <div className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-foreground transition-colors flex-shrink-0">
                        {link.icon}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-foreground">{link.title}</div>
                        <div className="text-[12px] text-muted-foreground">{link.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Popular */}
              <div className="border border-border">
                <div className="px-6 py-4 border-b border-border">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Más Populares</span>
                </div>
                <div className="divide-y divide-border">
                  {documents.filter(d => d.popular).slice(0, 3).map(doc => (
                    <div key={doc.id} className="px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="text-[13px] font-medium text-foreground mb-1.5 leading-snug">{doc.title}</div>
                      <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-current" />{doc.rating}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{doc.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground">
                  <div className="w-8 h-[1px] bg-muted-foreground" />
                  <span>{filteredDocuments.length} {filteredDocuments.length === 1 ? 'resultado' : 'resultados'}{searchTerm && ` para "${searchTerm}"`}</span>
                </div>
                <select onChange={() => {}} className="px-3 py-2 border border-border bg-background text-[13px] text-muted-foreground focus:outline-none focus:border-foreground">
                  <option>Más relevante</option>
                  <option>Más reciente</option>
                  <option>Mejor valorado</option>
                </select>
              </div>

              {filteredDocuments.length > 0 ? (
                <div className="border border-border divide-y divide-border">
                  {filteredDocuments.map((doc, index) => (
                    <motion.div key={doc.id}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      className="p-7 hover:bg-muted/20 transition-colors cursor-pointer group flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border text-[11px] font-mono text-muted-foreground">
                            {typeIcon[doc.type]}{typeLabel[doc.type]}
                          </span>
                          {doc.popular && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border text-[11px] font-mono text-muted-foreground">
                              <Star className="w-3 h-3 fill-current" />Popular
                            </span>
                          )}
                        </div>
                        <h3 className="text-[18px] font-bold text-foreground tracking-[-0.01em] mb-2 group-hover:text-foreground/70 transition-colors">{doc.title}</h3>
                        <p className="text-[13.5px] text-muted-foreground mb-4 leading-relaxed">{doc.description}</p>
                        <div className="flex items-center gap-5 text-[12px] text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{doc.readTime}</span>
                          <span className="font-medium">{doc.difficulty}</span>
                          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-current text-foreground/40" />{doc.rating}</span>
                          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />Actualizado {doc.lastUpdated}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border border-border">
                  <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-5" />
                  <h3 className="text-[20px] font-bold text-foreground mb-3">Sin resultados</h3>
                  <p className="text-muted-foreground text-[14px] mb-6">Intenta con otros términos o explora todas las categorías.</p>
                  <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                    className="px-5 py-2.5 bg-foreground text-background text-[13px] font-semibold hover:opacity-90 transition-opacity">
                    Ver toda la documentación
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Help CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 border border-border bg-foreground text-background p-10 md:p-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-background/50 mb-5">
                <div className="w-8 h-[1px] bg-background/40" />
                <span>Soporte</span>
              </div>
              <h3 className="text-[36px] md:text-[44px] font-bold text-background tracking-[-0.03em] leading-tight mb-4">
                ¿No encuentras <span className="text-background/50 font-medium">lo que buscas?</span>
              </h3>
              <p className="text-[15px] text-background/70 leading-relaxed max-w-lg">
                Nuestro equipo de soporte está aquí para ayudarte. Contáctanos y te asistiremos personalmente.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <button className="px-7 py-3.5 bg-background text-foreground font-semibold text-[14px] hover:-translate-y-px hover:shadow-lg transition-all">
                Contactar Soporte
              </button>
              <button className="px-7 py-3.5 border border-background/30 text-background/80 hover:border-background hover:text-background font-semibold text-[14px] transition-colors">
                Solicitar Documentación
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DocumentationPage;
