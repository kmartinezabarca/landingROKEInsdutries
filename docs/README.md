# Documentación — ROKE Industries Landing

Guías operativas del frontend (React + Vite + TailwindCSS).

## Índice

- [environment.md](./environment.md) — Variables de entorno (`.env`) que el código usa, y dónde van en cada servidor.
- [turnstile.md](./turnstile.md) — Anti-bot (Cloudflare Turnstile) en los formularios de contacto y newsletter, cómo obtener las llaves y el **prompt para el backend**.
- [analytics-seo.md](./analytics-seo.md) — Google Analytics 4 con banner de consentimiento, y SEO (meta por página, sitemap, robots, JSON-LD).

## Calidad / CI

El proyecto gatea en estos comandos (los corre Jenkins en cada deploy):

```bash
pnpm typecheck   # tsc --noEmit  (0 errores)
pnpm lint        # eslint (0 errores; máx 20 warnings)
pnpm build       # tsc --noEmit && vite build
pnpm test:smoke  # render smoke test sin navegador (vite-node + jsdom)
```

## Versionado

- La versión se muestra siempre en pantalla (badge abajo-izquierda) vía `src/components/common/VersionBadge.tsx`.
- En CI (Jenkins) se calcula automáticamente por **Conventional Commits**:
  `feat:` → minor, `fix:` → patch, `feat!:`/`BREAKING CHANGE` → major.
  Ver `scripts/auto-version.sh`, `scripts/apply-version.sh`, `scripts/release-tag.sh`.

## Ramas / deploy

- `develop` → entorno **dev** (Mac Mini).
- `master` → **producción** (Dell). Solo producción publica el tag de versión.
