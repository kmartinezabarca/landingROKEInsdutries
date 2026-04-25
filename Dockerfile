# ============================================
# Stage 1: Build
# ============================================
FROM node:22-alpine AS builder

RUN apk add --no-cache git openssh docker-cli bash curl
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

COPY . .

# Variables por entorno
ARG VITE_API_URL
ARG VITE_APP_ENV
ARG VITE_APP_TITLE="Roke Industries"
ARG VITE_APP_DESCRIPTION="Desarrollo de Software · Hosting · Game Servers · Impresión 3D"

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_APP_TITLE=$VITE_APP_TITLE
ENV VITE_APP_DESCRIPTION=$VITE_APP_DESCRIPTION

RUN pnpm run build

# ============================================
# Stage 2: Producción con Nginx
# ============================================
FROM nginx:alpine AS production

# Copiar configuración Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar build
COPY --from=builder /app/dist /usr/share/nginx/html

# Usuario no-root por seguridad
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]