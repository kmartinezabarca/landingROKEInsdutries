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
  Loader
} from 'lucide-react';
import Container from '../components/common/Container';
import { getBlogPostBySlug, getBlogPosts } from '../services/blogService';
import ReactMarkdown from 'react-markdown';

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
              p.category?.id === post.category?.id &&
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Container className="py-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-4"
          >
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Error</h3>
              <p className="text-red-800 dark:text-red-300 mb-4">
                {error || 'No se encontró el artículo solicitado.'}
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al blog
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <Container className="pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al blog
        </Link>
      </Container>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('${article.image || '/assets/placeholder.jpg'}')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
        <Container className="relative z-20 text-center">
          <div className="mb-4">
            {article.category && (
              <span className="bg-primary/80 text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                {article.category.name}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            {article.title}
          </h1>
        </Container>
      </motion.div>

      {/* Article Meta */}
      <Container className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-8"
        >
          {article.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{article.readTime ? `${article.readTime} min` : '5 min'} de lectura</span>
          </div>
        </motion.div>
      </Container>

      {/* Article Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="prose prose-invert dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2 text-foreground" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4 text-muted-foreground leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 text-muted-foreground" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 text-muted-foreground" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                  code: ({ node, inline, ...props }) =>
                    inline ? (
                      <code className="bg-muted px-2 py-1 rounded text-sm text-foreground font-mono" {...props} />
                    ) : (
                      <code className="block bg-muted p-4 rounded mb-4 overflow-x-auto text-sm text-foreground font-mono" {...props} />
                    ),
                  pre: ({ node, ...props }) => <pre className="mb-4" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-primary hover:text-primary/80 underline" {...props} />
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Article Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <div className="flex flex-wrap items-center justify-between gap-6">
                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                      }`}
                    />
                    <span className="text-sm font-medium">{likes}</span>
                  </button>
                </div>

                {/* Share */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Compartir:</span>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    title="Copiar enlace"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    title="Compartir en Facebook"
                  >
                    <Facebook className="w-5 h-5 text-muted-foreground" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    title="Compartir en Twitter"
                  >
                    <Twitter className="w-5 h-5 text-muted-foreground" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    title="Compartir en LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-muted-foreground" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Author Card */}
            {article.author && (
              <div className="bg-muted rounded-lg p-6 mb-8">
                <h3 className="font-bold text-foreground mb-2">Sobre el autor</h3>
                <p className="text-sm text-muted-foreground">
                  {article.author.name}
                </p>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4">Artículos relacionados</h3>
                <div className="space-y-4">
                  {relatedArticles.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="block p-3 rounded-lg bg-background hover:bg-muted/80 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-foreground hover:text-primary line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(post.publishedAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default BlogDetailPage;
