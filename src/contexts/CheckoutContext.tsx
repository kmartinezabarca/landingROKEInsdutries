import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CheckoutPlan {
  id: number;
  uuid?: string;
  slug: string;
  name: string;
  description: string;
  basePrice: string | number;
  isPopular?: boolean;
  features?: any[];
  category?: { slug: string; name: string };
}

export interface CheckoutBillingCycle {
  id: number;
  slug: string;
  name: string;
  discount_percentage: string | number;
}

interface CheckoutContextValue {
  isOpen: boolean;
  plan: CheckoutPlan | null;
  billingCycle: CheckoutBillingCycle | null;
  openCheckout: (plan: CheckoutPlan, billingCycle?: CheckoutBillingCycle | null) => void;
  closeCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen]           = useState(false);
  const [plan, setPlan]               = useState<CheckoutPlan | null>(null);
  const [billingCycle, setBillingCycle] = useState<CheckoutBillingCycle | null>(null);

  const openCheckout = useCallback((p: CheckoutPlan, bc?: CheckoutBillingCycle | null) => {
    setPlan(p);
    setBillingCycle(bc ?? null);
    setIsOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsOpen(false);
    // reset plan/cycle after close animation
    setTimeout(() => { setPlan(null); setBillingCycle(null); }, 300);
  }, []);

  return (
    <CheckoutContext.Provider value={{ isOpen, plan, billingCycle, openCheckout, closeCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be inside CheckoutProvider');
  return ctx;
};
