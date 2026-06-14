import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, LifeBuoy } from 'lucide-react';
import { useSeo } from '@/components/common/Seo';

const quickLinks = [
  { to: '/services', label: 'Servicios' },
  { to: '/hosting', label: 'Hosting' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contacto' },
];

const NotFoundPage: React.FC = () => {
  useSeo({
    title: 'Página no encontrada',
    description: 'La página que buscas no existe o fue movida.',
    path: '/404',
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="py-[100px] md:py-[140px] border-b border-border relative">
        <div className="roke-grid-bg opacity-40" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-6">
              <div className="w-8 h-[1px] bg-muted-foreground" />
              <span>Error 404 · Página no encontrada</span>
            </div>

            <h1 className="font-sans text-[88px] md:text-[140px] font-bold leading-[0.9] tracking-[-0.04em] text-foreground m-0">
              404
            </h1>

            <p className="text-[18px] md:text-[20px] leading-[1.5] text-muted-foreground max-w-[560px] mt-6">
              La página que buscas no existe, cambió de dirección o nunca estuvo
              aquí. Revisa la URL o continúa desde uno de estos accesos.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Home className="w-4 h-4" /> Ir al inicio
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 h-11 px-6 border border-border text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Volver atrás
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 h-11 px-6 border border-border text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <LifeBuoy className="w-4 h-4" /> Soporte
              </Link>
            </div>

            <div className="mt-14 w-full">
              <p className="font-mono text-[11px] text-muted-foreground mb-4">
                Enlaces rápidos
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border">
                {quickLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group flex items-center justify-between p-5 border-b border-r border-border text-foreground hover:bg-accent transition-colors"
                  >
                    <span className="text-[15px] font-medium">{link.label}</span>
                    <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
