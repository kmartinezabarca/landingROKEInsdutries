import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type SupportedLang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * Selector de idioma compacto para la barra de navegación.
 * Muestra el código del idioma activo con bandera y permite cambiar.
 */
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] as SupportedLang;

  const handleChange = (lang: SupportedLang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Globe className="w-4 h-4 text-muted-foreground" />
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          title={lang.label}
          className={cn(
            'px-2 py-1 text-xs font-semibold rounded transition-colors',
            currentLang === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
        >
          {lang.flag} {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
