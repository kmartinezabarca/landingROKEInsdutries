import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Share2, 
  Heart, 
  MessageCircle, 
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import Container from '../components/common/Container';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [copied, setCopied] = useState(false);

  // Datos de ejemplo de artículos
  const articles = [
    {
      id: 1,
      slug: "optimizacion-servidores-minecraft",
      title: "Guía Completa para Optimizar Servidores de Minecraft",
      excerpt: "Aprende las mejores técnicas para optimizar el rendimiento de tu servidor de Minecraft y ofrecer la mejor experiencia a tus jugadores.",
      content: `
# Guía Completa para Optimizar Servidores de Minecraft

Los servidores de Minecraft pueden ser complejos de optimizar, especialmente cuando tienes muchos jugadores conectados simultáneamente. En esta guía completa, te enseñaremos las mejores prácticas para maximizar el rendimiento de tu servidor.

## 1. Configuración del Servidor

### Asignación de RAM
La cantidad de RAM es crucial para el rendimiento. Para un servidor con 10-20 jugadores, recomendamos al menos 4GB de RAM. Para servidores más grandes:

- **20-50 jugadores**: 6-8GB RAM
- **50-100 jugadores**: 8-12GB RAM  
- **100+ jugadores**: 12GB+ RAM

### Configuración de JVM
Los parámetros de la JVM pueden marcar una gran diferencia:

\`\`\`bash
java -Xms4G -Xmx4G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar server.jar nogui
\`\`\`

## 2. Optimización del Mundo

### Pregenerar el Mundo
Pregenerar chunks reduce la carga del servidor cuando los jugadores exploran:

1. Usa plugins como WorldBorder
2. Establece un límite de mundo razonable
3. Pregenera chunks hasta ese límite

### Configuración de server.properties
Ajusta estos valores en tu archivo server.properties:

\`\`\`properties
view-distance=8
simulation-distance=6
entity-activation-range=32
max-tick-time=60000
\`\`\`

## 3. Plugins de Optimización

### Paper/Spigot
Usa Paper en lugar de Vanilla Minecraft para mejor rendimiento:

- Mejor gestión de chunks
- Optimizaciones de redstone
- Configuraciones avanzadas

### Plugins Recomendados
- **ClearLag**: Elimina entidades innecesarias
- **LimitPillagers**: Controla spawns de mobs
- **FastAsyncWorldEdit**: WorldEdit optimizado

## 4. Monitoreo del Rendimiento

### Comandos Útiles
- `/tps` - Verifica los ticks por segundo
- `/timings` - Análisis detallado de rendimiento
- `/spark` - Profiling avanzado

### Métricas Importantes
- **TPS**: Debe mantenerse en 20
- **MSPT**: Tiempo por tick (objetivo: <50ms)
- **Uso de RAM**: No debe exceder el 80%

## 5. Configuración de Red

### Optimización de Conexión
- Usa una conexión de fibra óptica
- Configura QoS en tu router
- Considera usar un proxy como BungeeCord

### Configuración de Firewall
Asegúrate de que solo los puertos necesarios estén abiertos:
- Puerto 25565 (Minecraft)
- Puerto 22 (SSH, solo para administración)

## Conclusión

La optimización de servidores de Minecraft es un proceso continuo. Monitorea regularmente el rendimiento y ajusta la configuración según sea necesario. Con estas técnicas, podrás ofrecer una experiencia de juego fluida y estable para todos tus jugadores.

¿Necesitas ayuda con la optimización de tu servidor? En Roke Industries ofrecemos servicios especializados de hosting para Minecraft con optimizaciones preconfiguradas.
      `,
      author: "Carlos Rodríguez",
      date: "2025-08-12",
      readTime: "8 min",
      category: "Gaming",
      tags: ["Minecraft", "Optimización", "Servidores", "Gaming"],
      image: "/assets/minecraft-server.jpg",
      likes: 42,
      comments: 15
    },
    {
      id: 2,
      slug: "ssl-certificados-hosting",
      title: "Cómo Configurar Certificados SSL en tu Hosting",
      excerpt: "Guía paso a paso para instalar y configurar certificados SSL/TLS en tu sitio web para mejorar la seguridad y SEO.",
      content: `
# Cómo Configurar Certificados SSL en tu Hosting

La seguridad web es fundamental en 2025. Los certificados SSL/TLS no solo protegen los datos de tus usuarios, sino que también mejoran tu posicionamiento en buscadores. En esta guía te explicamos todo lo que necesitas saber.

## ¿Qué es un Certificado SSL?

Un certificado SSL (Secure Sockets Layer) es un protocolo de seguridad que crea un enlace cifrado entre un servidor web y un navegador. Esto garantiza que todos los datos transmitidos permanezcan privados y seguros.

### Tipos de Certificados SSL

1. **Domain Validated (DV)**: Validación básica del dominio
2. **Organization Validated (OV)**: Validación de la organización
3. **Extended Validation (EV)**: Validación extendida con barra verde

## Instalación Paso a Paso

### 1. Obtener el Certificado
En Roke Industries ofrecemos certificados SSL gratuitos con Let's Encrypt:

\`\`\`bash
# Instalación automática con certbot
sudo certbot --apache -d tudominio.com -d www.tudominio.com
\`\`\`

### 2. Configuración del Servidor Web

#### Apache
Edita tu archivo de configuración:

\`\`\`apache
<VirtualHost *:443>
    ServerName tudominio.com
    DocumentRoot /var/www/html
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    SSLCertificateChainFile /path/to/chain.crt
</VirtualHost>
\`\`\`

#### Nginx
Configuración para Nginx:

\`\`\`nginx
server {
    listen 443 ssl;
    server_name tudominio.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}
\`\`\`

### 3. Redirección HTTP a HTTPS
Asegúrate de redirigir todo el tráfico HTTP a HTTPS:

\`\`\`apache
<VirtualHost *:80>
    ServerName tudominio.com
    Redirect permanent / https://tudominio.com/
</VirtualHost>
\`\`\`

## Verificación y Testing

### Herramientas de Verificación
- **SSL Labs**: Análisis completo de configuración SSL
- **Why No Padlock**: Detecta contenido mixto
- **SSL Checker**: Verificación rápida de certificados

### Comandos de Verificación
\`\`\`bash
# Verificar certificado
openssl x509 -in certificate.crt -text -noout

# Verificar conexión SSL
openssl s_client -connect tudominio.com:443
\`\`\`

## Renovación Automática

### Let's Encrypt
Configura la renovación automática:

\`\`\`bash
# Agregar a crontab
0 12 * * * /usr/bin/certbot renew --quiet
\`\`\`

## Mejores Prácticas

1. **Usa TLS 1.2 o superior**
2. **Implementa HSTS** (HTTP Strict Transport Security)
3. **Configura OCSP Stapling**
4. **Usa Perfect Forward Secrecy**

### Configuración HSTS
\`\`\`apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
\`\`\`

## Conclusión

Configurar SSL correctamente es esencial para cualquier sitio web moderno. Con las herramientas y configuraciones adecuadas, puedes asegurar tu sitio y mejorar la confianza de tus usuarios.

En Roke Industries, todos nuestros planes de hosting incluyen certificados SSL gratuitos y configuración automática.
      `,
      author: "Ana García",
      date: "2025-08-10",
      readTime: "6 min",
      category: "Hosting",
      tags: ["SSL", "Seguridad", "Hosting", "HTTPS"],
      image: "/assets/ssl-security.jpg",
      likes: 38,
      comments: 12
    },
    {
      id: 3,
      slug: "tendencias-hosting-2025",
      title: "Tendencias de Hosting Web para 2025",
      excerpt: "Descubre las principales tendencias en hosting web que dominarán el 2025, desde edge computing hasta sostenibilidad.",
      content: `
# Tendencias de Hosting Web para 2025

El mundo del hosting web está en constante evolución. En 2025, vemos emerger nuevas tecnologías y enfoques que están redefiniendo cómo alojamos y servimos contenido web. Exploremos las tendencias más importantes.

## 1. Edge Computing y CDN Avanzado

### ¿Qué es Edge Computing?
El edge computing acerca el procesamiento de datos al usuario final, reduciendo la latencia y mejorando el rendimiento.

### Beneficios Clave
- **Latencia ultra-baja**: Respuestas en menos de 10ms
- **Mejor experiencia de usuario**: Carga más rápida de contenido
- **Escalabilidad global**: Distribución automática de carga

### Implementación
Los proveedores de hosting están integrando edge computing en sus ofertas:

\`\`\`javascript
// Ejemplo de función edge
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Procesamiento en el edge
    if (url.pathname === '/api/data') {
      return new Response(JSON.stringify({
        timestamp: Date.now(),
        location: request.cf.colo
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return fetch(request);
  }
}
\`\`\`

## 2. Hosting Sostenible y Green Computing

### La Importancia de la Sostenibilidad
Con el crecimiento exponencial del consumo digital, la sostenibilidad en hosting se ha vuelto crucial.

### Iniciativas Green
- **Energía renovable**: Centros de datos alimentados 100% por energías limpias
- **Eficiencia energética**: PUE (Power Usage Effectiveness) menor a 1.2
- **Compensación de carbono**: Programas de neutralidad carbónica

### Certificaciones
- Energy Star
- ISO 14001
- Green Web Foundation

## 3. Serverless y JAMstack

### Arquitectura Serverless
El hosting serverless elimina la necesidad de gestionar servidores:

\`\`\`yaml
# Ejemplo de configuración serverless
service: mi-aplicacion

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1

functions:
  api:
    handler: handler.api
    events:
      - http:
          path: /{proxy+}
          method: ANY
\`\`\`

### JAMstack Benefits
- **Mejor rendimiento**: Sitios pre-generados
- **Mayor seguridad**: Menos superficie de ataque
- **Escalabilidad automática**: CDN global

## 4. Contenedores y Kubernetes

### Containerización
Los contenedores ofrecen portabilidad y eficiencia:

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Orquestación con Kubernetes
- **Auto-scaling**: Escalado automático basado en demanda
- **Self-healing**: Recuperación automática de fallos
- **Rolling updates**: Actualizaciones sin downtime

## 5. Inteligencia Artificial en Hosting

### Optimización Automática
La IA está revolucionando la gestión de hosting:

- **Predicción de carga**: Anticipar picos de tráfico
- **Optimización de recursos**: Asignación inteligente de CPU/RAM
- **Detección de anomalías**: Identificación proactiva de problemas

### Casos de Uso
\`\`\`python
# Ejemplo de optimización con ML
import numpy as np
from sklearn.ensemble import RandomForestRegressor

def predict_resource_usage(historical_data):
    model = RandomForestRegressor()
    model.fit(historical_data['features'], historical_data['usage'])
    
    future_usage = model.predict(current_metrics)
    return future_usage
\`\`\`

## 6. Seguridad Avanzada

### Zero Trust Architecture
- **Verificación continua**: Autenticación en cada solicitud
- **Micro-segmentación**: Aislamiento de recursos
- **Monitoreo en tiempo real**: Detección de amenazas

### Web Application Firewall (WAF)
\`\`\`json
{
  "rules": [
    {
      "name": "SQL Injection Protection",
      "pattern": "(?i)(union|select|insert|delete|update|drop)",
      "action": "block"
    },
    {
      "name": "XSS Protection", 
      "pattern": "<script[^>]*>.*?</script>",
      "action": "sanitize"
    }
  ]
}
\`\`\`

## 7. Multi-Cloud y Hybrid Cloud

### Estrategias Multi-Cloud
- **Evitar vendor lock-in**: Flexibilidad entre proveedores
- **Optimización de costos**: Usar el mejor precio por región
- **Redundancia**: Mayor disponibilidad y resistencia

### Herramientas de Gestión
- Terraform para infraestructura como código
- Kubernetes para orquestación multi-cloud
- Service mesh para conectividad

## Conclusión

El hosting web en 2025 se caracteriza por la velocidad, sostenibilidad y automatización inteligente. Las empresas que adopten estas tendencias estarán mejor posicionadas para ofrecer experiencias excepcionales a sus usuarios.

En Roke Industries, estamos a la vanguardia de estas tecnologías, ofreciendo soluciones de hosting que incorporan edge computing, sostenibilidad y las últimas innovaciones en seguridad.
      `,
      author: "Miguel Torres",
      date: "2025-08-08",
      readTime: "12 min",
      category: "Tecnología",
      tags: ["Hosting", "Tendencias", "2025", "Tecnología"],
      image: "/assets/hosting-trends.jpg",
      likes: 56,
      comments: 23
    }
  ];

  useEffect(() => {
    // Buscar el artículo por slug
    const foundArticle = articles.find(article => article.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
      setLikes(foundArticle.likes);
      
      // Obtener artículos relacionados (misma categoría, excluyendo el actual)
      const related = articles
        .filter(a => a.category === foundArticle.category && a.id !== foundArticle.id)
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [slug]);

  const handleLike = () => {
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || '';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link 
            to="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al blog
          </Link>

          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {article.category}
              </span>
              {article.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(article.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {article.readTime} de lectura
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center justify-between border-y py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    liked 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  {likes}
                </button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  {article.comments} comentarios
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Compartir:</span>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Compartir en Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Compartir en Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Compartir en LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Copiar enlace"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-16"
            dangerouslySetInnerHTML={{ 
              __html: article.content.replace(/\n/g, '<br>').replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
            }}
          />

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-t pt-12"
            >
              <h3 className="text-2xl font-bold mb-8">Artículos Relacionados</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/blog/${relatedArticle.slug}`}
                    className="group"
                  >
                    <div className="bg-card rounded-lg p-6 border hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {relatedArticle.category}
                        </span>
                      </div>
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedArticle.readTime}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-t pt-12 mt-12"
          >
            <h3 className="text-2xl font-bold mb-8">Comentarios ({article.comments})</h3>
            
            {/* Comment Form */}
            <div className="bg-card rounded-lg p-6 border mb-8">
              <h4 className="font-semibold mb-4">Deja un comentario</h4>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Tu comentario..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Publicar Comentario
                </button>
              </form>
            </div>

            {/* Sample Comments */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Juan Pérez</div>
                    <div className="text-sm text-muted-foreground">Hace 2 días</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Excelente artículo! Me ayudó mucho a optimizar mi servidor de Minecraft. 
                  Los parámetros de JVM que mencionas funcionaron perfectamente.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">María González</div>
                    <div className="text-sm text-muted-foreground">Hace 1 semana</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  ¿Podrían hacer un tutorial sobre optimización para servidores con mods? 
                  Tengo problemas de rendimiento con modpacks grandes.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default BlogDetailPage;

