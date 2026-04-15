import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Container from '../components/common/Container';
import { ROUTES, CONFIG } from '../utils/constants/config';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation(["errors", "nav", "common"]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Container className="py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Número 404 animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <span className="text-[10rem] md:text-[14rem] font-extrabold leading-none bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent select-none">
              404
            </span>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("errors:notFound.title")}
            </h1>
            <p className="text-muted-foreground text-lg mb-10">
              {t("errors:notFound.message")}
            </p>
          </motion.div>

          {/* Acciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
            >
              <Home className="w-5 h-5" />
              {t("common:actions.goHome")}
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-semibold text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
              {t("errors:notFound.back")}
            </button>

            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-semibold text-foreground"
            >
              <Search className="w-5 h-5" />
              {t("errors:notFound.support")}
            </Link>
          </motion.div>

          {/* Links rápidos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-14 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">{t("errors:notFound.popular")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: t("nav:services"), to: ROUTES.SERVICES },
                { label: t("nav:hosting"), to: ROUTES.HOSTING },
                { label: t("nav:blog"), to: ROUTES.BLOG },
                { label: t("nav:contact"), to: ROUTES.CONTACT },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
