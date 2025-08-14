# Guía de Personalización - Roke Industries Landing Page

Esta guía te ayudará a personalizar completamente tu landing page sin necesidad de conocimientos técnicos avanzados.

## 🎨 Personalización de Colores

### Colores Principales

Los colores se definen en formato hexadecimal en el archivo `.env`:

```env
# Color principal (botones, enlaces, elementos destacados)
VITE_PRIMARY_COLOR=#2563eb

# Color secundario (elementos de apoyo)
VITE_SECONDARY_COLOR=#7c3aed

# Color de acento (elementos especiales)
VITE_ACCENT_COLOR=#06b6d4
```

### Paleta de Colores Recomendada

#### Tecnología/Corporativo
```env
VITE_PRIMARY_COLOR=#2563eb    # Azul profesional
VITE_SECONDARY_COLOR=#1e40af  # Azul oscuro
VITE_ACCENT_COLOR=#06b6d4     # Cian
```

#### Gaming/Entretenimiento
```env
VITE_PRIMARY_COLOR=#7c3aed    # Púrpura vibrante
VITE_SECONDARY_COLOR=#a855f7  # Púrpura claro
VITE_ACCENT_COLOR=#ec4899     # Rosa gaming
```

#### Hosting/Servicios
```env
VITE_PRIMARY_COLOR=#059669    # Verde confianza
VITE_SECONDARY_COLOR=#0d9488  # Verde azulado
VITE_ACCENT_COLOR=#0ea5e9     # Azul cielo
```

#### Minimalista/Moderno
```env
VITE_PRIMARY_COLOR=#1f2937    # Gris oscuro
VITE_SECONDARY_COLOR=#374151  # Gris medio
VITE_ACCENT_COLOR=#f59e0b     # Amarillo dorado
```

## 🏢 Personalización de Empresa

### Información Básica

```env
# Nombre de la empresa (aparece en header, footer, títulos)
VITE_COMPANY_NAME=Tu Empresa

# Eslogan principal (aparece en hero section)
VITE_COMPANY_TAGLINE=Tu eslogan aquí

# Descripción completa (aparece en hero y meta descripción)
VITE_COMPANY_DESCRIPTION=Descripción detallada de tu empresa y servicios
```

### Textos de Secciones

```env
# Hero Section
VITE_HERO_TITLE=Título Principal
VITE_HERO_SUBTITLE=Subtítulo descriptivo
VITE_HERO_CTA_PRIMARY=Botón Principal
VITE_HERO_CTA_SECONDARY=Botón Secundario

# Sección Servicios
VITE_SERVICES_TITLE=Nuestros Servicios
VITE_SERVICES_DESCRIPTION=Descripción de tus servicios

# Sección Equipo
VITE_TEAM_TITLE=Nuestro Equipo
VITE_TEAM_DESCRIPTION=Descripción de tu equipo

# Sección Historia
VITE_ABOUT_TITLE=Nuestra Historia
VITE_ABOUT_DESCRIPTION=Historia de tu empresa
```

## 📞 Configuración de Contacto

### Información de Contacto

```env
# Teléfono (formato internacional recomendado)
VITE_PHONE=+1 (234) 567-8900

# Email principal
VITE_EMAIL=contacto@tuempresa.com

# WhatsApp (solo números, con código de país)
VITE_WHATSAPP=+1234567890

# Dirección física completa
VITE_ADDRESS=123 Calle Principal, Ciudad, País

# Horarios de atención
VITE_BUSINESS_HOURS=Lun - Vie: 9:00 - 18:00
VITE_SUPPORT_HOURS=Soporte 24/7 disponible
```

### Mensaje de WhatsApp

Personaliza el mensaje inicial que se envía por WhatsApp:

```env
VITE_WHATSAPP_MESSAGE=¡Hola! Me interesa conocer más sobre los servicios de [Tu Empresa]. ¿Podrían proporcionarme información detallada?
```

## 🌐 Redes Sociales

```env
# URLs completas de tus redes sociales
VITE_FACEBOOK_URL=https://facebook.com/tuempresa
VITE_TWITTER_URL=https://twitter.com/tuempresa
VITE_LINKEDIN_URL=https://linkedin.com/company/tuempresa
VITE_INSTAGRAM_URL=https://instagram.com/tuempresa
VITE_YOUTUBE_URL=https://youtube.com/tuempresa
```

**Nota**: Si no tienes alguna red social, deja el campo vacío y no aparecerá en el sitio.

## 🖼️ Logos y Branding

### Preparación de Logos

