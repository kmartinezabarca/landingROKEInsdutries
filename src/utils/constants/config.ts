interface AppConfig {
  COMPANY_NAME: string;
  CONTACT: { PHONE: string; EMAIL: string; WHATSAPP: string; ADDRESS: string };
  SOCIAL: { TWITTER: string; LINKEDIN: string; GITHUB: string; DISCORD: string };
  WHATSAPP_MESSAGE: string;
}

export const CONFIG: AppConfig = {
  // "ROKE" siempre en mayúsculas, sin importar lo que traiga el .env del servidor.
  COMPANY_NAME: (import.meta.env.VITE_COMPANY_NAME || 'ROKE Industries').replace(/roke/gi, 'ROKE'),
  CONTACT: {
    PHONE: import.meta.env.VITE_PHONE || '+1234567890',
    EMAIL: import.meta.env.VITE_EMAIL || 'contact@rokeindustries.com',
    WHATSAPP: import.meta.env.VITE_WHATSAPP || '+1234567890',
    ADDRESS: import.meta.env.VITE_ADDRESS || '123 Tech Street, City, Country',
  },
  SOCIAL: {
    TWITTER: import.meta.env.VITE_TWITTER_URL || '',
    LINKEDIN: import.meta.env.VITE_LINKEDIN_URL || '',
    GITHUB: import.meta.env.VITE_GITHUB_URL || '',
    DISCORD: import.meta.env.VITE_DISCORD_URL || '',
  },
  WHATSAPP_MESSAGE: import.meta.env.VITE_WHATSAPP_MESSAGE ||
    'Hola, me interesa conocer más sobre los servicios de ROKE Industries. ¿Podrían proporcionarme información detallada?',
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  HOSTING: '/hosting',
  BLOG: '/blog',
  CONTACT: '/contact',
} as const;

export const ANIMATIONS = {
  DURATION: { FAST: 0.2, NORMAL: 0.3, SLOW: 0.5 },
  EASING: {
    EASE_OUT: [0.0, 0.0, 0.2, 1],
    EASE_IN_OUT: [0.4, 0.0, 0.2, 1],
  },
} as const;
