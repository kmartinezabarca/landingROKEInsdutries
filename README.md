# Roke Industries - Landing Page

Una landing page profesional y completamente personalizable desarrollada con React, Tailwind CSS y arquitectura limpia. Diseñada específicamente para empresas de tecnología, hosting y servicios gaming.

## 🚀 Características Principales

- **Diseño Moderno y Minimalista**: Interfaz limpia y profesional
- **Modo Oscuro/Claro**: Cambio automático según preferencias del usuario
- **Completamente Responsive**: Optimizado para desktop, tablet y móvil
- **Arquitectura Limpia**: Código organizado y mantenible
- **Personalización Fácil**: Configurable mediante archivo `.env`
- **Integración WhatsApp**: Contacto directo con mensajes personalizados
- **SEO Optimizado**: Meta tags y estructura semántica
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Formularios Validados**: Validación en tiempo real
- **Blog Integrado**: Sistema de blog con filtros por categorías

## 📋 Secciones Incluidas

- **Hero Section**: Presentación principal con CTAs
- **Servicios**: Catálogo completo de servicios
- **Hosting & Gaming**: Planes detallados con precios
- **Equipo**: Presentación del equipo profesional
- **Historia**: Timeline de la empresa
- **Blog**: Artículos y noticias
- **Contacto**: Formulario completo y información
- **Footer**: Enlaces organizados y redes sociales

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework principal
- **Tailwind CSS**: Estilos y diseño responsive
- **Framer Motion**: Animaciones y transiciones
- **Lucide React**: Iconografía moderna
- **React Router**: Navegación SPA
- **Vite**: Build tool y desarrollo

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone [repository-url]
cd roke-industries-landing

# Instalar dependencias
npm install
# o
pnpm install

# Iniciar servidor de desarrollo
npm run dev
# o
pnpm run dev
```

### Configuración del Entorno

1. Copia el archivo `.env` y personalízalo según tus necesidades
2. Modifica las variables según tu empresa
3. Reinicia el servidor de desarrollo

## 🎨 Personalización Completa

### Información de la Empresa

```env
VITE_COMPANY_NAME=Tu Empresa
VITE_COMPANY_TAGLINE=Tu eslogan
VITE_COMPANY_DESCRIPTION=Descripción de tu empresa
```

### Colores del Tema

```env
VITE_PRIMARY_COLOR=#tu-color-principal
VITE_SECONDARY_COLOR=#tu-color-secundario
VITE_ACCENT_COLOR=#tu-color-acento
```

### Información de Contacto

```env
VITE_PHONE=+1 234 567 8900
VITE_EMAIL=contacto@tuempresa.com
VITE_WHATSAPP=+1234567890
VITE_ADDRESS=Tu dirección completa
```

### Redes Sociales

```env
VITE_FACEBOOK_URL=https://facebook.com/tuempresa
VITE_TWITTER_URL=https://twitter.com/tuempresa
VITE_LINKEDIN_URL=https://linkedin.com/company/tuempresa
VITE_INSTAGRAM_URL=https://instagram.com/tuempresa
```

### Logos y Branding

1. Coloca tus logos en la carpeta `public/assets/`
2. Actualiza las rutas en el archivo `.env`:

```env
VITE_LOGO_URL=/assets/tu-logo.png
VITE_LOGO_LIGHT_URL=/assets/tu-logo-claro.png
VITE_LOGO_DARK_URL=/assets/tu-logo-oscuro.png
```

### Textos Personalizables

Todos los textos principales pueden personalizarse:

```env
VITE_HERO_TITLE=Tu Título Principal
VITE_HERO_SUBTITLE=Tu Subtítulo
VITE_HERO_DESCRIPTION=Tu descripción principal
VITE_SERVICES_TITLE=Título de Servicios
VITE_TEAM_TITLE=Título del Equipo
```

## 📱 Integración WhatsApp

### Configuración Básica

```env
VITE_WHATSAPP=+1234567890
VITE_WHATSAPP_MESSAGE=Tu mensaje personalizado
```

### Mensajes Personalizados

El sistema incluye mensajes predefinidos para diferentes servicios:
- Hosting web
- Servidores gaming
- Cloud hosting
- Desarrollo web
- Seguridad web
- Soporte técnico

## 🎯 Funcionalidades Avanzadas

### Habilitar/Deshabilitar Secciones

```env
VITE_ENABLE_BLOG=true
VITE_ENABLE_TEAM_SECTION=true
VITE_ENABLE_TESTIMONIALS=true
VITE_ENABLE_NEWSLETTER=true
```

### SEO y Metadata

```env
VITE_SITE_TITLE=Título para SEO
VITE_SITE_DESCRIPTION=Descripción para motores de búsqueda
VITE_SITE_KEYWORDS=palabras,clave,separadas,por,comas
```

### Analytics

```env
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
VITE_FACEBOOK_PIXEL_ID=tu-pixel-id
```

## 🚀 Despliegue

### Build de Producción

```bash
npm run build
# o
pnpm run build
```

### Despliegue en Vercel

1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno en el dashboard
3. Despliega automáticamente

### Despliegue en Netlify

1. Conecta tu repositorio con Netlify
2. Configura las variables de entorno
3. Despliega automáticamente

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes base
│   ├── layout/         # Layout y navegación
│   └── sections/       # Secciones de página
├── contexts/           # Contextos de React
├── pages/              # Páginas principales
├── services/           # Servicios y APIs
├── utils/              # Utilidades y constantes
└── assets/             # Imágenes y recursos
```

## 🎨 Personalización de Estilos

### Colores Personalizados

Los colores se definen en el archivo `.env` y se aplican automáticamente mediante CSS custom properties.

### Tipografía

La tipografía utiliza la familia Inter por defecto, optimizada para legibilidad web.

### Componentes

Todos los componentes están construidos con Tailwind CSS y son completamente personalizables.

## 📞 Soporte y Contacto

Para soporte técnico o consultas sobre personalización:

- **Email**: support@rokeindustries.com
- **WhatsApp**: +1 234 567 8900
- **Documentación**: [Enlace a documentación]

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Changelog

### v1.0.0
- Lanzamiento inicial
- Todas las funcionalidades principales
- Sistema de personalización completo
- Integración WhatsApp
- Modo oscuro/claro
- Responsive design

---

**Desarrollado con ❤️ por Roke Industries**