1. **Logo Principal**: 200x60px (formato PNG con fondo transparente)
2. **Logo Claro**: Para modo oscuro (blanco/claro)
3. **Logo Oscuro**: Para modo claro (oscuro)
4. **Favicon**: 32x32px (formato ICO o PNG)

### Configuración

```env
VITE_LOGO_URL=/assets/logo.png
VITE_LOGO_LIGHT_URL=/assets/logo-light.png
VITE_LOGO_DARK_URL=/assets/logo-dark.png
VITE_FAVICON_URL=/assets/favicon.ico
```

### Ubicación de Archivos

Coloca tus logos en la carpeta `public/assets/` del proyecto.

## 🔧 Funcionalidades Opcionales

### Habilitar/Deshabilitar Secciones

```env
# Blog (true para mostrar, false para ocultar)
VITE_ENABLE_BLOG=true

# Sección de equipo
VITE_ENABLE_TEAM_SECTION=true

# Testimonios (si los implementas)
VITE_ENABLE_TESTIMONIALS=false

# Newsletter
VITE_ENABLE_NEWSLETTER=true

# Widget de chat
VITE_ENABLE_CHAT_WIDGET=true
```

## 📈 SEO y Marketing

### Configuración SEO

```env
# Título que aparece en la pestaña del navegador
VITE_SITE_TITLE=Tu Empresa - Descripción Breve

# Descripción para motores de búsqueda (máximo 160 caracteres)
VITE_SITE_DESCRIPTION=Descripción optimizada para SEO de tu empresa y servicios principales.

# Palabras clave separadas por comas
VITE_SITE_KEYWORDS=hosting,gaming,desarrollo web,tu industria

# Autor del sitio
VITE_SITE_AUTHOR=Tu Empresa

# URL principal del sitio
VITE_SITE_URL=https://tuempresa.com
```

### Analytics

```env
# Google Analytics 4
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Facebook Pixel
VITE_FACEBOOK_PIXEL_ID=123456789

# Hotjar (opcional)
VITE_HOTJAR_ID=1234567
```

## 🎯 Personalización de Servicios

### Modificar Servicios en el Código

Para personalizar los servicios mostrados, edita el archivo:
`src/components/sections/Services.jsx`

Busca el array `services` y modifica:

```javascript
const services = [
  {
    icon: Server, // Icono (de Lucide React)
    title: 'Tu Servicio',
    description: 'Descripción de tu servicio',
    features: ['Característica 1', 'Característica 2'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  // ... más servicios
];
```

### Modificar Planes de Hosting

Edita el archivo: `src/pages/HostingPage.jsx`

Busca los arrays `hostingPlans` y `gamingPlans` para personalizar:
- Nombres de planes
- Precios
- Características incluidas
- Especificaciones técnicas

## 🎨 Personalización Avanzada de Estilos

### Variables CSS Personalizadas

El sistema utiliza CSS custom properties que se generan automáticamente desde las variables de entorno. Si necesitas personalización adicional, puedes modificar:

`src/App.css`

### Componentes Personalizados

Todos los componentes están en la carpeta `src/components/` y pueden ser modificados:

- `common/`: Componentes base (Button, Card, etc.)
- `layout/`: Navegación y footer
- `sections/`: Secciones de página

## 📱 Responsive Design

El sitio es completamente responsive por defecto. Los breakpoints utilizados son:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔄 Aplicar Cambios

### Durante Desarrollo

1. Modifica el archivo `.env`
2. Guarda los cambios
3. El servidor de desarrollo se recargará automáticamente

### En Producción

1. Modifica las variables de entorno en tu plataforma de hosting
2. Redespliega la aplicación
3. Los cambios se aplicarán automáticamente

## 🆘 Solución de Problemas

### Los colores no cambian
- Verifica que los valores estén en formato hexadecimal (#123456)
- Reinicia el servidor de desarrollo
- Limpia la caché del navegador

### Los logos no aparecen
- Verifica que los archivos estén en `public/assets/`
- Comprueba que las rutas en `.env` sean correctas
- Asegúrate de que los archivos tengan los nombres correctos

### WhatsApp no funciona
- Verifica que el número incluya el código de país
- No incluyas espacios ni caracteres especiales en `VITE_WHATSAPP`
- El formato correcto es: `+1234567890`

## 📞 Soporte

Si necesitas ayuda adicional con la personalización:

- **Email**: support@rokeindustries.com
- **WhatsApp**: +1 234 567 8900
- **Documentación**: Consulta este archivo y README.md

---

**¡Tu sitio web personalizado está listo para brillar! 🚀**

