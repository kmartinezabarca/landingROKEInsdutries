import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from '../../utils/constants/config';

interface SEOProps {
  /** Título de la página — se concatena con el nombre de la empresa */
  title?: string;
  /** Descripción para motores de búsqueda (máx. 160 caracteres) */
  description?: string;
  /** URL canónica de la página */
  canonical?: string;
  /** URL de la imagen para Open Graph / Twitter Cards */
  image?: string;
  /** Tipo de Open Graph (default: "website") */
  ogType?: 'website' | 'article' | 'product';
  /** Palabras clave adicionales */
  keywords?: string;
  /** Si true, indica a los bots que no indexen la página */
  noIndex?: boolean;
}

const DEFAULT_DESCRIPTION =
  'ROKE Industries — Soluciones tecnológicas profesionales: hosting web, servidores gaming, cloud, desarrollo de software a la medida y más.';

const DEFAULT_KEYWORDS =
  'hosting web, servidores gaming, cloud hosting, desarrollo web, software a la medida, Mexico';

const DEFAULT_IMAGE = '/assets/images/og-image.jpg';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://rokeindustries.com';

const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  ogType = 'website',
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
}) => {
  const fullTitle = title
    ? `${title} | ${CONFIG.COMPANY_NAME}`
    : `${CONFIG.COMPANY_NAME} — ${CONFIG.COMPANY_TAGLINE}`;

  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      {/* Básico */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={CONFIG.COMPANY_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Idioma */}
      <html lang="es" />
    </Helmet>
  );
};

export default SEO;
