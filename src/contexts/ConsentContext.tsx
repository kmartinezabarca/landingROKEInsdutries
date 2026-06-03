import React, { createContext, useContext, useState } from 'react';

type Consent = 'unknown' | 'granted' | 'denied';
const STORAGE_KEY = 'cookie-consent';

interface ConsentValue {
  consent: Consent;
  accept: () => void;
  reject: () => void;
}

const ConsentContext = createContext<ConsentValue | undefined>(undefined);

export const useConsent = (): ConsentValue => {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent debe usarse dentro de ConsentProvider');
  return ctx;
};

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<Consent>(() => {
    if (typeof localStorage === 'undefined') return 'unknown';
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'granted' || saved === 'denied' ? saved : 'unknown';
  });

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch { /* noop */ }
    setConsent('granted');
  };
  const reject = () => {
    try { localStorage.setItem(STORAGE_KEY, 'denied'); } catch { /* noop */ }
    setConsent('denied');
  };

  return (
    <ConsentContext.Provider value={{ consent, accept, reject }}>
      {children}
    </ConsentContext.Provider>
  );
};
