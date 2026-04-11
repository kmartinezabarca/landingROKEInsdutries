import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/common/SEO';

const renderWithHelmet = (ui: React.ReactElement) => {
  return render(<HelmetProvider>{ui}</HelmetProvider>);
};

describe('SEO', () => {
  it('renderiza sin errores con props por defecto', () => {
    expect(() => renderWithHelmet(<SEO />)).not.toThrow();
  });

  it('renderiza sin errores con title personalizado', () => {
    expect(() =>
      renderWithHelmet(
        <SEO
          title="Contacto"
          description="Contáctanos para más información"
          canonical="/contact"
        />
      )
    ).not.toThrow();
  });

  it('renderiza sin errores con noIndex=true', () => {
    expect(() =>
      renderWithHelmet(<SEO title="Privado" noIndex={true} />)
    ).not.toThrow();
  });
});
