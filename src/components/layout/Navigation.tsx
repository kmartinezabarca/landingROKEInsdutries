import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { CONFIG, ROUTES } from '../../utils/constants/config';
import ThemeToggle from './ThemeToggle';
import { cn } from '../../lib/utils';
import { useCategories } from '../../hooks/useCategories';
import { useServicePlans } from '../../hooks/useServicePlans';
import { getAvailableCategories } from '../../utils/serviceCatalog';
import WhatsAppService from '../../services/whatsapp/whatsappService';

interface NavigationItem {
  name: string;
  href: string;
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const { data: categories } = useCategories();
  const { data: servicePlans } = useServicePlans();

  const availableCategories = getAvailableCategories(categories, servicePlans);
  const featuredPlansLabel = availableCategories[0]?.name || 'Planes';

  const navigationItems: NavigationItem[] = [
    { name: 'Inicio',    href: ROUTES.HOME },
    { name: 'Servicios', href: ROUTES.SERVICES },
    { name: featuredPlansLabel, href: ROUTES.HOSTING },
    { name: 'Blog',      href: ROUTES.BLOG },
    { name: 'Nosotros',  href: ROUTES.ABOUT },
    { name: 'Contacto',  href: ROUTES.CONTACT },
  ];

  const isActiveRoute = (href: string): boolean => {
    if (href === ROUTES.HOME) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-[1296px] mx-auto px-6 md:px-14">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3 shrink-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3"
            >
              <img
                src="/ROKEIndustriesFusionLogo.png"
                alt="ROKE Industries"
                className="h-8 w-8 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-[15px] tracking-[0.02em] text-foreground">
                  {CONFIG.COMPANY_NAME.replace(' Industries', '')}
                </span>
                <span className="font-medium text-[9px] tracking-[0.22em] text-muted-foreground uppercase mt-[3px]">
                  Industries
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 text-[13.5px] text-muted-foreground font-medium">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'relative px-4 py-2.5 transition-colors duration-150 tracking-[0.01em]',
                  isActiveRoute(item.href)
                    ? 'text-foreground'
                    : 'hover:text-foreground'
                )}
              >
                {item.name}
                {isActiveRoute(item.href) && (
                  <motion.div
                    className="absolute left-4 right-4 bottom-[-1px] h-[2px] bg-foreground"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => WhatsAppService.quickContact()}
              className="inline-flex items-center gap-2 px-[18px] py-2.5 text-[13px] font-semibold rounded-[4px] bg-foreground text-background transition-all hover:-translate-y-px hover:shadow-lg"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Cotiza Ahora
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-[4px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-3 py-2.5 text-sm font-medium rounded-[4px] transition-colors',
                      isActiveRoute(item.href)
                        ? 'text-foreground bg-muted'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 pt-4 mt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      WhatsAppService.quickContact();
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-[4px] bg-foreground text-background"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Cotiza Ahora
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
