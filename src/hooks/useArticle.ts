import { useState, useEffect, useRef, useCallback } from 'react';
import { getBlogPostBySlug, getBlogPosts } from '@/services/blogService';
import { extractToc } from '@/pages/blog/blogUtils';
import type { Article, RelatedArticle, TocItem } from '@/pages/blog/types';

/**
 * Carga un artículo del blog por slug y toda la lógica asociada de la vista:
 * artículos relacionados, tabla de contenidos, progreso de lectura, sección
 * activa y like/copiar enlace. Deja a BlogDetailPage como capa presentacional.
 */
export const useArticle = (slug?: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [toc, setToc] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        const response = await getBlogPostBySlug<Article>(slug);
        const post = response.data;
        setArticle(post);
        setLikes(post.likes || 0);
        const allPostsResponse = await getBlogPosts<RelatedArticle[]>();
        const allPosts = allPostsResponse.data || [];
        setRelatedArticles(
          allPosts.filter((p) => p.category?.uuid === post.category?.uuid && p.slug !== slug).slice(0, 3)
        );
      } catch {
        setError('No se pudo cargar el artículo. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };
    if (slug) loadArticle();
  }, [slug]);

  // Extract TOC after content renders
  useEffect(() => {
    if (article?.content) {
      setToc(extractToc(article.content));
    }
  }, [article?.content]);

  // Reading progress + TOC active section
  const handleScroll = useCallback(() => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);

    if (toc.length > 0) {
      const offset = 120;
      let active = toc[0].id;
      for (const item of toc) {
        const node = document.getElementById(item.id);
        if (node && node.offsetTop <= scrollTop + offset) active = item.id;
      }
      setActiveSection(active);
    }
  }, [toc]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return {
    article,
    relatedArticles,
    liked,
    likes,
    copied,
    loading,
    error,
    progress,
    activeSection,
    toc,
    contentRef,
    handleCopyLink,
    handleLike,
  };
};
