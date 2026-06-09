import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Search } from "lucide-react";
import { PostGridSkeleton } from "@/components/common/Skeletons";
import { useBlogList } from "@/hooks/useBlogList";
import FeaturedCard from "@/pages/blog/FeaturedCard";
import PostCard from "@/pages/blog/PostCard";
import NewsletterBand from "@/pages/blog/NewsletterBand";
import { useSeo } from "@/components/common/Seo";

const BlogPage: React.FC = () => {
  useSeo({
    title: "Blog",
    description: "Artículos sobre hosting, servidores gaming, DevOps, seguridad e infraestructura. Guías y novedades del equipo de ROKE Industries.",
    path: "/blog",
  });
  const { blogPosts, categories, loading, error } = useBlogList();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery]           = useState<string>("");

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
                BLOG / ROKE Industries
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
                  className="font-semibold text-[12.5px] px-4 py-2 tracking-[0.02em] mi-tap cursor-pointer whitespace-nowrap"
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

export default BlogPage;
