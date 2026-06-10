import React, { useEffect } from 'react';
import { Check, X, Loader2, AtSign } from 'lucide-react';
import { useUsernameAvailability, type UsernameStatus } from '@/hooks/useUsernameAvailability';

interface Props {
  value: string;
  onChange: (value: string) => void;
  /** Notifica al padre el estado para habilitar/deshabilitar el submit. */
  onStatusChange?: (status: UsernameStatus) => void;
  id?: string;
  placeholder?: string;
  autoFocus?: boolean;
  /** Error de validación externo (react-hook-form). */
  error?: string;
}

const HINTS: Record<UsernameStatus, { text: string; className: string } | null> = {
  idle: null,
  invalid: { text: 'Mínimo 3 caracteres: letras, números, guiones o _', className: 'text-muted-foreground' },
  checking: { text: 'Comprobando disponibilidad…', className: 'text-muted-foreground' },
  available: { text: '¡Disponible!', className: 'text-green-600 dark:text-green-400' },
  taken: { text: 'Ese nombre de usuario ya está en uso', className: 'text-red-500' },
};

/** Input de username con verificación de disponibilidad en vivo. */
export const UsernameInput: React.FC<Props> = ({
  value, onChange, onStatusChange, id = 'username', placeholder = 'juan_garcia', autoFocus, error,
}) => {
  const status = useUsernameAvailability(value);

  useEffect(() => { onStatusChange?.(status); }, [status, onStatusChange]);

  const hint = error
    ? { text: error, className: 'text-red-500' }
    : HINTS[status];

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
        Nombre de usuario
      </label>
      <div className="relative">
        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase().replace(/\s/g, ''))}
          autoFocus={autoFocus}
          autoComplete="username"
          placeholder={placeholder}
          aria-invalid={status === 'taken' || !!error}
          className={`w-full pl-9 pr-10 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 transition ${
            status === 'taken' || error
              ? 'border-red-400 focus:ring-red-400/40'
              : status === 'available'
                ? 'border-green-400 focus:ring-green-400/40'
                : 'border-border focus:ring-primary/40'
          }`}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {status === 'checking' && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
          {status === 'available' && <Check className="w-4 h-4 text-green-500" />}
          {status === 'taken' && <X className="w-4 h-4 text-red-500" />}
        </span>
      </div>
      {hint && <p className={`text-xs mt-1 ${hint.className}`}>{hint.text}</p>}
    </div>
  );
};

export default UsernameInput;
