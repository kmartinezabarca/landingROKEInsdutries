import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import { ROUTES } from "../../utils/constants/config";

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 text-white relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 dark:from-slate-950 dark:via-primary/15 dark:to-slate-950">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para crecer tu negocio?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Únete a más de 500 empresas que confían en ROKE Industries para su infraestructura. Comienza hoy y obtén soporte prioritario gratis por 3 meses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to={ROUTES.HOSTING} className="flex items-center justify-center gap-2">
                Comenzar Ahora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="https://wa.me/+1234567890?text=Hola%20ROKE%20Industries%2C%20quiero%20comenzar%20con%20sus%20servicios" className="flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Hablar por WhatsApp
              </a>
            </Button>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20"
          >
            <p className="text-white/80 mb-6">
              Nuestro equipo de expertos está disponible para ayudarte:
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a
                href="https://wa.me/+1234567890"
                className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-sm text-white/70">WhatsApp</div>
                  <div className="font-semibold">+1 234 567 890</div>
                </div>
              </a>
              <a
                href="mailto:contact@rokeindustries.com"
                className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
              >
                <Phone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-sm text-white/70">Email</div>
                  <div className="font-semibold">contact@rokeindustries.com</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <p className="text-white/70 text-sm">
              ✓ Garantía de satisfacción 30 días • ✓ Sin contrato de larga duración • ✓ Cancela cuando quieras
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FinalCTA;
