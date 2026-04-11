import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

/**
 * Hook que registra automáticamente una vista de página en GA4
 * cada vez que el usuario navega a una ruta diferente.
 *
 * Uso: llamar una sola vez en App.jsx dentro del Router.
 */
export const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
};
