import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FloatingButton from './components/common/FloatingButton';
import WhatsAppService from './services/whatsapp/whatsappService';
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

function App() {
  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const handleWhatsAppClick = () => {
    WhatsAppService.openWhatsApp();
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
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
    </ThemeProvider>
  );
}

export default App;

