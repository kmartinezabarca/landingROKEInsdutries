import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock, Share2, Heart, ArrowLeft,
  Facebook, Twitter, Linkedin, Copy, Check,
  AlertCircle, Loader2, ChevronRight, Eye,
  Calendar
} from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '@/services/blogService';

const DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect fill='%23f0f0f0' width='1200' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='72' fill='%23999' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='bold'%3EROKE Industries%3C/text%3E%3C/svg%3E";

interface ArticleCategory { name: string; uuid?: string }
interface Article {
  title: string; excerpt?: string; content: string; image?: string;
  publishedAt?: string; readTime?: number; likes?: number; slug: string;
  category?: ArticleCategory; authorName?: string; author?: { name: string };
  views?: number;
}
interface RelatedArticle {
  uuid: string; slug: string; title: string; excerpt?: string; image?: string;
  readTime?: number; category?: ArticleCategory; authorName?: string; author?: { name: string };
}
interface TocItem { id: string; text: string; level: number }

function formatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const mon = d.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
    const yr = d.getFullYear();
    return `${day} · ${mon} · ${yr}`;
  } catch { return dateString; }
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function extractToc(html: string): TocItem[] {
  const div = document.createElement('div');
  div.innerHTML = html;
  const items: TocItem[] = [];
  div.querySelectorAll('h2, h3').forEach((el, i) => {
    const id = el.id || `section-${i}`;
    el.id = id;
    items.push({ id, text: el.textContent || '', level: el.tagName === 'H2' ? 2 : 3 });
  });
  return items;
}

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle]               = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [liked, setLiked]                   = useState(false);
  const [likes, setLikes]                   = useState(0);
  const [copied, setCopied]                 = useState(false);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState<string | null>(null);
  const [progress, setProgress]             = useState(0);
  const [activeSection, setActiveSection]   = useState('');
  const [toc, setToc]                       = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true); setError(null);
        const response = await getBlogPostBySlug(slug);
        const post = response.data;
        setArticle(post);
        setLikes(post.likes || 0);
        const allPostsResponse = await getBlogPosts();
        const allPosts = allPostsResponse.data || [];
        setRelatedArticles(
          allPosts.filter((p: RelatedArticle) => p.category?.uuid === post.category?.uuid && p.slug !== slug).slice(0, 3)
        );
      } catch {
        setError('No se pudo cargar el artículo. Por favor, intenta más tarde.');
      } finally { setLoading(false); }
    };
    if (slug) loadArticle();
  }, [slug]);

  // Extract TOC after content renders
  useEffect(() => {
    if (article?.content) {
      const items = extractToc(article.content);
      setToc(items);
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
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollTop + offset) active = item.id;
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
    setLiked(prev => !prev);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--roke-bg)' }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: 'var(--roke-text-dimmer)' }} />
          <p style={{ color: 'var(--roke-text-dimmer)', fontSize: 13, fontFamily: '"JetBrains Mono", monospace' }}>
            Cargando artículo...
          </p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !article) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--roke-bg)' }}>
        <div style={{ maxWidth: 1296, margin: '0 auto', padding: '80px 56px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ border: '1px solid var(--roke-border)', padding: 64, textAlign: 'center' }}>
            <AlertCircle className="w-10 h-10 mx-auto mb-5" style={{ color: 'var(--roke-text-dimmer)' }} />
            <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--roke-text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Artículo no encontrado
            </h1>
            <p style={{ color: 'var(--roke-text-dim)', fontSize: 15, marginBottom: 32 }}>
              {error || 'El artículo que buscas no existe o ha sido eliminado.'}
            </p>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--roke-text-dim)' }}>
              <ArrowLeft className="w-4 h-4" /> Volver al blog
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const imageUrl   = article.image || DEFAULT_IMAGE;
  const authorName = article.authorName || article.author?.name || 'ROKE Industries';
  const initials   = getInitials(authorName);

  return (
    <div style={{ background: 'var(--roke-bg)', minHeight: '100vh' }}>

      {/* ── Reading progress bar ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        height: 3, width: `${progress}%`,
        background: 'var(--roke-text)',
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }} />

      {/* ── Hero banner ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
        style={{ position: 'relative', height: 560, overflow: 'hidden' }}>
        <img src={imageUrl} alt={article.title}
          onError={e => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

        {/* Dark gradient overlay */}
        <div className="dark-hero-gradient" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(22,24,28,0.35) 0%, rgba(22,24,28,0.1) 30%, rgba(22,24,28,0.72) 70%, rgba(22,24,28,0.96) 100%)',
        }} />

        {/* Hero content at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          maxWidth: 1296, margin: '0 auto', padding: '0 56px 48px',
        }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
            color: 'rgba(255,255,255,0.6)', marginBottom: 16,
          }}>
            <Link to="/blog" style={{ color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
              Blog
            </Link>
            <ChevronRight className="w-3 h-3" />
            {article.category && (
              <>
                <span>{article.category.name}</span>
                <ChevronRight className="w-3 h-3" />
              </>
            )}
            <span style={{ color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 340 }}>
              {article.title}
            </span>
          </div>

          {/* Article tag */}
          {article.category && (
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '3px 10px', marginBottom: 18,
              fontSize: 10, fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
            }}>
              {article.category.name}
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(36px, 5.2vw, 76px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            color: '#ffffff',
            maxWidth: 900,
          }}>
            {article.title}
          </h1>
        </div>
      </motion.div>

      {/* ── Meta band ── */}
      <div style={{
        borderBottom: '1px solid var(--roke-border)',
        background: 'var(--roke-surface)',
      }}>
        <div style={{
          maxWidth: 1296, margin: '0 auto', padding: '0 56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, height: 72,
          flexWrap: 'wrap',
        }}>
          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--roke-border-stronger)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: 'var(--roke-text)',
              fontFamily: '"Montserrat", sans-serif',
              flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--roke-text)' }}>{authorName}</div>
              <div style={{ fontSize: 11, color: 'var(--roke-text-dimmer)', fontFamily: '"JetBrains Mono", monospace' }}>
                ROKE Industries
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 20,
            fontSize: 12, color: 'var(--roke-text-dimmer)',
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            <span style={{ color: 'var(--roke-border-stronger)' }}>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock className="w-3.5 h-3.5" />
              {article.readTime || 5} min
            </span>
            {article.views && (
              <>
                <span style={{ color: 'var(--roke-border-stronger)' }}>·</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Eye className="w-3.5 h-3.5" />
                  {article.views.toLocaleString('es-MX')}
                </span>
              </>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={handleLike} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 14px',
              border: `1px solid ${liked ? 'transparent' : 'var(--roke-border)'}`,
              background: liked ? 'rgba(239,68,68,0.1)' : 'transparent',
              cursor: 'pointer', fontSize: 13,
              color: liked ? '#ef4444' : 'var(--roke-text-dim)',
              transition: 'all 0.15s',
            }}>
              <Heart className="w-4 h-4" style={{ fill: liked ? '#ef4444' : 'none', color: liked ? '#ef4444' : 'var(--roke-text-dimmer)' }} />
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>{likes}</span>
            </button>
            <button onClick={handleCopyLink} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 14px',
              border: '1px solid var(--roke-border)',
              background: 'transparent', cursor: 'pointer',
              fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
              color: 'var(--roke-text-dim)', transition: 'border-color 0.15s',
            }}>
              {copied ? <><Check className="w-3.5 h-3.5" style={{ color: '#22c55e' }} /> COPIADO</> : <><Share2 className="w-3.5 h-3.5" /> COMPARTIR</>}
            </button>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div style={{ maxWidth: 1296, margin: '0 auto', padding: '80px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 720px) 320px', gap: 80, alignItems: 'start' }}>

          {/* ── Prose column ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div
              ref={contentRef}
              className="roke-article-prose"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* ── Article end bar ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid var(--roke-border)',
              paddingTop: 28, marginTop: 48, flexWrap: 'wrap', gap: 16,
            }}>
              <button onClick={handleLike} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 20px',
                border: `1px solid ${liked ? 'transparent' : 'var(--roke-border)'}`,
                background: liked ? 'rgba(239,68,68,0.08)' : 'transparent',
                cursor: 'pointer', fontSize: 13, fontWeight: 600,
                color: liked ? '#ef4444' : 'var(--roke-text)',
                transition: 'all 0.15s',
              }}>
                <Heart className="w-5 h-5" style={{ fill: liked ? '#ef4444' : 'none', color: liked ? '#ef4444' : 'var(--roke-text-dimmer)' }} />
                {liked ? `¡Te gustó este artículo! (${likes})` : `Me gusta este artículo (${likes})`}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--roke-text-dimmer)', fontFamily: '"JetBrains Mono", monospace', marginRight: 4 }}>
                  COMPARTIR
                </span>
                <button onClick={handleCopyLink} title="Copiar enlace" style={{
                  width: 36, height: 36, border: '1px solid var(--roke-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'transparent', cursor: 'pointer', transition: 'border-color 0.15s',
                }}>
                  {copied ? <Check className="w-4 h-4" style={{ color: '#22c55e' }} /> : <Copy className="w-4 h-4" style={{ color: 'var(--roke-text-dimmer)' }} />}
                </button>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer" style={{
                    width: 36, height: 36, border: '1px solid var(--roke-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.15s',
                  }}>
                  <Facebook className="w-4 h-4" style={{ color: 'var(--roke-text-dimmer)' }} />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank" rel="noopener noreferrer" style={{
                    width: 36, height: 36, border: '1px solid var(--roke-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.15s',
                  }}>
                  <Twitter className="w-4 h-4" style={{ color: 'var(--roke-text-dimmer)' }} />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer" style={{
                    width: 36, height: 36, border: '1px solid var(--roke-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.15s',
                  }}>
                  <Linkedin className="w-4 h-4" style={{ color: 'var(--roke-text-dimmer)' }} />
                </a>
              </div>
            </div>

            {/* ── Author bio ── */}
            <div style={{
              marginTop: 48, padding: 32,
              border: '1px solid var(--roke-border)',
              background: 'var(--roke-surface)',
              display: 'flex', gap: 24, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                background: 'var(--roke-border-stronger)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700, color: 'var(--roke-text)',
                fontFamily: '"Montserrat", sans-serif',
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: 11, fontFamily: '"JetBrains Mono", monospace', color: 'var(--roke-text-dimmer)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Autor
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--roke-text)', marginBottom: 4 }}>{authorName}</div>
                <div style={{ fontSize: 12, color: 'var(--roke-text-dimmer)', fontFamily: '"JetBrains Mono", monospace', marginBottom: 10 }}>
                  ROKE Industries
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--roke-text-dim)', lineHeight: 1.6, margin: 0 }}>
                  Equipo de contenido de ROKE Industries. Escribimos sobre infraestructura, desarrollo, y tecnología aplicada a negocios.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Category card */}
            {article.category && (
              <div style={{ border: '1px solid var(--roke-border)', background: 'var(--roke-surface)', padding: 24 }}>
                <div style={{ fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: 'var(--roke-text-dimmer)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Categoría
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--roke-text)', marginBottom: 12 }}>
                  {article.category.name}
                </div>
                <Link to="/blog" style={{
                  fontSize: 11, fontFamily: '"JetBrains Mono", monospace', color: 'var(--roke-text-dimmer)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  VER TODOS →
                </Link>
              </div>
            )}

            {/* TOC */}
            {toc.length > 0 && (
              <div style={{ border: '1px solid var(--roke-border)', background: 'var(--roke-surface)', padding: 24 }}>
                <div style={{ fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: 'var(--roke-text-dimmer)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
                  Contenido
                </div>
                <nav>
                  <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderLeft: '2px solid var(--roke-border)', paddingLeft: 16 }}>
                    {toc.map((item, idx) => (
                      <li key={item.id} style={{ marginBottom: item.level === 2 ? 10 : 6, paddingLeft: item.level === 3 ? 12 : 0 }}>
                        <a href={`#${item.id}`}
                          onClick={e => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          style={{
                            display: 'flex', alignItems: 'baseline', gap: 8,
                            fontSize: item.level === 2 ? 12.5 : 11.5,
                            fontWeight: item.level === 2 ? 600 : 400,
                            color: activeSection === item.id ? 'var(--roke-text)' : 'var(--roke-text-dimmer)',
                            textDecoration: 'none', lineHeight: 1.4,
                            transition: 'color 0.15s',
                          }}
                        >
                          <span style={{
                            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                            color: 'var(--roke-text-dimmer)', flexShrink: 0, minWidth: 18,
                          }}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.text}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            )}

            {/* Summary */}
            {article.excerpt && (
              <div style={{ border: '1px solid var(--roke-border)', background: 'var(--roke-surface)', padding: 24 }}>
                <div style={{ fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: 'var(--roke-text-dimmer)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Resumen
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--roke-text-dim)', lineHeight: 1.65, margin: 0 }}>
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Share */}
            <div style={{ border: '1px solid var(--roke-border)', background: 'var(--roke-surface)', padding: 24 }}>
              <div style={{ fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: 'var(--roke-text-dimmer)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
                Compartir
              </div>
              <button onClick={handleCopyLink} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '10px 0', border: '1px solid var(--roke-border)',
                background: 'transparent', cursor: 'pointer', marginBottom: 10,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace', color: 'var(--roke-text-dim)',
                transition: 'border-color 0.15s',
              }}>
                {copied ? <><Check className="w-3.5 h-3.5" style={{ color: '#22c55e' }} /> COPIADO</> : <><Copy className="w-3.5 h-3.5" /> COPIAR ENLACE</>}
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
                  { href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, icon: <Twitter className="w-4 h-4" />, label: 'X' },
                  { href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
                ].map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '10px 0', border: '1px solid var(--roke-border)',
                    fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: 'var(--roke-text-dimmer)',
                    textDecoration: 'none', transition: 'border-color 0.15s',
                  }}>
                    {icon}
                    {label}
                  </a>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* ── Related posts ── */}
      {relatedArticles.length > 0 && (
        <div style={{ borderTop: '1px solid var(--roke-border)', background: 'var(--roke-surface)' }}>
          <div style={{ maxWidth: 1296, margin: '0 auto', padding: '80px 56px' }}>

            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
                  color: 'var(--roke-text-dimmer)', letterSpacing: '0.12em',
                  textTransform: 'uppercase', marginBottom: 10,
                }}>
                  <div style={{ width: 24, height: 1, background: 'var(--roke-text-dimmer)' }} />
                  Más artículos
                </div>
                <h3 style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: 40, fontWeight: 800,
                  letterSpacing: '-0.03em', color: 'var(--roke-text)',
                  lineHeight: 1.05, margin: 0,
                }}>
                  Más de <span style={{ color: 'var(--roke-text-dimmer)' }}>Roke.</span>
                </h3>
              </div>
              <Link to="/blog" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, color: 'var(--roke-text-dim)',
                textDecoration: 'none',
              }}>
                <ArrowLeft className="w-4 h-4" />
                Volver al blog
              </Link>
            </div>

            {/* 3-col cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--roke-border-strong)' }}>
              {relatedArticles.map((rel, idx) => {
                const relAuthor = rel.authorName || rel.author?.name || 'ROKE Industries';
                return (
                  <RelatedCard key={rel.uuid} rel={rel} relAuthor={relAuthor} idx={idx} total={relatedArticles.length} />
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* ── Back to blog (no related) ── */}
      {relatedArticles.length === 0 && (
        <div style={{ borderTop: '1px solid var(--roke-border)', background: 'var(--roke-surface-2)' }}>
          <div style={{ maxWidth: 1296, margin: '0 auto', padding: '32px 56px' }}>
            <Link to="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontWeight: 600, color: 'var(--roke-text-dim)',
              textDecoration: 'none',
            }}>
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

/* ── Related card sub-component ── */
const RelatedCard: React.FC<{ rel: RelatedArticle; relAuthor: string; idx: number; total: number }> = ({ rel, relAuthor, idx, total }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link key={rel.uuid} to={`/blog/${rel.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        borderLeft: idx > 0 ? '1px solid var(--roke-border-strong)' : 'none',
        background: hovered ? 'var(--roke-surface-2)' : 'transparent',
        transition: 'background 0.15s',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: 'var(--roke-surface-2)' }}>
        <img src={rel.image || DEFAULT_IMAGE} alt={rel.title}
          onError={e => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }} />
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px 28px' }}>
        {rel.category && (
          <div style={{
            fontSize: 10, fontFamily: '"JetBrains Mono", monospace',
            color: 'var(--roke-text-dimmer)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>
            {rel.category.name}
          </div>
        )}
        <h4 style={{
          fontFamily: '"Montserrat", sans-serif', fontSize: 16,
          fontWeight: 700, color: 'var(--roke-text)', lineHeight: 1.3,
          letterSpacing: '-0.015em', marginBottom: 10,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {rel.title}
        </h4>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
          color: 'var(--roke-text-dimmer)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock className="w-3 h-3" /> {rel.readTime || 5} min
          </span>
          <span style={{ color: 'var(--roke-border-stronger)' }}>·</span>
          <span>{relAuthor}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogDetailPage;
