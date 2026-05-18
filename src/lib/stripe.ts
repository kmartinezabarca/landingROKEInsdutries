import { loadStripe } from '@stripe/stripe-js';

const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const isStripeConfigured = typeof key === 'string' && key.trim().length > 0;
export const stripePromise = isStripeConfigured ? loadStripe(key) : null;
