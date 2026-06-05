# Variables de entorno

Solo se documentan las variables que el código **realmente lee**. Todas son
`VITE_*` (Vite las expone en el bundle del navegador → **nunca poner secretos**).

> El `.env` real vive en cada servidor (no en el repo):
> - **dev** (Mac Mini): `/opt/apps/landing-dev/.env.dev`
> - **prod** (Dell): `/opt/apps/landing/.env.production`
>
> Jenkins los carga al construir. Tras editar un `.env`, hay que **redeploy**
> para que el build tome los cambios.

## Referencia

| Variable | Uso | Notas |
|---|---|---|
| `VITE_COMPANY_NAME` | Nombre de la marca | "ROKE" se fuerza a mayúsculas en código |
| `VITE_PHONE` | Contacto: teléfono | |
| `VITE_EMAIL` | Contacto: email | |
| `VITE_WHATSAPP` | Número de WhatsApp | |
| `VITE_ADDRESS` | Dirección | |
| `VITE_FACEBOOK_URL` | Red social (footer) | Se muestra solo si tiene valor |
| `VITE_INSTAGRAM_URL` | Red social (footer) | |
| `VITE_TWITTER_URL` | Red social X/Twitter (footer) | Vacío = no se muestra el ícono |
| `VITE_LINKEDIN_URL` | Red social (footer) | |
| `VITE_YOUTUBE_URL` | Red social (footer) | |
| `VITE_WHATSAPP_MESSAGE` | Mensaje precargado de WhatsApp | |
| `VITE_SITE_URL` | URL pública (canonical/OG) | Sin slash final |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 (`G-XXXX`) | Vacío = sin analítica. Ver analytics-seo.md |
| `VITE_API_BASE_URL` | Base de la API (`.../api`) | En prod/dev apuntar al backend real, no localhost |
| `VITE_API_URL` | Raíz del backend | idem |
| `VITE_GOOGLE_CLIENT_ID` | OAuth Google (login) | Pública por naturaleza |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile (anti-bot) | Site key pública. Ver turnstile.md |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe checkout (`pk_...`) | Publishable (pública) |
| `VITE_APP_VERSION` | (Opcional) versión mostrada | Si se omite, usa la de `package.json` |

## Plantilla

Ver [`.env.example`](../.env.example) en la raíz del repo (es la fuente de
verdad de la plantilla; este archivo solo explica cada variable).

## Importante

- Todo lo `VITE_*` termina en el JavaScript del navegador → **público**. Las
  llaves *secretas* (Turnstile secret, Stripe secret, etc.) van **solo en el
  backend**, nunca aquí.
- Si una variable se deja vacía, el código usa su valor por defecto o
  desactiva la función (p.ej. sin `VITE_GA_MEASUREMENT_ID` no hay analítica).
