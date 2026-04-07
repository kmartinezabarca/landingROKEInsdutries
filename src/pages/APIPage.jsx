import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Key, 
  Zap, 
  Shield, 
  BookOpen, 
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Play,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Container from '../components/common/Container';
import documentationService from '../services/documentationService';

const APIPage = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [apiDocs, setApiDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApiDocumentation = async () => {
      try {
        setLoading(true);
        setError(null);
        const docs = await documentationService.getApiDocumentation();
        setApiDocs(docs);
      } catch (err) {
        console.error("Error loading API documentation:", err);
        setError("No se pudo cargar la documentación de API. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadApiDocumentation();
  }, []);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "API RESTful",
      description: "Interfaz REST moderna y fácil de usar con respuestas JSON."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Autenticación Segura",
      description: "Autenticación basada en tokens API con encriptación SSL."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "SDKs Disponibles",
      description: "Librerías oficiales para Python, JavaScript, PHP y más."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Documentación Completa",
      description: "Guías detalladas, ejemplos y referencias de API."
    }
  ];

  const codeExamples = [
    {
      language: 'JavaScript',
      code: `// Obtener lista de servidores
const response = await fetch('https://api.rokeindustries.com/v1/servers', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.servers);`
    },
    {
      language: 'Python',
      code: `import requests

# Crear nuevo servidor
url = "https://api.rokeindustries.com/v1/servers"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "name": "Mi Servidor",
    "game": "minecraft",
    "plan": "premium"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`
    },
    {
      language: 'cURL',
      code: `# Obtener estadísticas de hosting
curl -X GET "https://api.rokeindustries.com/v1/hosting/stats" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Code className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              API de Roke Industries
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Integra nuestros servicios de hosting y gaming en tus aplicaciones con nuestra API RESTful potente y fácil de usar.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-4 shadow-sm"
            >
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                  Error al cargar la documentación de API
                </h3>
                <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Quick Start */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-lg p-8 mb-12 border"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <Play className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-semibold">Inicio Rápido</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">1. Obtén tu API Key</h3>
                    <p className="text-muted-foreground mb-4">
                      Genera tu clave API desde tu panel de control para comenzar a usar nuestros servicios.
                    </p>
                    <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      <Key className="w-4 h-4 mr-2" />
                      Generar API Key
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">2. Haz tu Primera Llamada</h3>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-muted-foreground">Base URL</span>
                        <button
                          onClick={() => copyToClipboard('https://api.rokeindustries.com/v1', 'base-url')}
                          className="p-1 hover:bg-background rounded"
                        >
                          {copiedCode === 'base-url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <code>https://api.rokeindustries.com/v1</code>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-center mb-12">Características de la API</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-card rounded-lg p-6 border text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* API Documentation */}
              {apiDocs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-card rounded-lg p-8 mb-12 border"
                >
                  <h2 className="text-2xl font-semibold mb-6">Documentación de API</h2>
                  <div className="space-y-6">
                    {apiDocs.map((doc) => (
                      <div key={doc.uuid} className="border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                        {doc.category && (
                          <p className="text-sm text-muted-foreground mb-3">
                            Categoría: <span className="font-medium">{doc.category}</span>
                          </p>
                        )}
                        <div className="prose dark:prose-invert max-w-none">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: doc.content.replace(/\n/g, "<br />"),
                            }}
                            className="text-muted-foreground"
                          />
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                              doc.is_published
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}
                          >
                            {doc.is_published ? 'Publicado' : 'Borrador'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Code Examples */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-card rounded-lg p-8 mb-12 border"
              >
                <h2 className="text-2xl font-semibold mb-6">Ejemplos de Código</h2>
                <div className="space-y-6">
                  {codeExamples.map((example, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">{example.language}</h3>
                        <button
                          onClick={() => copyToClipboard(example.code, `code-${index}`)}
                          className="flex items-center px-3 py-1 text-sm border rounded hover:bg-muted transition-colors"
                        >
                          {copiedCode === `code-${index}` ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                          Copiar
                        </button>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <pre className="text-sm overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Rate Limits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-card rounded-lg p-8 border"
              >
                <h2 className="text-2xl font-semibold mb-6">Límites de Velocidad</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">1000</div>
                    <div className="text-sm text-muted-foreground">Requests por hora</div>
                    <div className="text-xs text-muted-foreground mt-1">Plan Básico</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">5000</div>
                    <div className="text-sm text-muted-foreground">Requests por hora</div>
                    <div className="text-xs text-muted-foreground mt-1">Plan Premium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-2">∞</div>
                    <div className="text-sm text-muted-foreground">Requests por hora</div>
                    <div className="text-xs text-muted-foreground mt-1">Plan Enterprise</div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default APIPage;
