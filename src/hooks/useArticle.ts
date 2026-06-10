import { useState, useEffect, useRef, useCallback } from 'react';
import { getBlogPostBySlug, getBlogPosts, likeBlogPost, unlikeBlogPost } from '@/services/blogService';
import { extractToc } from '@/pages/blog/blogUtils';
import type { Article, RelatedArticle, TocItem } from '@/pages/blog/types';

/** Clave en localStorage que recuerda qué posts likeó este navegador (sin login). */
const LIKED_KEY = 'roke_blog_liked';

const readLikedSet = (): Set<string> => {
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
};

const persistLikedSet = (set: Set<string>) => {
  try {
    localStorage.setItem(LIKED_KEY, JSON.stringify([...set]));
  } catch {
    /* noop */
  }
};

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
        setLiked(readLikedSet().has(slug));
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

  const handleLike = useCallback(async () => {
    if (!slug) return;
    const next = !liked;

    // Optimista: actualiza UI de inmediato.
    setLiked(next);
    setLikes((prev) => Math.max(0, prev + (next ? 1 : -1)));

    const likedSet = readLikedSet();
    if (next) likedSet.add(slug);
    else likedSet.delete(slug);
    persistLikedSet(likedSet);

    try {
      const total = next ? await likeBlogPost(slug) : await unlikeBlogPost(slug);
      setLikes(total);
    } catch {
      // Revertir si el backend falla.
      setLiked(!next);
      setLikes((prev) => Math.max(0, prev + (next ? -1 : 1)));
      const revertSet = readLikedSet();
      if (next) revertSet.delete(slug);
      else revertSet.add(slug);
      persistLikedSet(revertSet);
    }
  }, [slug, liked]);

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
