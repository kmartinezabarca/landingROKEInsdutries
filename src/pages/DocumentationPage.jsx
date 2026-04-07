import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  FileText, 
  AlertCircle,
  Loader2,
  Star,
  Clock,
  MessageSquare,
  X
} from 'lucide-react';
import Container from '../components/common/Container';
import documentationService from '../services/documentationService';
import apiClient from '../lib/apiClient';

const DocumentationPage = () => {
  const [documentation, setDocumentation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: "",
    email: "",
    topic: "",
    description: ""
  });
  const [submittingRequest, setSubmittingRequest] = useState(false);

  useEffect(() => {
    const loadDocumentation = async () => {
      try {
        setLoading(true);
        setError(null);
        const docs = await documentationService.getDocumentation();
        setDocumentation(docs);
        if (docs.length > 0) {
          setSelectedDoc(docs[0]);
        }
      } catch (err) {
        console.error("Error loading documentation:", err);
        setError("No se pudo cargar la documentación. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadDocumentation();
  }, []);

  const filteredDocs = documentation.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    
    if (!requestForm.name || !requestForm.email || !requestForm.topic) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    setSubmittingRequest(true);
    
    try {
      await apiClient.post("/documentation-requests", {
        ...requestForm,
        kind: "documentation"
      });
      
      alert("Solicitud enviada exitosamente. Nos pondremos en contacto pronto.");
      setRequestForm({
        name: "",
        email: "",
        topic: "",
        description: ""
      });
      setShowRequestModal(false);
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Error al enviar la solicitud. Por favor intenta de nuevo.");
    } finally {
      setSubmittingRequest(false);
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
              "url('/assets/images/banners/banner-docs.jpg')",
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
            <BookOpen className="w-12 h-12 mx-auto text-primary mb-4 opacity-80" />
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">
              Documentación
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Encuentra toda la información que necesitas para aprovechar al máximo nuestros servicios.
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
                Error al cargar la documentación
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
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredDocs.map((doc) => (
                    <motion.button
                      key={doc.uuid}
                      onClick={() => setSelectedDoc(doc)}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedDoc?.uuid === doc.uuid
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <p className="font-medium text-sm">{doc.title}</p>
                    </motion.button>
                  ))}
                </div>

                {filteredDocs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No se encontraron documentos
                  </div>
                )}

                {/* Request Documentation Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  onClick={() => setShowRequestModal(true)}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors border border-primary/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">Solicitar Documentación</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              {selectedDoc ? (
                <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
                  <h1 className="text-4xl font-bold mb-4">{selectedDoc.title}</h1>
                  <div className="text-sm text-muted-foreground mb-8 flex gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Actualizado: {new Date(selectedDoc.updatedAt).toLocaleDateString("es-ES")}
                    </div>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedDoc.content.replace(/\n/g, "<br />"),
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Selecciona un documento para ver su contenido</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </Container>

      {/* Request Documentation Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card rounded-lg p-8 max-w-md w-full border border-border shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Solicitar Documentación</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  value={requestForm.name}
                  onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={requestForm.email}
                  onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tema de Documentación *</label>
                <input
                  type="text"
                  value={requestForm.topic}
                  onChange={(e) => setRequestForm({ ...requestForm, topic: e.target.value })}
                  placeholder="Ej: Configuración de DNS"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea
                  value={requestForm.description}
                  onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                  placeholder="Cuéntanos qué documentación necesitas..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-input hover:bg-muted transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submittingRequest}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingRequest ? "Enviando..." : "Enviar Solicitud"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DocumentationPage;
