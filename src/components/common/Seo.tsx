import React, { useEffect } from 'react';

// URL base del sitio (para canonical/OG). Configurable por entorno.
const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://rokeindustries.com';
const SUFFIX = 'ROKE Industries';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export interface SeoProps {
  /** Título de la página (se le añade "| ROKE Industries"). */
  title?: string;
  description?: string;
  /** Ruta absoluta del sitio, p.ej. "/servicios". */
  path?: string;
  /** Imagen para previews sociales (URL absoluta). */
  image?: string;
}

/**
 * Actualiza title + meta (description, Open Graph, Twitter) y el canonical de
 * la página actual, mutando las etiquetas existentes (no duplica). Pensado
 * para esta SPA. Como es un hook, corre aunque la página tenga returns
 * tempranos (loading/error).
 */
export function useSeo({ title, description, path = '', image }: SeoProps): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const fullTitle = title ? `${title} | ${SUFFIX}` : document.title;
    document.title = fullTitle;

    const url = `${SITE_URL}${path}`;
    upsertCanonical(url);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('property', 'og:url', url);

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }
    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }
  }, [title, description, path, image]);
}

/** Versión componente del hook useSeo (no renderiza nada). */
const Seo: React.FC<SeoProps> = (props) => {
  useSeo(props);
  return null;
};

export default Seo;
