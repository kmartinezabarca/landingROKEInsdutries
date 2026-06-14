import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Phone, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sileo-toaster';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { ConsentProvider } from './contexts/ConsentContext';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { googleClientId, isGoogleAuthConfigured } from './lib/oauth';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FloatingButton from './components/common/FloatingButton';
import Analytics from './components/common/Analytics';
import CookieConsent from './components/common/CookieConsent';
import ErrorBoundary from './components/common/ErrorBoundary';
import WhatsAppService from './services/whatsapp/whatsappService';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } } });

// Cada página es un chunk independiente: el bundle inicial deja de cargar
// Three.js, postprocessing y Stripe en rutas que no los usan.
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const HostingPage = lazy(() => import('./pages/HostingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const SystemStatusPage = lazy(() => import('./pages/SystemStatusPage'));
const APIPage = lazy(() => import('./pages/APIPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const DocumentationDetailPage = lazy(() => import('./pages/DocumentationDetailPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
import { ROUTES } from './utils/constants/config';
import './App.css';
import './styles/micro-animations.css';

const PageFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Cargando">
    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
  </div>
);

const App: React.FC = () => {
  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const handleWhatsAppClick = () => {
    WhatsAppService.openWhatsApp();
  };

  const appContent = (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <CheckoutProvider>
    <ThemeProvider>
    <ConsentProvider>
      <Router>
        <Analytics />
        <div className="home-modern min-h-screen bg-background text-foreground">
          <Navigation />

          <main>
            <ErrorBoundary>
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                  <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
                  <Route path={ROUTES.HOSTING} element={<HostingPage />} />
                  <Route path={ROUTES.BLOG} element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogDetailPage />} />
                  <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                  <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/status" element={<SystemStatusPage />} />
                  <Route path="/api" element={<APIPage />} />
                  <Route path="/docs" element={<DocumentationPage />} />
                  <Route path="/docs/:slug" element={<DocumentationDetailPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>

          <Footer />

          {/* Floating Buttons */}
          <FloatingButton
            position="bottom-right"
            onClick={handleWhatsAppClick}
            ariaLabel="Contactar por WhatsApp"
            className="bg-[#25d366] hover:bg-[#1fb855] text-white"
          >
            <FaWhatsapp className="w-7 h-7" />
          </FloatingButton>

          <FloatingButton
            position="bottom-right"
            onClick={handleContactClick}
            ariaLabel="Contactar"
            className="mb-20 bg-primary hover:bg-primary/90"
          >
            <Phone className="w-6 h-6" />
          </FloatingButton>
        </div>
        <CheckoutModal />
        <CookieConsent />
        <Toaster />
      </Router>
    </ConsentProvider>
    </ThemeProvider>
    </CheckoutProvider>
    </AuthProvider>
    </QueryClientProvider>
  );

  if (!isGoogleAuthConfigured) {
    return appContent;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {appContent}
    </GoogleOAuthProvider>
  );
}

export default App;
