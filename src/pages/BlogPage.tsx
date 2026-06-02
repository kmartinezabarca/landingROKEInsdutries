import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, AlertCircle, Search, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { getBlogPosts, getBlogCategories } from "@/services/blogService";
import { PostGridSkeleton } from "@/components/common/Skeletons";

interface BlogPost {
  uuid: string; slug: string; title: string; excerpt: string;
  image?: string; isFeatured?: boolean;
  category?: { name: string; uuid?: string };
  readTime?: number; publishedAt?: string;
  authorName?: string; author?: { name: string };
}

const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts]               = useState<BlogPost[]>([]);
  const [categories, setCategories]             = useState<string[]>(["Todos"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery]           = useState<string>("");
  const [loading, setLoading]                   = useState<boolean>(true);
  const [error, setError]                       = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true); setError(null);
        const [catRes, postsRes] = await Promise.all([
          getBlogCategories<{ name: string }[]>(),
          getBlogPosts<BlogPost[]>(),
        ]);
        setCategories(["Todos", ...(catRes.data || []).map((c) => c.name)]);
        setBlogPosts(postsRes.data || []);
      } catch {
        setError("No se pudieron cargar los artículos. Por favor, intenta más tarde.");
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchCat = selectedCategory === "Todos" || post.category?.name === selectedCategory;
    const matchSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredPost = blogPosts.find(p => p.isFeatured);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    try {
      const d = new Date(dateString);
      return `${String(d.getDate()).padStart(2,'0')} · ${d.toLocaleString('es-ES',{month:'short'}).toUpperCase()} · ${d.getFullYear()}`;
    } catch { return dateString; }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--roke-bg)' }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: '96px 0 80px' }}
      >
        <div className="roke-grid-bg" />
        {/* Slash diagonal motif */}
        <div
          className="roke-slash-band"
          style={{
            position: 'absolute',
            top: '110px', right: '-200px',
            width: '1800px', height: '160px',
            transform: 'rotate(-30deg)',
            transformOrigin: '50% 50%',
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-8 h-px" style={{ background: 'var(--roke-text-dimmer)' }} />
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase flex items-center gap-2"
                style={{ color: 'var(--roke-text-dimmer)' }}>
                BLOG / Roke Industries
                <span className="inline-block w-1.5 h-1.5" style={{ background: 'var(--roke-text)' }} />
              </span>
            </div>
            <h1
              className="font-bold leading-[0.96] tracking-[-0.04em] mb-7"
              style={{ fontSize: 'clamp(52px, 6.4vw, 92px)', color: 'var(--roke-text)' }}
            >
              Ideas, guías<br />
              <span style={{ color: 'var(--roke-text-dim)', fontWeight: 500 }}>y tecnología.</span>
            </h1>
            <p className="text-[19px] leading-[1.5]" style={{ color: 'var(--roke-text-dim)', maxWidth: '580px' }}>
              Tendencias en hosting, gaming, cloud y desarrollo web — escritas por el equipo ROKE.
              Sin relleno, sin clickbait, solo lo que sirve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar (sticky) ── */}
      <div
        className="sticky z-20"
        style={{
          top: '64px',
          background: 'var(--roke-bg)',
          borderTop: '1px solid var(--roke-border-strong)',
          borderBottom: '1px solid var(--roke-border-strong)',
        }}
      >
        <div
          className="max-w-[1296px] mx-auto px-6 md:px-14 py-4"
          style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '24px', alignItems: 'center' }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] w-full max-w-[480px]"
            style={{ border: '1px solid var(--roke-border-strong)', background: 'var(--roke-surface)' }}
          >
            <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--roke-text-dimmer)' }} />
            <input
              type="text"
              placeholder="Buscar artículos, guías, tutoriales…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[13.5px] tracking-[0.01em]"
              style={{ color: 'var(--roke-text)', fontFamily: 'inherit' }}
            />
            <span
              className="font-mono text-[10px] px-1.5 py-0.5 rounded-[3px] tracking-[0.04em] hidden md:block"
              style={{ color: 'var(--roke-text-dimmer)', border: '1px solid var(--roke-border-strong)' }}
            >⌘ K</span>
          </div>

          {/* Segmented category tabs */}
          {categories.length > 1 && (
            <div
              className="flex overflow-hidden rounded-[4px]"
              style={{ border: '1px solid var(--roke-border-strong)' }}
            >
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="font-semibold text-[12.5px] px-4 py-2 tracking-[0.02em] transition-all duration-150 cursor-pointer whitespace-nowrap"
                  style={{
                    background: selectedCategory === cat ? 'var(--roke-primary-bg)' : 'transparent',
                    color: selectedCategory === cat ? 'var(--roke-primary-fg)' : 'var(--roke-text-dim)',
                    border: 'none',
                    borderLeft: i > 0 ? '1px solid var(--roke-border-strong)' : 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Count */}
          <span
            className="font-mono text-[11px] tracking-[0.1em] uppercase whitespace-nowrap"
            style={{ color: 'var(--roke-text-dimmer)' }}
          >
            {loading ? '— ARTÍCULOS' : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'ARTÍCULO' : 'ARTÍCULOS'}`}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1296px] mx-auto px-6 md:px-14">

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-5 flex items-start gap-4 rounded-[4px]"
            style={{ border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)' }}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
            <div>
              <p className="font-semibold text-[14px] mb-1" style={{ color: 'var(--roke-text)' }}>Error al cargar el blog</p>
              <p className="text-[13px]" style={{ color: 'var(--roke-text-dim)' }}>{error}</p>
            </div>
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <section className="py-[80px]">
            <div
              className="flex items-center gap-3.5 font-mono text-[11px] tracking-[0.16em] uppercase mb-7"
              style={{ color: 'var(--roke-text-dimmer)' }}
            >
              <div className="w-8 h-px" style={{ background: 'var(--roke-text-dimmer)' }} />
              <span>Cargando artículos…</span>
            </div>
            <PostGridSkeleton count={6} />
          </section>
        )}

        {/* ── Featured post ── */}
        {!loading && featuredPost && (
          <section className="py-[80px]">
            <div
              className="flex items-center gap-3.5 font-mono text-[11px] tracking-[0.16em] uppercase mb-7"
              style={{ color: 'var(--roke-text-dimmer)' }}
            >
              <div className="w-8 h-px" style={{ background: 'var(--roke-text-dimmer)' }} />
              <span>Destacados / lectura recomendada</span>
            </div>
            <FeaturedCard post={featuredPost} formatDate={formatDate} />
          </section>
        )}

        {/* ── Posts grid ── */}
        {!loading && filteredPosts.length > 0 && (
          <section style={{ paddingTop: featuredPost ? 0 : '80px', paddingBottom: '80px' }}>
            <div
              className="flex items-center gap-3.5 font-mono text-[11px] tracking-[0.16em] uppercase mb-7"
              style={{ color: 'var(--roke-text-dimmer)' }}
            >
              <div className="w-8 h-px" style={{ background: 'var(--roke-text-dimmer)' }} />
              <span>
                {selectedCategory !== 'Todos' ? `${selectedCategory} / ` : 'Todos los artículos / '}
                {filteredPosts.length}
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              style={{ border: '1px solid var(--roke-border-strong)' }}
            >
              {filteredPosts.map((post, i) => (
                <PostCard key={post.uuid} post={post} index={i} formatDate={formatDate} />
              ))}
            </motion.div>
          </section>
        )}

        {/* No results */}
        {!loading && filteredPosts.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="py-28 text-center"
            style={{ border: '1px solid var(--roke-border-strong)', margin: '80px 0' }}
          >
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase mb-5" style={{ color: 'var(--roke-text-dimmer)' }}>
              0 RESULTADOS
            </div>
            <h3 className="text-[22px] font-bold mb-3" style={{ color: 'var(--roke-text)' }}>No hay artículos</h3>
            <p className="text-[14px] mb-6" style={{ color: 'var(--roke-text-dim)' }}>
              {searchQuery
                ? "No encontramos artículos que coincidan con tu búsqueda."
                : "No hay artículos disponibles en esta categoría."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-5 py-2.5 text-[13px] font-semibold tracking-[0.02em] transition-colors rounded-[4px]"
                style={{ border: '1px solid var(--roke-border-strong)', color: 'var(--roke-text-dim)', background: 'transparent', fontFamily: 'inherit', cursor: 'pointer' }}
              >
                Limpiar búsqueda
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Newsletter ── */}
      <NewsletterBand />
    </div>
  );
};

/* ── FeaturedCard ─────────────────────────────────────────── */

interface FeaturedCardProps { post: BlogPost; formatDate: (d?: string) => string }

const FeaturedCard: React.FC<FeaturedCardProps> = ({ post, formatDate }) => {
  const authorName = post.authorName || post.author?.name || "ROKE Industries";
  const initials = authorName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid overflow-hidden group"
      style={{
        gridTemplateColumns: '1.4fr 1fr',
        border: '1px solid var(--roke-border-strong)',
        background: 'var(--roke-surface)',
      }}
    >
      {/* Left: image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '4/3', background: 'var(--roke-surface-2)' }}
      >
        {post.image ? (
          <img
            src={post.image} alt={post.title}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, var(--roke-surface-2) 0%, var(--roke-bg) 100%)',
            }}
          />
        )}
        <div
          className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 z-10"
          style={{ background: 'var(--roke-text)', color: 'var(--roke-bg)' }}
        >
          Destacado
        </div>
      </div>

      {/* Right: body */}
      <div
        className="flex flex-col justify-between gap-6"
        style={{ padding: '44px 44px 36px' }}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span
                className="font-mono text-[10.5px] tracking-[0.1em] uppercase px-2.5 py-1"
                style={{ color: 'var(--roke-text)', border: '1px solid var(--roke-border-strong)' }}
              >
                {post.category.name}
              </span>
            )}
            <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: 'var(--roke-text-dimmer)' }}>
              <Clock className="w-3 h-3" />{post.readTime || 5} min de lectura
            </span>
          </div>
          <h2
            className="font-bold leading-[1.05] tracking-[-0.025em] mb-[18px]"
            style={{ fontSize: '38px', color: 'var(--roke-text)' }}
          >
            {post.title}
          </h2>
          <p
            className="text-[16px] leading-[1.55] line-clamp-3"
            style={{ color: 'var(--roke-text-dim)' }}
          >
            {post.excerpt}
          </p>
        </div>

        <div
          className="flex items-center justify-between pt-5 mt-auto"
          style={{ borderTop: '1px solid var(--roke-border)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px]"
              style={{
                background: 'var(--roke-surface-2)',
                border: '1px solid var(--roke-border-strong)',
                color: 'var(--roke-text)',
              }}
            >
              {initials}
            </div>
            <div className="flex flex-col leading-[1.2]">
              <span className="font-semibold text-[13px]" style={{ color: 'var(--roke-text)' }}>{authorName}</span>
              <span className="font-mono text-[10.5px] tracking-[0.05em] mt-0.5" style={{ color: 'var(--roke-text-dimmer)' }}>
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-[13px] tracking-[0.04em] uppercase group/link"
            style={{ color: 'var(--roke-text)', textDecoration: 'none' }}
          >
            Leer artículo
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

/* ── PostCard ─────────────────────────────────────────────── */

interface PostCardProps { post: BlogPost; index: number; formatDate: (d?: string) => string }

const PostCard: React.FC<PostCardProps> = ({ post, index, formatDate }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
    className="-m-px flex flex-col group"
    style={{
      border: '1px solid var(--roke-border-strong)',
      background: 'var(--roke-surface)',
      transition: 'background 0.18s ease',
    }}
    onMouseEnter={e => (e.currentTarget.style.background = 'var(--roke-surface-2)')}
    onMouseLeave={e => (e.currentTarget.style.background = 'var(--roke-surface)')}
  >
    <Link to={`/blog/${post.slug}`} className="flex flex-col flex-1" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Media */}
      <div
        className="overflow-hidden relative"
        style={{
          aspectRatio: '16/10',
          background: 'var(--roke-surface-2)',
          borderBottom: '1px solid var(--roke-border)',
        }}
      >
        {post.image ? (
          <img
            src={post.image} alt={post.title}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, var(--roke-surface-2) 0%, var(--roke-bg) 100%)' }}
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3.5 flex-1" style={{ padding: '22px 24px 24px' }}>
        <div className="flex items-center gap-3">
          {post.category && (
            <span
              className="font-mono text-[10.5px] tracking-[0.1em] uppercase px-2.5 py-1"
              style={{ color: 'var(--roke-text)', border: '1px solid var(--roke-border-strong)' }}
            >
              {post.category.name}
            </span>
          )}
          <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: 'var(--roke-text-dimmer)' }}>
            <Clock className="w-2.5 h-2.5" />{post.readTime || 5} min
          </span>
        </div>
        <h3
          className="font-bold leading-[1.15] tracking-[-0.015em] line-clamp-2"
          style={{ fontSize: '21px', color: 'var(--roke-text)', margin: 0 }}
        >
          {post.title}
        </h3>
        <p
          className="text-[14px] leading-[1.5] flex-1"
          style={{
            color: 'var(--roke-text-dim)', margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>
        <div
          className="flex items-center justify-between pt-3.5 mt-auto font-mono text-[11px] tracking-[0.04em]"
          style={{ borderTop: '1px solid var(--roke-border)', color: 'var(--roke-text-dimmer)' }}
        >
          <span>{formatDate(post.publishedAt)}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--roke-text)' }} />
        </div>
      </div>
    </Link>
  </motion.div>
);

/* ── Newsletter band ──────────────────────────────────────── */

const NewsletterBand: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div
      className="relative overflow-hidden my-[80px] mx-auto"
      style={{
        maxWidth: '1296px',
        padding: '56px',
        background: 'var(--roke-surface)',
        border: '1px solid var(--roke-border-strong)',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '56px',
        alignItems: 'center',
      }}
    >
      {/* Slash motif */}
      <div
        className="roke-slash-band absolute pointer-events-none"
        style={{
          top: '-50px', right: '-200px',
          width: '1000px', height: '100px',
          transform: 'rotate(-30deg)',
        }}
      />

      <div className="relative z-10">
        <h3
          className="font-bold leading-[1.05] tracking-[-0.025em] mb-3.5"
          style={{ fontSize: '36px', color: 'var(--roke-text)', margin: '0 0 14px' }}
        >
          Suscríbete al newsletter.
        </h3>
        <p className="text-[15px] leading-[1.55]" style={{ color: 'var(--roke-text-dim)', margin: 0 }}>
          Una vez por mes: 5 artículos, 3 herramientas y 1 caso de estudio. Sin spam, sin afiliados, sin sorpresas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative z-10">
        <div
          className="flex overflow-hidden rounded-[4px]"
          style={{ border: '1px solid var(--roke-border-strong)', background: 'var(--roke-bg)' }}
        >
          <input
            type="email"
            required
            placeholder="tu@correo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[14px]"
            style={{ padding: '14px 16px', color: 'var(--roke-text)', fontFamily: 'inherit' }}
          />
          <button
            type="submit"
            className="flex items-center gap-2 font-semibold text-[13.5px] tracking-[0.02em] cursor-pointer border-none"
            style={{ padding: '14px 22px', background: 'var(--roke-primary-bg)', color: 'var(--roke-primary-fg)', fontFamily: 'inherit' }}
          >
            {sent ? '¡Enviado!' : <><Mail className="w-3.5 h-3.5" /> Suscribirme</>}
          </button>
        </div>
        <span
          className="font-mono text-[10.5px] tracking-[0.04em]"
          style={{ color: 'var(--roke-text-dimmer)' }}
        >
          PRIVACIDAD GARANTIZADA · CANCELA CON 1 CLICK
        </span>
      </form>
    </div>
  );
};

export default BlogPage;
