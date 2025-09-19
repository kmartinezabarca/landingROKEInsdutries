import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/common/Card";
import Button from "../components/common/Button";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      slug: "optimizacion-servidores-minecraft",
      title: "Guía Completa para Optimizar Servidores de Minecraft",
      excerpt:
        "Aprende las mejores técnicas para optimizar el rendimiento de tu servidor de Minecraft y ofrecer la mejor experiencia a tus jugadores.",
      author: "Carlos Rodríguez",
      date: "2025-08-12",
      readTime: "8 min",
      category: "Gaming",
      tags: ["Minecraft", "Optimización", "Servidores", "Gaming"],
      featured: true,
      image: "/assets/minecraft-server.jpg",
    },
    {
      id: 2,
      slug: "ssl-certificados-hosting",
      title: "Cómo Configurar Certificados SSL en tu Hosting",
      excerpt:
        "Guía paso a paso para instalar y configurar certificados SSL/TLS en tu sitio web para mejorar la seguridad y SEO.",
      author: "Ana García",
      date: "2025-08-10",
      readTime: "6 min",
      category: "Hosting",
      tags: ["SSL", "Seguridad", "Hosting", "HTTPS"],
      featured: true,
      image: "/assets/ssl-security.jpg",
    },
    {
      id: 3,
      slug: "tendencias-hosting-2025",
      title: "Tendencias de Hosting Web para 2025",
      excerpt:
        "Descubre las principales tendencias en hosting web que dominarán el 2025, desde edge computing hasta sostenibilidad.",
      author: "Miguel Torres",
      date: "2025-08-08",
      readTime: "12 min",
      category: "Tecnología",
      tags: ["Hosting", "Tendencias", "2025", "Tecnología"],
      featured: false,
      image: "/assets/hosting-trends.jpg",
    },
    {
      id: 4,
      slug: "cloud-hosting-vs-tradicional",
      title: "Cloud Hosting vs Hosting Tradicional: ¿Cuál Elegir?",
      excerpt:
        "Comparamos las ventajas y desventajas del cloud hosting frente al hosting tradicional para ayudarte a decidir.",
      author: "Ana García",
      date: "2024-08-03",
      readTime: "7 min",
      category: "Cloud",
      tags: ["Cloud", "Hosting", "Comparación"],
      featured: false,
      image: "/assets/services-bg.png",
    },
    {
      id: 5,
      slug: "configuracion-ssl-principiantes",
      title: "Configuración SSL: Guía para Principiantes",
      excerpt:
        "Todo lo que necesitas saber sobre certificados SSL y cómo configurarlos correctamente en tu sitio web.",
      author: "David López",
      date: "2024-08-01",
      readTime: "5 min",
      category: "Seguridad",
      tags: ["SSL", "Seguridad", "HTTPS"],
      featured: false,
      image: "/assets/hero-bg.png",
    },
    {
      id: 6,
      slug: "tendencias-desarrollo-web-2024",
      title: "Tendencias en Desarrollo Web 2024",
      excerpt:
        "Explora las últimas tendencias en desarrollo web que están definiendo el futuro de la industria.",
      author: "David López",
      date: "2024-07-28",
      readTime: "9 min",
      category: "Desarrollo",
      tags: ["Desarrollo", "Tendencias", "2024"],
      featured: false,
      image: "/assets/team-placeholder.png",
    },
  ];

  const categories = [
    "Todos",
    "Hosting",
    "Gaming",
    "Seguridad",
    "Cloud",
    "Desarrollo",
  ];
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  const filteredPosts =
    selectedCategory === "Todos"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
          style={{
            backgroundImage:
              "url('/assets/images/banners/banner-blog.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Mantente actualizado con las últimas tendencias en tecnología,
              hosting, gaming y desarrollo web.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Posts */}
        {selectedCategory === "Todos" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Artículos Destacados
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="h-full group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString("es-ES")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {post.author}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Leer más
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {selectedCategory === "Todos"
              ? "Todos los Artículos"
              : `Artículos de ${selectedCategory}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("es-ES")}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                        >
                          <Tag className="w-2 h-2" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center bg-primary/5 rounded-2xl p-8 border border-primary/10"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            ¿Te gustó nuestro contenido?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter para recibir los últimos artículos
            sobre tecnología, hosting y desarrollo web directamente en tu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>Suscribirse</Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default BlogPage;
