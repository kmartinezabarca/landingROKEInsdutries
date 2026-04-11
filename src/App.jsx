import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MessageCircle, Phone, Loader2 } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FloatingButton from './components/common/FloatingButton';
import ErrorBoundary from './components/common/ErrorBoundary';
import WhatsAppService from './services/whatsapp/whatsappService';
import { ROUTES } from './utils/constants/config';
import { usePageTracking } from './hooks/usePageTracking';
import './App.css';

// ---------------------------------------------------------------------------
// Lazy loading de todas las páginas
// Cada página se carga solo cuando el usuario la visita → bundle inicial menor
// ---------------------------------------------------------------------------
const HomePage              = lazy(() => import('./pages/HomePage'));
const ServicesPage          = lazy(() => import('./pages/ServicesPage'));
const AboutPage             = lazy(() => import('./pages/AboutPage'));
const BlogPage              = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage        = lazy(() => import('./pages/BlogDetailPage'));
const HostingPage           = lazy(() => import('./pages/HostingPage'));
const ContactPage           = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage     = lazy(() => import('./pages/PrivacyPolicyPage'));
const SystemStatusPage      = lazy(() => import('./pages/SystemStatusPage'));
const ApiDocumentationPage  = lazy(() => import('./pages/ApiDocumentationPage'));
const DocumentationPage     = lazy(() => import('./pages/DocumentationPage'));
const DocumentationDetailPage = lazy(() => import('./pages/DocumentationDetailPage'));
const TermsPage             = lazy(() => import('./pages/TermsPage'));
const NotFoundPage          = lazy(() => import('./pages/NotFoundPage'));

// ---------------------------------------------------------------------------
// Fallback de carga — se muestra mientras se descarga el chunk de la página
// ---------------------------------------------------------------------------
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
      <p className="text-sm text-muted-foreground">Cargando...</p>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Tracker interno — debe estar dentro del Router para acceder a useLocation
// ---------------------------------------------------------------------------
const PageTracker = () => {
  usePageTracking();
  return null;
};

function App() {
  const handleContactClick = () => {
    window.location.href = ROUTES.CONTACT;
  };

  const handleWhatsAppClick = () => {
    WhatsAppService.openWhatsApp();
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Router>
            <PageTracker />
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />

              <main>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path={ROUTES.HOME}     element={<HomePage />} />
                    <Route path={ROUTES.SERVICES}  element={<ServicesPage />} />
                    <Route path={ROUTES.HOSTING}   element={<HostingPage />} />
                    <Route path={ROUTES.BLOG}      element={<BlogPage />} />
                    <Route path="/blog/:slug"      element={<BlogDetailPage />} />
                    <Route path={ROUTES.ABOUT}     element={<AboutPage />} />
                    <Route path={ROUTES.CONTACT}   element={<ContactPage />} />
                    <Route path="/privacy"         element={<PrivacyPolicyPage />} />
                    <Route path="/status"          element={<SystemStatusPage />} />
                    <Route path="/api"             element={<ApiDocumentationPage />} />
                    <Route path="/docs"            element={<DocumentationPage />} />
                    <Route path="/docs/:slug"      element={<DocumentationDetailPage />} />
                    <Route path="/terms"           element={<TermsPage />} />
                    {/* Catch-all → 404 */}
                    <Route path="*"               element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>

              <Footer />

              {/* Botones flotantes de contacto */}
              <FloatingButton
                position="bottom-right"
                onClick={handleWhatsAppClick}
                ariaLabel="Contactar por WhatsApp"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-6 h-6" />
              </FloatingButton>

              <FloatingButton
                position="bottom-right"
                onClick={handleContactClick}
                ariaLabel="Contactar"
                className="mr-20 bg-primary hover:bg-primary/90"
              >
                <Phone className="w-6 h-6" />
              </FloatingButton>
            </div>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
