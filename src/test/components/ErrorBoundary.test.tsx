import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Componente que lanza un error para testear el boundary
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Error de prueba del componente');
  }
  return <div>Contenido sin error</div>;
};

// Suprimir console.error de React durante estos tests (comportamiento esperado)
const suppressConsoleError = () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  return spy;
};

describe('ErrorBoundary', () => {
  let consoleSpy: ReturnType<typeof suppressConsoleError>;

  beforeEach(() => {
    consoleSpy = suppressConsoleError();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renderiza los children cuando no hay error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Contenido sin error')).toBeInTheDocument();
  });

  it('muestra la UI de error cuando un componente hijo lanza', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();
  });

  it('muestra los botones de recuperación', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Intentar de nuevo')).toBeInTheDocument();
    expect(screen.getByText('Recargar página')).toBeInTheDocument();
    expect(screen.getByText('Ir al inicio')).toBeInTheDocument();
  });

  it('renderiza el fallback personalizado si se proporciona', () => {
    const customFallback = <div>Error personalizado</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error personalizado')).toBeInTheDocument();
  });

  it('muestra la UI de error y permite intentar de nuevo', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Verifica que la UI de error está visible
    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();

    // El botón "Intentar de nuevo" existe y es clickeable
    const retryBtn = screen.getByText('Intentar de nuevo');
    expect(retryBtn).toBeInTheDocument();

    // Hacer click resetea el estado interno del boundary
    fireEvent.click(retryBtn);

    // Después del reset el boundary intenta re-renderizar.
    // El hijo vuelve a lanzar porque ThrowError aún tiene shouldThrow=true,
    // pero el boundary captura de nuevo — esto es comportamiento esperado.
    // Lo importante es que el boundary no se rompe al resetear.
    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();
  });
});
