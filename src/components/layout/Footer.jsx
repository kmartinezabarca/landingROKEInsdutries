import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { CONFIG, ROUTES } from '../../utils/constants/config';
import Container from '../common/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Servicios',
      links: [
        { name: 'Hosting Web', href: ROUTES.HOSTING },
        { name: 'Servidores Gaming', href: ROUTES.HOSTING + '#gaming' },
        { name: 'Soporte Técnico', href: ROUTES.CONTACT },
        { name: 'Consultoría', href: ROUTES.SERVICES },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Nosotros', href: ROUTES.ABOUT },
        { name: 'Blog', href: ROUTES.BLOG },
        { name: 'Contacto', href: ROUTES.CONTACT },
        { name: 'Términos', href: '/terms' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Documentación', href: '/docs' },
        { name: 'API', href: '/api' },
        { name: 'Estado del Sistema', href: '/status' },
        { name: 'Política de Privacidad', href: '/privacy' },
      ],
    },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: CONFIG.SOCIAL.FACEBOOK,
      color: 'hover:text-blue-600' 
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: CONFIG.SOCIAL.TWITTER,
      color: 'hover:text-blue-400' 
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: CONFIG.SOCIAL.LINKEDIN,
      color: 'hover:text-blue-700' 
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: CONFIG.SOCIAL.INSTAGRAM,
      color: 'hover:text-pink-600' 
    },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <Container>
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">R</span>
                </div>
                <span className="font-bold text-xl text-foreground">
                  {CONFIG.COMPANY_NAME}
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                {CONFIG.COMPANY_TAGLINE}. Ofrecemos soluciones de hosting, 
                servidores gaming y servicios tecnológicos de alta calidad.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{CONFIG.CONTACT.EMAIL}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{CONFIG.CONTACT.PHONE}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{CONFIG.CONTACT.ADDRESS}</span>
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {CONFIG.COMPANY_NAME}. Todos los derechos reservados.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return social.href ? (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground transition-colors duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

