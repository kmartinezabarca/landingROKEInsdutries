# Analítica y SEO

## Google Analytics 4 (con consentimiento)

La analítica **solo se carga después de que el usuario acepta cookies**.

### Flujo

1. Al entrar, si hay `VITE_GA_MEASUREMENT_ID` configurado, aparece un **banner
   de cookies** (`src/components/common/CookieConsent.tsx`).
2. La elección (aceptar / rechazar) se guarda en `localStorage`
   (`ConsentContext`).
3. Al **aceptar**, se inyecta gtag.js y se inicializa GA4
   (`src/lib/analytics.ts`).
4. `<Analytics />` dispara un `page_view` en **cada cambio de ruta** (necesario
   en una SPA).

### Configuración

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

- El **Measurement ID** se obtiene en Google Analytics →
  **Admin → Data Streams → (tu stream web)** → `G-XXXXXXXXXX`.
- Si la variable está vacía: no hay banner ni analítica.

### Privacidad

- Nada se carga ni se rastrea hasta el consentimiento explícito.
- El banner enlaza a `/privacy`. Mantén esa página alineada con lo que recoge GA.

---

## SEO

### Por página (cliente)

`src/components/common/Seo.tsx` expone el hook `useSeo({ title, description,
path, image })`, que actualiza **title, description, canonical y Open
Graph/Twitter** mutando las etiquetas existentes (sin duplicar).

Ya aplicado en: Home, Servicios, Hosting, Blog, **detalle de artículo**
(dinámico), Nosotros y Contacto. Para una página nueva:

```tsx
import { useSeo } from '@/components/common/Seo';

const MiPagina = () => {
  useSeo({ title: 'Mi título', description: '...', path: '/mi-ruta' });
  // ...
};
```

### Estáticos

- `public/robots.txt` — permite indexación y apunta al sitemap.
- `public/sitemap.xml` — rutas principales (estático).
- `index.html` — meta base + **JSON-LD `Organization`** (marca, logo, redes,
  contacto) para resultados enriquecidos en Google.

### Configuración

```env
VITE_SITE_URL=https://rokeindustries.com   # sin slash final
```

### ⚠️ Limitación importante (SPA sin SSR)

Los meta **por página** funcionan para **Google** (ejecuta JS al indexar). Pero
los **scrapers sociales** (Facebook, WhatsApp, X al compartir un enlace) **no
ejecutan JS**, así que ven el Open Graph del `index.html` (homepage), no el
específico del artículo.

Para previews sociales por-artículo se necesitaría **prerendering / SSG**
(ej. `vite-plugin-prerender`) o migrar a SSR. Pendiente / opcional.

### Recomendado a futuro

- **Sitemap dinámico** con los artículos del blog (hoy es estático). Idealmente
  servido por el backend en `/sitemap.xml`, o generado en build.
- Verificar el dominio en **Google Search Console** y enviar el sitemap.
