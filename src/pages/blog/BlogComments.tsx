import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, Loader2, CheckCircle2 } from 'lucide-react';
import Turnstile, { type TurnstileHandle } from '@/components/common/Turnstile';
import { getBlogComments, postBlogComment, type BlogComment } from '@/services/blogService';
import { formatDate, getInitials } from '@/pages/blog/blogUtils';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/lib/toast';

interface BlogCommentsProps {
  slug: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--roke-bg)',
  border: '1px solid var(--roke-border)',
  color: 'var(--roke-text)',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  fontFamily: '"JetBrains Mono", monospace',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--roke-text-dimmer)',
  marginBottom: 8,
};

const BlogComments: React.FC<BlogCommentsProps> = ({ slug }) => {
  const { isDark } = useTheme();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [token, setToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const turnstileRef = useRef<TurnstileHandle>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getBlogComments(slug)
      .then((res) => {
        if (!cancelled) setComments(res.data || []);
      })
      .catch(() => {
        if (!cancelled) setComments([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setContent('');
    setWebsite('');
    setToken(null);
    turnstileRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return; // bot atrapado por el honeypot
    if (!name.trim() || !email.trim() || content.trim().length < 3) {
      toast.error('Completa tu nombre, correo y un comentario válido.');
      return;
    }
    if (!token) {
      toast.error('Completa la verificación anti-bot.');
      return;
    }

    setSubmitting(true);
    try {
      await postBlogComment(
        slug,
        { author_name: name.trim(), author_email: email.trim(), content: content.trim() },
        token
      );
      setSent(true);
      resetForm();
      toast.success('¡Gracias! Tu comentario se publicará tras ser revisado.');
      setTimeout(() => setSent(false), 6000);
    } catch {
      toast.error('No se pudo enviar el comentario. Intenta de nuevo.');
      setToken(null);
      turnstileRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: 56, borderTop: '1px solid var(--roke-border)', paddingTop: 48 }}>
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 11,
          fontFamily: '"JetBrains Mono", monospace',
          color: 'var(--roke-text-dimmer)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Comentarios
        {comments.length > 0 && <span>· {comments.length}</span>}
      </div>
      <h3
        style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--roke-text)',
          margin: '0 0 32px',
        }}
      >
        Únete a la conversación.
      </h3>

      {/* Comment list */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--roke-text-dimmer)', fontSize: 13, marginBottom: 40 }}>
          <Loader2 className="w-4 h-4 animate-spin" /> Cargando comentarios…
        </div>
      ) : comments.length === 0 ? (
        <p style={{ color: 'var(--roke-text-dimmer)', fontSize: 14, marginBottom: 40 }}>
          Aún no hay comentarios. Sé el primero en comentar.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48, borderTop: '1px solid var(--roke-border)' }}>
          {comments.map((c) => (
            <div
              key={c.uuid}
              style={{
                display: 'flex',
                gap: 16,
                padding: '24px 0',
                borderBottom: '1px solid var(--roke-border)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: 'var(--roke-border-stronger)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--roke-text)',
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                {getInitials(c.authorName)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--roke-text)' }}>{c.authorName}</span>
                  <span style={{ fontSize: 11, color: 'var(--roke-text-dimmer)', fontFamily: '"JetBrains Mono", monospace' }}>
                    {formatDate(c.createdAt)}
                  </span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--roke-text-dim)', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <div style={{ border: '1px solid var(--roke-border)', background: 'var(--roke-surface)', padding: 32 }}>
        <div style={{ ...labelStyle, marginBottom: 4 }}>Deja tu comentario</div>
        <p style={{ fontSize: 12.5, color: 'var(--roke-text-dimmer)', margin: '0 0 24px' }}>
          No necesitas crear una cuenta. Tu correo no se publica y tu comentario aparecerá tras ser revisado.
        </p>

        {sent && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              marginBottom: 20,
              border: '1px solid rgba(34,197,94,0.3)',
              background: 'rgba(34,197,94,0.08)',
              color: '#22c55e',
              fontSize: 13,
            }}
          >
            <CheckCircle2 className="w-4 h-4" />
            Recibimos tu comentario. Se publicará una vez aprobado.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle} htmlFor="comment-name">Nombre</label>
              <input
                id="comment-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={120}
                placeholder="Tu nombre"
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="comment-email">Correo (privado)</label>
              <input
                id="comment-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                placeholder="tu@correo.com"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle} htmlFor="comment-content">Comentario</label>
            <textarea
              id="comment-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={3000}
              rows={4}
              placeholder="Escribe tu comentario…"
              style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }}
              required
            />
          </div>

          {/* Honeypot: oculto para humanos, tentador para bots. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />

          <div style={{ marginBottom: 20 }}>
            <Turnstile
              ref={turnstileRef}
              theme={isDark ? 'dark' : 'light'}
              onVerify={setToken}
              onExpire={() => setToken(null)}
              onError={() => setToken(null)}
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !token}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              border: 'none',
              background: 'var(--roke-primary-bg)',
              color: 'var(--roke-primary-fg)',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: submitting || !token ? 'not-allowed' : 'pointer',
              opacity: submitting || !token ? 0.6 : 1,
              fontFamily: 'inherit',
            }}
          >
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando…</> : <><Send className="w-4 h-4" /> Publicar comentario</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogComments;
