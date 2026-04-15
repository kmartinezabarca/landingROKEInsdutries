import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import Container from "../common/Container";
import { Card, CardContent } from "../common/Card";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Team = () => {
  const { t } = useTranslation("team");

  const teamMembers = [
    {
      name: "Kevin Martinez",
      position: t("members.ceo.position"),
      description: t("members.ceo.description"),
      image: "/assets/team-ceo.png",
      social: {
        linkedin: "https://www.linkedin.com/in/kevmartinezabarca",
      },
    },
    {
      name: "Rocio Salazar",
      position: t("members.cto.position"),
      description: t("members.cto.description"),
      image: "/assets/team-cto.png",
      social: {
        linkedin:
          "https://www.linkedin.com/in/roc%C3%ADo-salazar-parra-92984720a",
      },
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className=" grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] justify-items-center" >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="h-full w-full max-w-sm" // Asegura que el contenedor ocupe toda la altura
            >
              <Card className="h-full flex flex-col group transition-all duration-300">
                <CardContent className="p-8 text-center flex flex-col flex-grow">
                  <div className="relative mb-10">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg
                         group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2
                         bg-primary text-primary-foreground
                         px-4 py-1.5 rounded-full text-sm font-semibold shadow-md"
                    >
                      {member.position}
                    </div>
                  </div>

                  {/* INFORMACIÓN DEL MIEMBRO */}
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-base mb-6 leading-relaxed flex-grow">
                    {member.description}
                  </p>

                  {/* ICONOS SOCIALES (estilo del diseño 1) */}
                  <div className="flex justify-center gap-4 mt-auto">
                    {/* Ejemplo para LinkedIn */}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center
                           hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-200
                           hover:scale-110"
                        aria-label={t("social.linkedin", { name: member.name })}
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {/* Ejemplo para Twitter/X */}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 bg-foreground/5 text-foreground/80 rounded-full flex items-center justify-center
                           hover:bg-foreground/10 hover:text-foreground
                           transition-all duration-200 hover:scale-110"
                        aria-label={t("social.twitter", { name: member.name })}
                      >
                        <FaXTwitter className="w-5 h-5" />
                      </a>
                    )}
                    {/* Puedes añadir más redes sociales siguiendo este patrón */}
                  </div>
                </CardContent>
              </Card>
              {/* --- FIN DE LA FUSIÓN DE DISEÑOS --- */}
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            {t("cta.title")}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <motion.a
            href="mailto:careers@rokeindustries.com"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4 mr-2" />
            {t("cta.button")}
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Team;
