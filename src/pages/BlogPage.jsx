import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, Tag, AlertCircle, Search, Loader2 } from "lucide-react";
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

// Logo de ROKE Industries como imagen por defecto
const DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%23999' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='bold'%3EROKE Industries%3C/text%3E%3C/svg%3E";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
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
   * Filtra los posts según la categoría y búsqueda
   */
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "Todos" || post.category?.name === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /**
   * Obtiene los posts destacados
   */
  const featuredPosts = blogPosts.filter((post) => post.isFeatured).slice(0, 2);

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
  const PostCard = ({ post, isFeatured = false }) => {
    const imageUrl = post.image || DEFAULT_IMAGE;
    const authorName = post.authorName || post.author?.name || "ROKE Industries";

    return (
      <Card className="h-full group hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-lg overflow-hidden relative">
          <img
            src={imageUrl}
            alt={post.title}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE;
            }}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {post.isFeatured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary/80 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Destacado
            </div>
          )}
        </div>

        <CardHeader className={isFeatured ? "pb-4" : "pb-3"}>
          <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-3 flex-wrap ${isFeatured ? "gap-3" : ""}`}>
            {post.category && (
              <span className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/20">
                {post.category.name}
              </span>
            )}
            <div className="flex items-center gap-1 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime ? `${post.readTime} min` : "5 min"}</span>
            </div>
            {isFeatured && (
              <div className="flex items-center gap-1 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            )}
          </div>

          <CardTitle className={`${isFeatured ? "text-2xl" : "text-lg"} group-hover:text-primary transition-colors duration-300 ${!isFeatured ? "line-clamp-2" : ""}`}>
            {post.title}
          </CardTitle>
        </CardHeader>

        <CardContent className={isFeatured ? "pt-0 pb-4" : "pt-0 pb-3"}>
          <p className={`text-muted-foreground ${isFeatured ? "mb-4 line-clamp-2" : "text-sm mb-4 line-clamp-2"}`}>
            {post.excerpt}
          </p>

          <div className={`flex items-center justify-between ${isFeatured ? "text-sm" : "text-xs"} text-muted-foreground mb-4`}>
            <div className="flex items-center gap-1.5">
              <User className={`${isFeatured ? "w-4 h-4" : "w-3 h-3"}`} />
              <span className="font-medium">{authorName}</span>
            </div>
            {!isFeatured && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt)}
              </div>
            )}
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-semibold group/link"
          >
            Leer más
            <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
          style={{
            backgroundImage:
              "url('/assets/images/banners/banner-blog.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70 z-10" />
        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <Tag className="w-12 h-12 mx-auto text-primary mb-4 opacity-80" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">
              Blog
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Mantente actualizado con las últimas tendencias en tecnología,
              hosting, gaming y desarrollo web.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-20">
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-4 shadow-sm"
          >
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                Error al cargar el blog
              </h3>
              <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Featured Posts */}
        {!loading && featuredPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Artículos Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.uuid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <PostCard post={post} isFeatured={true} />
                </motion.div>
              ))}
            </div>
            <div className="border-t border-border mt-12 pt-12" />
          </motion.section>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg"
                    : "bg-muted hover:bg-muted/80 text-foreground border border-border"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Cargando artículos...</p>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.uuid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Tag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No hay artículos</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "No encontramos artículos que coincidan con tu búsqueda."
                : "No hay artículos disponibles en esta categoría."}
            </p>
            {searchQuery && (
              <Button
                onClick={() => setSearchQuery("")}
                variant="outline"
              >
                Limpiar búsqueda
              </Button>
            )}
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default BlogPage;
