# Anti-bot — Cloudflare Turnstile

Protege los formularios públicos (**contacto** y **suscripción al newsletter**)
contra bots. El frontend ya está integrado; **la verificación real ocurre en el
backend**.

## Cómo funciona

1. El widget de Turnstile genera un **token** en el navegador.
2. El formulario envía ese token al backend en el campo `cf-turnstile-response`.
3. El backend verifica el token contra Cloudflare (`siteverify`) usando la
   **secret key**. Si no es válido, rechaza la petición.

> Sin el paso 3, el captcha es decorativo: un bot puede ignorar el JS.

## Frontend (ya implementado)

- Componente reutilizable: `src/components/common/Turnstile.tsx`.
- Servicios: `src/services/contactService.ts` (`POST /contact`) y
  `src/services/newsletterService.ts` (`POST /newsletter/subscribe`). Ambos
  envían el token como `cf-turnstile-response`.
- Formularios: `src/pages/ContactPage.tsx` y `src/pages/blog/NewsletterBand.tsx`
  bloquean el envío hasta que el captcha se resuelve, y resetean el token tras
  cada intento (es de un solo uso).
- Config: `VITE_TURNSTILE_SITE_KEY`. Si está vacía, en dev se usa la **clave de
  prueba** de Cloudflare (siempre aprueba), así el widget funciona sin setup.

## Cómo obtener las llaves

1. Entra a <https://dash.cloudflare.com> (cuenta gratis; no requiere migrar DNS).
2. Menú lateral → **Turnstile** → **Add widget**.
3. Hostnames a registrar: `rokeindustries.com`, `rokeindustries.com.mx`,
   `rokeindustries.dev`, `localhost`, `127.0.0.1`.
4. Widget Mode: **Managed**.
5. Al crear obtienes:
   - **Site Key** (pública) → frontend: `VITE_TURNSTILE_SITE_KEY`.
   - **Secret Key** (privada) → backend: `TURNSTILE_SECRET_KEY` (**nunca** en el front ni en git).

Claves de **prueba** de Cloudflare (siempre aprueban, para dev):
`site=1x00000000000000000000AA`, `secret=1x0000000000000000000000000000000AA`.

---

## Prompt para el agente de backend (Laravel)

Copia/pega lo siguiente a tu agente de backend:

> # Tarea: verificar Cloudflare Turnstile en contacto y newsletter (Laravel)
>
> Contexto: API Laravel consumida por una SPA con Axios `withCredentials` y CSRF
> de Sanctum. El frontend ya envía el token en `cf-turnstile-response`. Falta
> toda la parte de servidor.
>
> ## 1. Config
> - `.env`: `TURNSTILE_SECRET_KEY=...` (secret del widget; nunca exponer).
> - `config/services.php`:
>   ```php
>   'turnstile' => ['secret' => env('TURNSTILE_SECRET_KEY')],
>   ```
>
> ## 2. Verificación reutilizable
> Crear una Validation Rule (`App\Rules\TurnstileToken`) que:
> - Tome `cf-turnstile-response`.
> - Haga `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` con el
>   `Http` client de Laravel: `['secret' => config('services.turnstile.secret'),
>   'response' => $token, 'remoteip' => $request->ip()]`.
> - Sea válida solo si la respuesta trae `success === true`.
> - Trate timeouts/errores de red como fallo. Mensaje: "Verificación anti-bot
>   fallida, recarga e intenta de nuevo."
>
> ## 3. Endpoints (routes/api.php)
> ### POST /api/contact
> ```json
> { "name":"req", "email":"req email", "phone":"opc", "company":"opc",
>   "service":"opc (etiqueta libre)", "message":"req min 10",
>   "cf-turnstile-response":"req -> TurnstileToken" }
> ```
> - Validar + token. Persistir (`contact_requests`) y/o notificar por correo.
> - Responder 200/201 `{ "success": true, "message": "..." }`.
>
> ### POST /api/newsletter/subscribe
> ```json
> { "email":"req email", "cf-turnstile-response":"req -> TurnstileToken" }
> ```
> - Validar + token. Alta idempotente (si ya existe, éxito sin duplicar).
> - Responder 200 `{ "success": true }`.
>
> ## 4. Respuestas esperadas por el front
> - Éxito: HTTP 2xx.
> - Error/token inválido: HTTP 422 estándar de Laravel
>   (`{ "message": "...", "errors": { "cf-turnstile-response": ["..."] } }`).
>
> ## 5. Extras
> - `throttle:10,1` por IP en ambas rutas.
> - Mismo grupo de middleware/CSRF (Sanctum) que el resto de la API.
> - Normalizar email (trim + minúsculas). Honeypot opcional.
>
> Entregar: migración(es), modelo(s), Rule, controladores, rutas, config en
> services.php y `.env.example` del backend con `TURNSTILE_SECRET_KEY=`.

## Notas

- El frontend pega contra `VITE_API_BASE_URL` (que ya termina en `/api`), por
  eso las rutas son `/api/contact` y `/api/newsletter/subscribe`.
- Cloudflare valida que el **hostname** del request coincida con los
  registrados en el widget; por eso hay que incluir prod, dev y local.
