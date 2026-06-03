import React, { useRef, useState } from "react";
import { Mail } from "lucide-react";
import Turnstile, { type TurnstileHandle } from "@/components/common/Turnstile";
import { subscribeNewsletter } from "@/services/newsletterService";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/lib/toast";

const NewsletterBand: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const { isDark } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) return;
    setLoading(true);
    try {
      await subscribeNewsletter(email, token);
      setSent(true);
      setEmail('');
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast.error('No se pudo completar la suscripción. Intenta de nuevo.');
    } finally {
      setLoading(false);
      setToken(null);
      turnstileRef.current?.reset();
    }
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
            disabled={loading || !token}
            className="flex items-center gap-2 font-semibold text-[13.5px] tracking-[0.02em] cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ padding: '14px 22px', background: 'var(--roke-primary-bg)', color: 'var(--roke-primary-fg)', fontFamily: 'inherit' }}
          >
            {sent ? '¡Enviado!' : loading ? 'Enviando…' : <><Mail className="w-3.5 h-3.5" /> Suscribirme</>}
          </button>
        </div>

        <Turnstile
          ref={turnstileRef}
          theme={isDark ? 'dark' : 'light'}
          onVerify={setToken}
          onExpire={() => setToken(null)}
          onError={() => setToken(null)}
        />
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

export default NewsletterBand;
