import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sileo-toaster';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { googleClientId, isGoogleAuthConfigured } from './lib/oauth';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FloatingButton from './components/common/FloatingButton';
import WhatsAppService from './services/whatsapp/whatsappService';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } } });
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import HostingPage from './pages/HostingPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SystemStatusPage from './pages/SystemStatusPage';
import APIPage from './pages/APIPage';
import DocumentationPage from './pages/DocumentationPage';
import DocumentationDetailPage from './pages/DocumentationDetailPage'
import TermsPage from './pages/TermsPage';
import { ROUTES } from './utils/constants/config';
import './App.css';
import './styles/micro-animations.css';

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
      <Router>
        <div className="home-modern min-h-screen bg-background text-foreground">
          <Navigation />

          <main>
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
            </Routes>
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
        <Toaster richColors position="top-right" closeButton />
      </Router>
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
