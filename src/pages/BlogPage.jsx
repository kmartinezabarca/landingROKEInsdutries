import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, Tag, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/common/Card";
import Button from "../components/common/Button";
import { getBlogPosts, getBlogCategories } from "../services/blogService";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Carga los posts del blog desde la API
   */
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar categorías
        const categoriesResponse = await getBlogCategories();
        const categoriesList = categoriesResponse.data || [];
        setCategories(["Todos", ...categoriesList.map((cat) => cat.name)]);

        // Cargar posts
        const postsResponse = await getBlogPosts();
        const posts = postsResponse.data || [];
        setBlogPosts(posts);
      } catch (err) {
        console.error("Error loading blog data:", err);
        setError("No se pudieron cargar los artículos del blog. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, []);

  /**
   * Filtra los posts según la categoría seleccionada
   */
  const filteredPosts =
    selectedCategory === "Todos"
      ? blogPosts
      : blogPosts.filter((post) => post.category?.name === selectedCategory);

  /**
   * Obtiene los posts destacados
   */
  const featuredPosts = blogPosts.filter((post) => post.isFeatured);

  /**
   * Formatea la fecha para mostrar
   */
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  /**
   * Renderiza un post en la tarjeta
   */
  const PostCard = ({ post, isFeatured = false }) => (
    <Card className="h-full group hover:shadow-lg transition-all duration-300">
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        <img
          src={post.image || "/assets/placeholder.jpg"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className={isFeatured ? "" : "pb-3"}>
        <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-2 ${isFeatured ? "gap-4" : ""}`}>
          {post.category && (
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              {post.category.name}
            </span>
          )}
          <div className="flex items-center gap-1">
            <Clock className={isFeatured ? "w-4 h-4" : "w-3 h-3"} />
            {post.readTime ? `${post.readTime} min` : "5 min"}
          </div>
          {isFeatured && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
          )}
        </div>
        <CardTitle className={`${isFeatured ? "" : "text-lg"} group-hover:text-primary transition-colors ${!isFeatured ? "line-clamp-2" : ""}`}>
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className={isFeatured ? "" : "pt-0"}>
        <p className={`text-muted-foreground ${isFeatured ? "mb-4" : "text-sm mb-4 line-clamp-3"}`}>
          {post.excerpt}
        </p>
        {!isFeatured && (
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            {post.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.author.name}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </div>
          </div>
        )}
        {isFeatured && (
          <div className="flex items-center justify-between">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {post.author.name}
                </span>
              </div>
            )}
            <Button variant="ghost" size="sm">
              Leer más
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
        {!isFeatured && (
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            Leer más
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </CardContent>
    </Card>
  );

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
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-200">Error</h3>
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          </motion.div>
        )}

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Featured Posts */}
        {!loading && selectedCategory === "Todos" && featuredPosts.length > 0 && (
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
                  <Link to={`/blog/${post.slug}`}>
                    <PostCard post={post} isFeatured={true} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        {!loading && (
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
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No hay artículos disponibles en esta categoría.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <PostCard post={post} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

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
