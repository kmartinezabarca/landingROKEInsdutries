import React, { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { toast } from '@/lib/toast';
import authService from '@/services/authService';
import { useAuthContext } from '@/contexts/AuthContext';
import UsernameInput from '@/components/checkout/UsernameInput';
import type { UsernameStatus } from '@/hooks/useUsernameAvailability';

export interface UsernamePreview {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string | null;
}

interface Props {
  /** Si viene de un usuario nuevo de Google, trae el setup_token + preview. */
  setupToken?: string;
  preview?: UsernamePreview | null;
  onComplete: () => void;
}

/**
 * Paso para elegir nombre de usuario. Cubre dos casos:
 *  • Usuario nuevo de Google (setupToken presente) → crea la cuenta vía
 *    /auth/complete-profile y guarda el token.
 *  • Usuario ya autenticado sin username → /auth/setup-username.
 */
export const UsernameStep: React.FC<Props> = ({ setupToken, preview, onComplete }) => {
  const { setAuth, user } = useAuthContext();
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<UsernameStatus>('idle');
  const [loading, setLoading] = useState(false);

  const displayName = preview
    ? `${preview.first_name} ${preview.last_name}`.trim()
    : user
      ? `${user.first_name} ${user.last_name}`.trim()
      : '';
  const email = preview?.email ?? user?.email ?? '';
  const avatar = preview?.avatar_url ?? user?.avatar_url ?? null;
  const initials = displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  const canSubmit = status === 'available' && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'taken') { toast.error('Ese nombre de usuario ya está en uso.'); return; }
    if (username.trim().length < 3) { toast.error('Elige un nombre de usuario válido.'); return; }

    setLoading(true);
    try {
      if (setupToken) {
        // Usuario nuevo de Google → crea la cuenta ahora.
        const res = await authService.completeGoogleProfile(setupToken, username.trim());
        const body = res.data as { access_token: string; user: any };
        if (!body.access_token) throw new Error('Sin token');
        setAuth(body.access_token, body.user);
        toast.success(`¡Bienvenido, ${body.user.first_name}!`);
      } else {
        // Usuario autenticado sin username.
        const res = await authService.setupUsername(username.trim());
        const body = res.data as { user: any };
        if (body.user) {
          const token = localStorage.getItem('roke_token') || '';
          setAuth(token, body.user);
        }
        toast.success('Nombre de usuario configurado.');
      }
      onComplete();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'No se pudo guardar el nombre de usuario.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Identidad de Google */}
      {(displayName || email) && (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 p-4">
          {avatar ? (
            <img src={avatar} alt={displayName} className="w-11 h-11 rounded-full object-cover" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
              {initials || '?'}
            </div>
          )}
          <div className="min-w-0">
            {displayName && <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>}
            {email && <p className="text-xs text-muted-foreground truncate">{email}</p>}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Elige un nombre de usuario para terminar de crear tu cuenta. Lo usarás para identificarte en tu panel.
        </p>
        <UsernameInput
          value={username}
          onChange={setUsername}
          onStatusChange={setStatus}
          autoFocus
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        {loading ? 'Guardando…' : 'Continuar'}
      </button>
    </form>
  );
};
