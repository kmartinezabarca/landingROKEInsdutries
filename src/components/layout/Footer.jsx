import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa6';
import { CONFIG, ROUTES } from '../../utils/constants/config';
import Container from '../common/Container';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation("footer");
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t("sections.services.title"),
      links: [
        { name: t("sections.services.hosting"), href: ROUTES.HOSTING },
        { name: t("sections.services.gaming"), href: ROUTES.HOSTING + "#gaming" },
        { name: t("sections.services.support"), href: ROUTES.CONTACT },
        { name: t("sections.services.consulting"), href: ROUTES.SERVICES },
      ],
    },
    {
      title: t("sections.company.title"),
      links: [
        { name: t("sections.company.about"), href: ROUTES.ABOUT },
        { name: t("sections.company.blog"), href: ROUTES.BLOG },
        { name: t("sections.company.contact"), href: ROUTES.CONTACT },
        { name: t("sections.company.terms"), href: "/terms" },
      ],
    },
    {
      title: t("sections.resources.title"),
      links: [
        { name: t("sections.resources.docs"), href: "/docs" },
        { name: t("sections.resources.api"), href: "/api" },
        { name: t("sections.resources.status"), href: "/status" },
        { name: t("sections.resources.privacy"), href: "/privacy" },
      ],
    },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: FaFacebook, 
      href: CONFIG.SOCIAL.FACEBOOK,
      color: 'hover:text-blue-600' 
    },
    { 
      name: 'Twitter', 
      icon: FaXTwitter, 
      href: CONFIG.SOCIAL.TWITTER,
      color: 'hover:text-blue-400' 
    },
    { 
      name: 'LinkedIn', 
      icon: FaLinkedin, 
      href: CONFIG.SOCIAL.LINKEDIN,
      color: 'hover:text-blue-700' 
    },
    { 
      name: 'Instagram', 
      icon: FaInstagram, 
      href: CONFIG.SOCIAL.INSTAGRAM,
      color: 'hover:text-pink-600' 
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      href: CONFIG.SOCIAL.YOUTUBE,
      color: 'hover:text-red-600' 
    }
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
                {CONFIG.COMPANY_TAGLINE}. {t("description")}
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
              © {currentYear} {CONFIG.COMPANY_NAME}. {t("copyright")}
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

