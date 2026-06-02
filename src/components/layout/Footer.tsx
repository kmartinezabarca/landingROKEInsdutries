import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { FaXTwitter, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa6';
import { CONFIG, ROUTES } from '@/utils/constants/config';
import { useTheme } from '@/contexts/ThemeContext';
import WhatsAppService from '@/services/whatsapp/whatsappService';

/* ── inline style helpers — use CSS vars so dark mode works ── */
const fg       = 'var(--foreground)';
const muted    = 'var(--muted-foreground)';
const borderC  = 'var(--border)';
const bgC      = 'var(--background)';
const mutedBg  = 'var(--muted)';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  const productLinks = [
    { name: 'Web Hosting',        href: ROUTES.HOSTING },
    { name: 'Game Servers',       href: ROUTES.HOSTING + '#gaming' },
    { name: 'IoT & Robótica',     href: ROUTES.SERVICES },
    { name: 'Cloud & DevOps',     href: ROUTES.SERVICES },
    { name: 'Estado del sistema', href: '/status' },
  ];

  const companyLinks = [
    { name: 'Nosotros',       href: ROUTES.ABOUT   },
    { name: 'Casos de éxito', href: ROUTES.ABOUT   },
    { name: 'Blog',           href: ROUTES.BLOG    },
    { name: 'Carreras',       href: ROUTES.CONTACT },
    { name: 'Contacto',       href: ROUTES.CONTACT },
  ];

  // Social buttons always shown — use configured URL or '#' as fallback
  const socialLinks = [
    { name: 'X / Twitter', icon: FaXTwitter, href: CONFIG.SOCIAL.TWITTER  || '#' },
    { name: 'LinkedIn',     icon: FaLinkedin, href: CONFIG.SOCIAL.LINKEDIN || '#' },
    { name: 'GitHub',       icon: FaGithub,   href: (CONFIG.SOCIAL as any).GITHUB   || '#' },
    { name: 'Discord',      icon: FaDiscord,  href: (CONFIG.SOCIAL as any).DISCORD  || '#' },
  ];

  const linkStyle: React.CSSProperties = {
    fontSize: '14px', color: fg, textDecoration: 'none',
    opacity: 0.72, transition: 'opacity 0.15s',
    fontFamily: '"Montserrat", system-ui, sans-serif',
    overflowWrap: 'anywhere',
  };

  return (
    <footer style={{ borderTop: `1px solid ${borderC}`, backgroundColor: bgC, color: fg, fontFamily: '"Montserrat", system-ui, sans-serif' }}>

      {/* ── Main grid ── */}
      <div className="roke-footer-main">
        <div className="roke-footer-grid">

          {/* ── Brand ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Logo */}
            <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <img src={isDark ? '/roke_white.png' : '/roke_black.png'} alt="ROKE Industries"
                style={{ height: '32px', width: '32px', objectFit: 'contain' }} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '0.02em', color: fg }}>
                  {CONFIG.COMPANY_NAME.replace(' Industries', '')}
                </span>
                <span style={{ fontWeight: 500, fontSize: '9px', letterSpacing: '0.22em', color: muted, textTransform: 'uppercase', marginTop: '3px' }}>
                  Industries
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p style={{ fontSize: '14px', lineHeight: 1.65, color: muted, maxWidth: '280px', margin: 0 }}>
              Infraestructura digital, hosting y soluciones IoT/Cloud para empresas que no pueden permitirse caer.
            </p>

            {/* ── Social icons ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {socialLinks.map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.name} title={s.name}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '36px', height: '36px',
                      borderRadius: '50%',
                      border: `1px solid ${borderC}`,
                      color: muted, textDecoration: 'none',
                      transition: 'border-color 0.15s, color 0.15s, background-color 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = fg;
                      e.currentTarget.style.color = fg;
                      e.currentTarget.style.backgroundColor = mutedBg;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = borderC;
                      e.currentTarget.style.color = muted;
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}>
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Producto ── */}
          <div>
            <p style={{ marginBottom: '20px', fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.22em', color: muted, margin: '0 0 20px 0' }}>
              Producto
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {productLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.72')}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Empresa ── */}
          <div>
            <p style={{ marginBottom: '20px', fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.22em', color: muted, margin: '0 0 20px 0' }}>
              Empresa
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {companyLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.72')}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contacto ── */}
          <div>
            <p style={{ marginBottom: '20px', fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.22em', color: muted, margin: '0 0 20px 0' }}>
              Contacto
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <li>
                <a href={`mailto:${CONFIG.CONTACT?.EMAIL}`} style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.72')}>
                  {CONFIG.CONTACT?.EMAIL}
                </a>
              </li>
              <li>
                <button type="button" onClick={() => WhatsAppService.openWhatsApp()}
                  style={{ ...linkStyle, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', display: 'block' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.72')}>
                  {CONFIG.CONTACT?.PHONE}
                </button>
              </li>
              <li>
                <span style={{ ...linkStyle, cursor: 'default' }}>{CONFIG.CONTACT?.ADDRESS}</span>
              </li>
              <li>
                <button type="button" onClick={() => WhatsAppService.openWhatsApp()}
                  style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '7px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.72')}>
                  <MessageCircle size={14} />WhatsApp
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: `1px solid ${borderC}` }}>
        <div className="roke-footer-bottom">
          <p style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', color: muted, margin: 0 }}>
            © {currentYear} ROKE Industries · Todos los derechos reservados
          </p>
          <div className="roke-footer-legal">
            {[
              { label: 'Privacidad', to: '/privacy' },
              { label: 'Términos',   to: '/terms'   },
              { label: 'Cookies',    to: '/privacy' },
            ].map(item => (
              <Link key={item.label} to={item.to}
                style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', color: muted, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = fg)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
