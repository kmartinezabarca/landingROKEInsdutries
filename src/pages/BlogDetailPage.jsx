import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Heart, 
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  ChevronRight
} from 'lucide-react';
import Container from '../components/common/Container';
import { getBlogPostBySlug, getBlogPosts } from '../services/blogService';

// Logo de ROKE Industries como imagen por defecto
const DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect fill='%23f0f0f0' width='1200' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='72' fill='%23999' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='bold'%3EROKE Industries%3C/text%3E%3C/svg%3E";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Carga el artículo específico y artículos relacionados
   */
  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar el artículo específico
        const response = await getBlogPostBySlug(slug);
        const post = response.data;
        setArticle(post);
        setLikes(post.likes || 0);

        // Cargar todos los posts para obtener artículos relacionados
        const allPostsResponse = await getBlogPosts();
        const allPosts = allPostsResponse.data || [];

        // Filtrar artículos relacionados (misma categoría, excluyendo el actual)
        const related = allPosts
          .filter(
            (p) =>
              p.category?.uuid === post.category?.uuid &&
              p.slug !== slug
          )
          .slice(0, 3);

        setRelatedArticles(related);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('No se pudo cargar el artículo. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  /**
   * Copia el enlace del artículo al portapapeles
   */
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Alterna el estado de "me gusta"
   */
  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  /**
   * Formatea la fecha para mostrar
   */
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  /**
   * Renderiza artículos relacionados
   */
  const RelatedArticleCard = ({ article }) => {
    const imageUrl = article.image || DEFAULT_IMAGE;
    const authorName = article.authorName || article.author?.name || 'ROKE Industries';

    return (
      <Link
        to={`/blog/${article.slug}`}
        className="group block h-full"
      >
        <motion.div
          whileHover={{ y: -4 }}
          className="h-full rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 bg-card hover:shadow-lg"
        >
          <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden relative">
            <img
              src={imageUrl}
              alt={article.title}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE;
              }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
              {article.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{article.readTime || 5} min</span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Container className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Artículo no encontrado</h1>
            <p className="text-muted-foreground mb-6">
              {error || 'El artículo que buscas no existe o ha sido eliminado.'}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Link>
          </motion.div>
        </Container>
      </div>
    );
  }

  const imageUrl = article.image || DEFAULT_IMAGE;
  const authorName = article.authorName || article.author?.name || 'ROKE Industries';

  return (
    <div className="min-h-screen bg-background">
      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300"
      >
        <img
          src={imageUrl}
          alt={article.title}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4" />
              {article.category && (
                <>
                  <span className="text-primary font-medium">
                    {article.category.name}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
              <span className="text-foreground font-medium truncate">
                {article.title}
              </span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
            >
              {article.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime || 5} min de lectura</span>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="prose prose-lg max-w-none mb-12 dark:prose-invert"
            >
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </motion.div>

            {/* Share and Like */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 py-8 border-t border-b border-border"
            >
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    liked ? 'fill-destructive text-destructive' : 'text-muted-foreground'
                  }`}
                />
                <span className="font-medium">{likes}</span>
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground">Compartir:</span>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                  title="Copiar enlace"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  title="Compartir en Facebook"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
                  title="Compartir en Twitter"
                >
                  <Twitter className="w-5 h-5 text-sky-500" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  title="Compartir en LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-blue-700" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Category Badge */}
            {article.category && (
              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Categoría</p>
                <p className="text-lg font-semibold text-primary">
                  {article.category.name}
                </p>
              </div>
            )}

            {/* Table of Contents */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-4">Contenido</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Artículos Relacionados</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <RelatedArticleCard
                      key={relatedArticle.uuid}
                      article={relatedArticle}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </Container>

      {/* Back to Blog */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="border-t border-border bg-muted/30 py-12"
      >
        <Container>
          <Link
            to="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-semibold group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al blog
          </Link>
        </Container>
      </motion.div>
    </div>
  );
};

export default BlogDetailPage;
