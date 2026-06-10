import { useEffect, useState } from 'react';
import authService from '@/services/authService';

export type UsernameStatus = 'idle' | 'invalid' | 'checking' | 'available' | 'taken';

const USERNAME_RE = /^[a-zA-Z0-9_-]+$/;

/**
 * Verifica en vivo (con debounce) si un username está disponible contra
 * `/auth/username/check`. Devuelve un estado para pintar feedback inmediato
 * sin esperar al submit.
 */
export const useUsernameAvailability = (username: string, debounceMs = 450): UsernameStatus => {
  const [status, setStatus] = useState<UsernameStatus>('idle');

  useEffect(() => {
    const value = username.trim();

    if (!value) {
      setStatus('idle');
      return;
    }
    if (value.length < 3 || !USERNAME_RE.test(value)) {
      setStatus('invalid');
      return;
    }

    setStatus('checking');
    let cancelled = false;
    const handle = setTimeout(async () => {
      try {
        const res = await authService.checkUsername(value);
        if (cancelled) return;
        setStatus((res.data as { available: boolean }).available ? 'available' : 'taken');
      } catch {
        if (!cancelled) setStatus('idle');
      }
    }, debounceMs);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [username, debounceMs]);

  return status;
};
