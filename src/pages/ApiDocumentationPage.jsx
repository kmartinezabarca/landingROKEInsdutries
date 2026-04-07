import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Search, AlertCircle, Loader2, Copy, Check } from "lucide-react";
import Container from "../components/common/Container";
import documentationService from "../services/documentationService";

const ApiDocumentationPage = () => {
  const [apiDocs, setApiDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const loadApiDocumentation = async () => {
      try {
        setLoading(true);
        setError(null);
        const docs = await documentationService.getApiDocumentation();
        setApiDocs(docs);
        if (docs.length > 0) {
          setSelectedEndpoint(docs[0]);
        }
      } catch (err) {
        console.error("Error loading API documentation:", err);
        setError("No se pudo cargar la documentación de API. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadApiDocumentation();
  }, []);

  const filteredEndpoints = apiDocs.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getMethodColor = (method) => {
    switch (method?.toUpperCase()) {
      case "GET":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "POST":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "PUT":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "DELETE":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "PATCH":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
          style={{
            backgroundImage:
              "url('/assets/images/banners/banner-api.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70 z-10" />
        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <Code className="w-12 h-12 mx-auto text-primary mb-4 opacity-80" />
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">
              Documentación de API
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Integra nuestros servicios en tu aplicación con nuestra API RESTful completa y documentada.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-20">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-20">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar endpoints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredEndpoints.map((endpoint) => (
                    <motion.button
                      key={endpoint.uuid}
                      onClick={() => setSelectedEndpoint(endpoint)}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedEndpoint?.uuid === endpoint.uuid
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method?.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-mono text-xs mt-1 truncate">{endpoint.endpoint}</p>
                    </motion.button>
                  ))}
                </div>

                {filteredEndpoints.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No se encontraron endpoints
                  </div>
                )}
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              {selectedEndpoint ? (
                <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
                  {/* Endpoint Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getMethodColor(selectedEndpoint.method)}`}>
                        {selectedEndpoint.method?.toUpperCase()}
                      </span>
                      <code className="font-mono text-sm bg-muted px-3 py-1 rounded-lg flex-1 overflow-x-auto">
                        {selectedEndpoint.endpoint}
                      </code>
                      <button
                        onClick={() => copyToClipboard(selectedEndpoint.endpoint, "endpoint")}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        {copiedCode === "endpoint" ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{selectedEndpoint.title}</h1>
                  </div>

                  {/* Description */}
                  <div className="mb-8 pb-8 border-b">
                    <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                    <p className="text-muted-foreground">{selectedEndpoint.description}</p>
                  </div>

                  {/* Content */}
                  <div className="prose dark:prose-invert max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedEndpoint.content.replace(/\n/g, "<br />"),
                      }}
                    />
                  </div>

                  {/* Code Example */}
                  {selectedEndpoint.codeExample && (
                    <div className="mt-8 pt-8 border-t">
                      <h2 className="text-xl font-semibold mb-4">Ejemplo de Uso</h2>
                      <div className="relative">
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                          <code>{selectedEndpoint.codeExample}</code>
                        </pre>
                        <button
                          onClick={() => copyToClipboard(selectedEndpoint.codeExample, "example")}
                          className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                        >
                          {copiedCode === "example" ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Code className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Selecciona un endpoint para ver su documentación</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ApiDocumentationPage;
