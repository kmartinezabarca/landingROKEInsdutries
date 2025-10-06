import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  User,
  ArrowLeft,
} from 'lucide-react';
import Container from '../components/common/Container';

const API_BASE_URL = "http://localhost:8000/api"; // Asegúrate de que esta URL sea correcta para tu backend

const DocumentationDetailPage = () => {
  const { slug } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/documentation/posts/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        console.error("Error fetching documentation post:", error);
        setError("No se pudo cargar el documento de documentación.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [slug]);

  if (loading) {
    return (
      <Container className="py-16 text-center">
        <p>Cargando documento...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-16 text-center text-red-500">
        <p>{error}</p>
      </Container>
    );
  }

  if (!document) {
    return (
      <Container className="py-16 text-center">
        <p>Documento no encontrado.</p>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative h-[300px] md:h-[350px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
          style={{
            backgroundImage:
              `url(${document.image || 
                (document.category && document.category.image ? document.category.image : 
                '/assets/images/banners/banner-documentation.jpg')
              })`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <Link to="/documentation" className="inline-flex items-center text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Documentación
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              {document.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              {document.excerpt || document.content.substring(0, 150) + "..."}
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card p-8 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Admin</span> {/* Asumiendo un autor por defecto o añadir campo en backend */}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(document.published_at).toLocaleDateString("es-ES")}</span>
              </div>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                {document.category?.name || "Sin Categoría"}
              </span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-foreground leading-relaxed">
            {/* Renderizar el contenido HTML o Markdown */}
            <div dangerouslySetInnerHTML={{ __html: document.content }} />
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default DocumentationDetailPage;