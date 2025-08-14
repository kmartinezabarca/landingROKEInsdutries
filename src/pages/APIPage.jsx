import React, { useState } from 'react';
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
  Play
} from 'lucide-react';
import Container from '../components/common/Container';

const APIPage = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/servers',
      description: 'Obtener lista de servidores',
      response: `{
  "servers": [
    {
      "id": "srv_123",
      "name": "Minecraft Server #1",
      "status": "online",
      "players": 15,
      "max_players": 50,
      "uptime": "99.8%"
    }
  ]
}`
    },
    {
      method: 'POST',
      path: '/api/v1/servers',
      description: 'Crear nuevo servidor',
      request: `{
  "name": "Mi Servidor",
  "game": "minecraft",
  "plan": "premium",
  "region": "us-east"
}`,
      response: `{
  "server": {
    "id": "srv_456",
    "name": "Mi Servidor",
    "status": "creating",
    "ip": "192.168.1.100",
    "port": 25565
  }
}`
    },
    {
      method: 'GET',
      path: '/api/v1/hosting/stats',
      description: 'Estadísticas de hosting',
      response: `{
  "stats": {
    "cpu_usage": 45.2,
    "memory_usage": 67.8,
    "disk_usage": 23.1,
    "bandwidth": "1.2TB",
    "uptime": "99.99%"
  }
}`
    }
  ];

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

          {/* Endpoints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-lg p-8 mb-12 border"
          >
            <h2 className="text-2xl font-semibold mb-6">Endpoints Principales</h2>
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded text-sm font-medium mr-3 ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-sm bg-muted px-2 py-1 rounded">{endpoint.path}</code>
                  </div>
                  <p className="text-muted-foreground mb-4">{endpoint.description}</p>
                  
                  {endpoint.request && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <div className="bg-muted rounded-lg p-4 relative">
                        <button
                          onClick={() => copyToClipboard(endpoint.request, `request-${index}`)}
                          className="absolute top-2 right-2 p-2 hover:bg-background rounded"
                        >
                          {copiedCode === `request-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <pre className="text-sm overflow-x-auto">
                          <code>{endpoint.request}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold mb-2">Response:</h4>
                    <div className="bg-muted rounded-lg p-4 relative">
                      <button
                        onClick={() => copyToClipboard(endpoint.response, `response-${index}`)}
                        className="absolute top-2 right-2 p-2 hover:bg-background rounded"
                      >
                        {copiedCode === `response-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <pre className="text-sm overflow-x-auto">
                        <code>{endpoint.response}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

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
            className="bg-card rounded-lg p-8 mb-12 border"
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

          {/* Documentation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-primary/5 rounded-lg p-8 text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">¿Necesitas Más Información?</h3>
            <p className="text-muted-foreground mb-6">
              Explora nuestra documentación completa, guías de integración y ejemplos avanzados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <BookOpen className="w-4 h-4 mr-2" />
                Documentación Completa
              </button>
              <button className="flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                <Terminal className="w-4 h-4 mr-2" />
                Playground API
              </button>
              <button className="flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                <ExternalLink className="w-4 h-4 mr-2" />
                Postman Collection
              </button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default APIPage;

