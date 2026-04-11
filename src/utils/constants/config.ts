/**
 * Configuración global de la aplicación basada en variables de entorno.
 * Todas las variables públicas deben empezar con VITE_
 */

export interface AppConfig {
  COMPANY_NAME: string;
  COMPANY_TAGLINE: string;
  LOGO_URL: string;
  COLORS: {
    PRIMARY: string;
    SECONDARY: string;
    ACCENT: string;
  };
  CONTACT: {
    PHONE: string;
    EMAIL: string;
    WHATSAPP: string;
    ADDRESS: string;
  };
  SOCIAL: {
    FACEBOOK: string;
    TWITTER: string;
    LINKEDIN: string;
    INSTAGRAM: string;
    YOUTUBE: string;
  };
  WHATSAPP_MESSAGE: string;
}

export const CONFIG: AppConfig = {
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'Roke Industries',
  COMPANY_TAGLINE:
    import.meta.env.VITE_COMPANY_TAGLINE || 'Soluciones tecnológicas profesionales',
  LOGO_URL: import.meta.env.VITE_LOGO_URL || '/assets/logo.png',

  COLORS: {
    PRIMARY: import.meta.env.VITE_PRIMARY_COLOR || '#2563eb',
    SECONDARY: import.meta.env.VITE_SECONDARY_COLOR || '#7c3aed',
    ACCENT: import.meta.env.VITE_ACCENT_COLOR || '#06b6d4',
  },

  CONTACT: {
    PHONE: import.meta.env.VITE_PHONE || '+1234567890',
    EMAIL: import.meta.env.VITE_EMAIL || 'contact@rokeindustries.com',
    WHATSAPP: import.meta.env.VITE_WHATSAPP || '+1234567890',
    ADDRESS: import.meta.env.VITE_ADDRESS || '123 Tech Street, City, Country',
  },

  SOCIAL: {
    FACEBOOK: import.meta.env.VITE_FACEBOOK_URL || '',
    TWITTER: import.meta.env.VITE_TWITTER_URL || '',
    LINKEDIN: import.meta.env.VITE_LINKEDIN_URL || '',
    INSTAGRAM: import.meta.env.VITE_INSTAGRAM_URL || '',
    YOUTUBE: import.meta.env.VITE_YOUTUBE_URL || '',
  },

  WHATSAPP_MESSAGE:
    import.meta.env.VITE_WHATSAPP_MESSAGE ||
    'Hola, me interesa conocer más sobre los servicios de Roke Industries. ¿Podrían proporcionarme información detallada?',
};

export interface AppRoutes {
  HOME: string;
  ABOUT: string;
  SERVICES: string;
  HOSTING: string;
  BLOG: string;
  CONTACT: string;
}

export const ROUTES: AppRoutes = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  HOSTING: '/hosting',
  BLOG: '/blog',
  CONTACT: '/contact',
};

export const ANIMATIONS = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
  },
  EASING: {
    EASE_OUT: [0.0, 0.0, 0.2, 1] as const,
    EASE_IN_OUT: [0.4, 0.0, 0.2, 1] as const,
  },
} as const;
