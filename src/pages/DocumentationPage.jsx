import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  FileText, 
  Video, 
  Code, 
  Download,
  ExternalLink,
  Star,
  Clock,
  User
} from 'lucide-react';
import Container from '../components/common/Container';

const DocumentationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos', count: 24 },
    { id: 'getting-started', name: 'Primeros Pasos', count: 6 },
    { id: 'hosting', name: 'Hosting Web', count: 8 },
    { id: 'gaming', name: 'Servidores Gaming', count: 5 },
    { id: 'api', name: 'API', count: 3 },
    { id: 'troubleshooting', name: 'Solución de Problemas', count: 2 }
  ];

  const documents = [
    {
      id: 1,
      title: "Guía de Inicio Rápido",
      description: "Aprende a configurar tu primer servicio de hosting en menos de 5 minutos.",
      category: "getting-started",
      type: "guide",
      readTime: "5 min",
      difficulty: "Principiante",
      rating: 4.9,
      lastUpdated: "2025-08-10",
      popular: true
    },
    {
      id: 2,
      title: "Configuración de Dominio y DNS",
      description: "Cómo configurar tu dominio para que apunte a tu hosting de Roke Industries.",
      category: "hosting",
      type: "tutorial",
      readTime: "10 min",
      difficulty: "Intermedio",
      rating: 4.8,
      lastUpdated: "2025-08-08"
    },
    {
      id: 3,
      title: "Instalación de Minecraft Server",
      description: "Guía paso a paso para instalar y configurar tu servidor de Minecraft.",
      category: "gaming",
      type: "tutorial",
      readTime: "15 min",
      difficulty: "Intermedio",
      rating: 4.9,
      lastUpdated: "2025-08-12",
      popular: true
    },
    {
      id: 4,
      title: "Referencia de API v1",
      description: "Documentación completa de todos los endpoints disponibles en nuestra API.",
      category: "api",
      type: "reference",
      readTime: "30 min",
      difficulty: "Avanzado",
      rating: 4.7,
      lastUpdated: "2025-08-14"
    },
    {
      id: 5,
      title: "Configuración de SSL/TLS",
      description: "Cómo habilitar y configurar certificados SSL para tu sitio web.",
      category: "hosting",
      type: "guide",
      readTime: "8 min",
      difficulty: "Intermedio",
      rating: 4.6,
      lastUpdated: "2025-08-05"
    },
    {
      id: 6,
      title: "Optimización de Rendimiento",
      description: "Mejores prácticas para optimizar el rendimiento de tu hosting.",
      category: "hosting",
      type: "guide",
      readTime: "20 min",
      difficulty: "Avanzado",
      rating: 4.8,
      lastUpdated: "2025-08-07",
      popular: true
    },
    {
      id: 7,
      title: "Configuración de Mods en Minecraft",
      description: "Cómo instalar y gestionar mods en tu servidor de Minecraft.",
      category: "gaming",
      type: "tutorial",
      readTime: "12 min",
      difficulty: "Intermedio",
      rating: 4.7,
      lastUpdated: "2025-08-09"
    },
    {
      id: 8,
      title: "Solución de Problemas Comunes",
      description: "Resolución de los problemas más frecuentes en hosting y gaming.",
      category: "troubleshooting",
      type: "troubleshooting",
      readTime: "25 min",
      difficulty: "Intermedio",
      rating: 4.5,
      lastUpdated: "2025-08-11"
    }
  ];

  const quickLinks = [
    {
      title: "Panel de Control",
      description: "Accede a tu panel de administración",
      icon: <ExternalLink className="w-5 h-5" />,
      link: "#"
    },
    {
      title: "Descargas",
      description: "Herramientas y utilidades",
      icon: <Download className="w-5 h-5" />,
      link: "#"
    },
    {
      title: "Videos Tutoriales",
      description: "Aprende con contenido visual",
      icon: <Video className="w-5 h-5" />,
      link: "#"
    },
    {
      title: "Ejemplos de Código",
      description: "Snippets y ejemplos prácticos",
      icon: <Code className="w-5 h-5" />,
      link: "#"
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="w-4 h-4" />;
      case 'tutorial':
        return <Video className="w-4 h-4" />;
      case 'reference':
        return <FileText className="w-4 h-4" />;
      case 'troubleshooting':
        return <Search className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'guide':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'tutorial':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'reference':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'troubleshooting':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Principiante':
        return 'text-green-600 dark:text-green-400';
      case 'Intermedio':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Avanzado':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Documentación
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Encuentra guías, tutoriales y referencias para aprovechar al máximo nuestros servicios de hosting y gaming.
            </p>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-lg p-8 mb-12 border"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar en la documentación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              {/* Quick Links */}
              <div className="bg-card rounded-lg p-6 border mb-8">
                <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                        {link.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{link.title}</div>
                        <div className="text-xs text-muted-foreground">{link.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Popular Articles */}
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">Artículos Populares</h3>
                <div className="space-y-3">
                  {documents.filter(doc => doc.popular).slice(0, 3).map((doc) => (
                    <div key={doc.id} className="p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <div className="font-medium text-sm mb-1">{doc.title}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                        {doc.rating}
                        <span className="mx-2">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        {doc.readTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {filteredDocuments.length} {filteredDocuments.length === 1 ? 'resultado' : 'resultados'}
                  {searchTerm && ` para "${searchTerm}"`}
                </h2>
                <select className="px-3 py-2 border rounded-lg bg-background">
                  <option>Más relevante</option>
                  <option>Más reciente</option>
                  <option>Mejor valorado</option>
                  <option>Alfabético</option>
                </select>
              </div>

              {/* Documents Grid */}
              <div className="space-y-6">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="bg-card rounded-lg p-6 border hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-3 ${getTypeColor(doc.type)}`}>
                            {getTypeIcon(doc.type)}
                            <span className="ml-1 capitalize">{doc.type}</span>
                          </span>
                          {doc.popular && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Popular
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {doc.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{doc.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground space-x-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {doc.readTime}
                          </div>
                          <div className={`font-medium ${getDifficultyColor(doc.difficulty)}`}>
                            {doc.difficulty}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
                            {doc.rating}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            Actualizado {doc.lastUpdated}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
                  <p className="text-muted-foreground mb-4">
                    Intenta con otros términos de búsqueda o explora nuestras categorías.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Ver toda la documentación
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-primary/5 rounded-lg p-8 mt-12 text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">¿No Encuentras lo que Buscas?</h3>
            <p className="text-muted-foreground mb-6">
              Nuestro equipo de soporte está aquí para ayudarte. Contáctanos y te asistiremos personalmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Contactar Soporte
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                Solicitar Documentación
              </button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default DocumentationPage;

