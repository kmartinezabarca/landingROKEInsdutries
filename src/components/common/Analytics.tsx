import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useConsent } from '@/contexts/ConsentContext';
import { loadAnalytics, trackPageView, isAnalyticsConfigured } from '@/lib/analytics';

/**
 * Carga GA4 una vez que el usuario acepta cookies y registra un page_view en
 * cada cambio de ruta. No renderiza nada.
 */
const Analytics: React.FC = () => {
  const { consent } = useConsent();
  const location = useLocation();

  useEffect(() => {
    if (consent === 'granted' && isAnalyticsConfigured) loadAnalytics();
  }, [consent]);

  useEffect(() => {
    if (consent === 'granted') trackPageView(location.pathname + location.search);
  }, [consent, location.pathname, location.search]);

  return null;
};

export default Analytics;
