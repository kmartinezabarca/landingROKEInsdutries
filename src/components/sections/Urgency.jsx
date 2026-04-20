import React from "react";
import { motion } from "framer-motion";
import { Zap, Clock, Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import { ROUTES } from "../../utils/constants/config";

const Urgency = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA Block */}
          <div className="bg-card border-2 border-primary rounded-2xl p-12 text-center mb-12">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">Oferta Limitada</span>
              </div>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lanza tu infraestructura hoy
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Primeros 50 clientes nuevos reciben soporte prioritario gratis por 3 meses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-4">
                <Link to={ROUTES.HOSTING} className="flex items-center justify-center gap-2">
                  Ver Planes Ahora
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-4"
              >
                <a href="https://wa.me/+1234567890?text=Hola%20ROKE%20Industries%2C%20quiero%20aprovechar%20la%20oferta%20limitada" className="flex items-center justify-center gap-2">
                  Hablar por WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Despliegue en 24h
              </h3>
              <p className="text-muted-foreground text-sm">
                Tus servidores funcionando en menos de un día
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Soporte Prioritario Gratis
              </h3>
              <p className="text-muted-foreground text-sm">
                3 meses de soporte técnico 24/7 sin costo adicional
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Garantía de Satisfacción
              </h3>
              <p className="text-muted-foreground text-sm">
                30 días de garantía de devolución de dinero
              </p>
            </motion.div>
          </div>

          {/* Countdown-style text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground">
              ⏱️ Cupos limitados este mes • Precio de lanzamiento válido hasta fin de mes
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Urgency;
