// Configuración de la aplicación basada en variables de entorno
export const CONFIG = {
  // Branding
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'Roke Industries',
  COMPANY_TAGLINE: import.meta.env.VITE_COMPANY_TAGLINE || 'Soluciones tecnológicas profesionales',
  LOGO_URL: import.meta.env.VITE_LOGO_URL || '/assets/logo.png',

  // Colors
  COLORS: {
    PRIMARY: import.meta.env.VITE_PRIMARY_COLOR || '#2563eb',
    SECONDARY: import.meta.env.VITE_SECONDARY_COLOR || '#7c3aed',
    ACCENT: import.meta.env.VITE_ACCENT_COLOR || '#06b6d4',
  },

  // Contact
  CONTACT: {
    PHONE: import.meta.env.VITE_PHONE || '+1234567890',
    EMAIL: import.meta.env.VITE_EMAIL || 'contact@rokeindustries.com',
    WHATSAPP: import.meta.env.VITE_WHATSAPP || '+1234567890',
    ADDRESS: import.meta.env.VITE_ADDRESS || '123 Tech Street, City, Country',
  },

  // Social Media
  SOCIAL: {
    FACEBOOK: import.meta.env.VITE_FACEBOOK_URL || '',
    TWITTER: import.meta.env.VITE_TWITTER_URL || '',
    LINKEDIN: import.meta.env.VITE_LINKEDIN_URL || '',
    INSTAGRAM: import.meta.env.VITE_INSTAGRAM_URL || '',
  },

  // WhatsApp
  WHATSAPP_MESSAGE: import.meta.env.VITE_WHATSAPP_MESSAGE || 
    'Hola, me interesa conocer más sobre los servicios de Roke Industries. ¿Podrían proporcionarme información detallada?',
};

// URLs y rutas
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  HOSTING: '/hosting',
  BLOG: '/blog',
  CONTACT: '/contact',
};

// Configuración de animaciones
export const ANIMATIONS = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
  },
  EASING: {
    EASE_OUT: [0.0, 0.0, 0.2, 1],
    EASE_IN_OUT: [0.4, 0.0, 0.2, 1],
  },
};

