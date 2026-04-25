import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { CONFIG, ROUTES } from '../../utils/constants/config';
import Container from '../common/Container';
import Button from '../common/Button';
import ThemeToggle from './ThemeToggle';
import { cn } from '../../lib/utils';

interface NavigationItem {
  name: string;
  href: string;
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    { name: 'Inicio', href: ROUTES.HOME },
    { name: 'Servicios', href: ROUTES.SERVICES },
    { name: 'Hosting', href: ROUTES.HOSTING },
    { name: 'Blog', href: ROUTES.BLOG },
    { name: 'Nosotros', href: ROUTES.ABOUT },
    { name: 'Contacto', href: ROUTES.CONTACT },
  ];

  const isActiveRoute = (href: string): boolean => {
    if (href === ROUTES.HOME) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl text-foreground">
                {CONFIG.COMPANY_NAME}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
                  isActiveRoute(item.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.name}
                {isActiveRoute(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
              <a href="https://wa.me/+1234567890?text=Hola%20ROKE%20Industries%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20sus%20servicios" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Cotiza Ahora
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200',
                      isActiveRoute(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2 mt-4 pt-4 border-t border-border">
                  <Button size="sm" asChild className="w-full bg-primary hover:bg-primary/90">
                    <a href="https://wa.me/+1234567890?text=Hola%20ROKE%20Industries%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20sus%20servicios" className="flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Cotiza Ahora
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
};

export default Navigation;
