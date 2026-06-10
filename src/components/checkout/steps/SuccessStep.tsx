import React, { useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { PANEL_URL } from '@/utils/constants/config';

const COUNTDOWN = 8;

interface Props {
  invoiceNumber: string;
  total: number;
  onClose: () => void;
}

export const SuccessStep: React.FC<Props> = ({ invoiceNumber, total, onClose }) => {
  const [seconds, setSeconds] = useState(COUNTDOWN);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(interval);
          window.location.href = PANEL_URL;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const goNow = () => { window.location.href = PANEL_URL; };

  return (
    <div className="flex flex-col items-center text-center py-4 gap-6">
      {/* Icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-foreground">¡Servicio contratado!</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Tu pago fue procesado exitosamente. En breve tu servicio estará activo.
        </p>
      </div>

      {/* Invoice info */}
      {invoiceNumber !== '—' && (
        <div className="w-full rounded-xl bg-muted/40 border border-border p-4 text-left">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Folio</span>
            <span className="font-medium text-foreground">{invoiceNumber}</span>
          </div>
          {total > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total cobrado</span>
              <span className="font-semibold text-foreground">${total.toFixed(2)} MXN</span>
            </div>
          )}
        </div>
      )}

      {/* Redirect */}
      <div className="w-full space-y-3">
        <button
          onClick={goNow}
          className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition flex items-center justify-center gap-2"
        >
          Ir a mi panel ahora
          <ExternalLink className="w-4 h-4" />
        </button>

        <p className="text-xs text-muted-foreground">
          Serás redirigido automáticamente en{' '}
          <span className="font-semibold text-foreground tabular-nums">{seconds}s</span>
        </p>

        <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground transition underline">
          Cerrar y permanecer en la página
        </button>
      </div>
    </div>
  );
};
