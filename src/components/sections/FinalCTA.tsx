import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants/config";
import WhatsAppService from "../../services/whatsapp/whatsappService";

const FinalCTA: React.FC = () => {
  return (
    <section className="relative min-h-[493px] overflow-hidden border-y border-[#d7dbe0] bg-[#f6f7f6] text-[#141821]">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1436 493"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon
          points="368,0 768,0 10,442 0,416 0,217"
          fill="#d8dde3"
        />
      </svg>

      <div className="relative z-10 grid min-h-[493px] items-center gap-10 px-[68px] lg:grid-cols-[59.4vw_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <h2
              className="m-0 max-w-[720px] text-[56px] font-bold leading-[0.98] tracking-[-0.055em] text-[#141821] md:text-[70px] lg:text-[72px]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              ¿Listo para que
              <br />
              tu infra deje de
              <br />
              <span className="font-medium text-[#465363]">ser el problema?</span>
            </h2>
          </motion.div>
        </div>

        <div className="max-w-[540px] border-[#d7dbe0] lg:border-l lg:pl-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="m-0 max-w-[520px] text-[15.5px] leading-[1.45] tracking-[-0.01em] text-[#24324b]">
              Cuéntanos qué estás construyendo. Te respondemos en menos
              de 24 horas con una propuesta concreta, sin compromiso.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                to={ROUTES.CONTACT}
                className="inline-flex items-center justify-center gap-3 rounded-[3px] bg-[#1b1e22] px-7 py-[15px] text-[14px] font-bold text-white transition-all hover:-translate-y-px hover:bg-[#101215] hover:shadow-lg"
              >
                Cotizar Ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => WhatsAppService.openWhatsApp("Hola ROKE Industries, quiero cotizar un proyecto.")}
                className="inline-flex items-center justify-center gap-3 rounded-[3px] bg-[#22d365] px-7 py-[15px] text-[14px] font-bold text-[#082415] transition-all hover:-translate-y-px hover:bg-[#1fc35d]"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
