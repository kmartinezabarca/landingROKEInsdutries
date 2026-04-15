import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

/**
 * Configuración de internacionalización (i18n).
 * - Detecta el idioma del navegador automáticamente
 * - Carga las traducciones desde /public/locales/{lang}/{ns}.json
 * - Fallback a español si el idioma no está disponible
 */
i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    defaultNS: 'common',
    ns: ['common', 'nav', 'contact', 'blog', 'hosting', 'errors', 'hero', 'about', 'services', 'team', 'footer'],

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'roke_language',
    },

    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;

/** Idiomas disponibles con sus etiquetas para mostrar en UI */
export const SUPPORTED_LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇲🇽' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
] as const;

export type SupportedLang = (typeof SUPPORTED_LANGUAGES)[number]['code'];
