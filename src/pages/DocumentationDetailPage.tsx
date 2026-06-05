import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, AlertCircle, Loader2, ChevronRight } from 'lucide-react';

const API_BASE_URL = "http://localhost:8000/api";

interface DocCategory { name: string; image?: string }
interface DocumentData {
  title: string; content: string; image?: string;
  category?: DocCategory; published_at: string; excerpt?: string;
}

const DocumentationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true); setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/documentation/posts/${slug}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: DocumentData = await response.json();
        setDocument(data);
      } catch (err) {
        console.error('Error fetching documentation post:', err);
        setError('No se pudo cargar el documento de documentación.');
      } finally { setLoading(false); }
    };
    fetchDocument();
  }, [slug]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-[14px] font-mono">Cargando documento...</p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !document) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="border border-border p-16 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-5" />
            <h1 className="text-[28px] font-bold text-foreground mb-3 tracking-[-0.02em]">Documento no encontrado</h1>
            <p className="text-muted-foreground text-[15px] mb-8">
              {error || 'El documento que buscas no existe o ha sido eliminado.'}
            </p>
            <Link to="/documentation" className="inline-flex items-center gap-2 text-[14px] font-semibold text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Volver a Documentación
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const bannerImage = document.image || document.category?.image || '/assets/images/banners/banner-documentation.jpg';

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero banner ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="relative h-[340px] md:h-[420px] flex items-end overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed z-0" style={{ backgroundImage: `url(${bannerImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-black/30 z-10" />

        <div className="relative z-20 max-w-[1296px] mx-auto px-6 md:px-14 pb-10 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-white/60 mb-4">
            <Link to="/documentation" className="hover:text-white transition-colors">Documentación</Link>
            <ChevronRight className="w-3 h-3" />
            {document.category && (
              <>
                <span className="text-white/60">{document.category.name}</span>
                <ChevronRight className="w-3 h-3" />
              </>
            )}
            <span className="text-white/40 truncate max-w-[300px]">{document.title}</span>
          </div>
          <h1 className="font-sans text-[36px] md:text-[52px] font-bold leading-[1.02] tracking-[-0.03em] text-white">
            {document.title}
          </h1>
        </div>
      </motion.div>

      {/* ── Content area ── */}
      <div className="max-w-[1296px] mx-auto px-6 md:px-14 py-[80px] md:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-14">

          {/* ── Main content ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-5 pb-8 border-b border-border mb-10 font-mono text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />Admin</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(document.published_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {document.category && (
                <span className="border border-border px-2.5 py-1 text-[11px]">{document.category.name}</span>
              )}
            </div>

            {/* Body */}
            <div className="prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:tracking-[-0.02em] prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-[1.7] prose-p:text-[15px]
              prose-a:text-foreground prose-a:underline
              prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[13px] prose-code:rounded-none
              prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-none
              prose-blockquote:border-l-2 prose-blockquote:border-foreground/30 prose-blockquote:pl-5 prose-blockquote:not-italic
              prose-li:text-muted-foreground prose-li:text-[15px]">
              <div dangerouslySetInnerHTML={{ __html: document.content }} />
            </div>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="space-y-6">

            {/* Category */}
            {document.category && (
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Categoría</p>
                <p className="text-[17px] font-bold text-foreground">{document.category.name}</p>
              </div>
            )}

            {/* Excerpt */}
            {document.excerpt && (
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">Resumen</p>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">{document.excerpt}</p>
              </div>
            )}

            {/* Published date card */}
            <div className="border border-border p-6">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Publicado</p>
              <p className="text-[14px] font-semibold text-foreground">
                {new Date(document.published_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Back link */}
            <div className="border border-border p-6">
              <Link to="/documentation" className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Ver toda la documentación
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Back bar ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
        className="border-t border-border bg-muted/10">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 py-10">
          <Link to="/documentation" className="inline-flex items-center gap-2 text-[14px] font-semibold text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver a Documentación
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentationDetailPage;
