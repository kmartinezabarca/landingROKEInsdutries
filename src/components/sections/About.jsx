import React from "react";
import { motion } from "framer-motion";
import { Calendar, Rocket, Eye, Gem, HardHat, Wrench, Server } from "lucide-react";
import { useTranslation } from "react-i18next";
import Container from "../common/Container";
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";

const About = () => {
  const { t } = useTranslation("about");

  const milestones = [
    { year: "2018-2021", title: t("milestones.forge.title"), description: t("milestones.forge.description"), icon: HardHat },
    { year: "2022-2023", title: t("milestones.lab.title"), description: t("milestones.lab.description"), icon: Wrench },
    { year: "2024", title: t("milestones.infra.title"), description: t("milestones.infra.description"), icon: Server },
    { year: "2025", title: t("milestones.founding.title"), description: t("milestones.founding.description"), icon: Rocket },
  ];

  const values = [
    { icon: Rocket, title: t("values.mission.title"), description: t("values.mission.description") },
    { icon: Eye, title: t("values.vision.title"), description: t("values.vision.description") },
    { icon: Gem, title: t("values.principles.title"), description: t("values.principles.description") },
  ];

  const stats = [
    { number: "500+", label: t("stats.clients") },
    { number: "99.9%", label: t("stats.uptime") },
    { number: "24/7", label: t("stats.support") },
    { number: "6+", label: t("stats.experience") },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">{t("milestones.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{milestone.year}</CardTitle>
                      <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">{t("values.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default About;
