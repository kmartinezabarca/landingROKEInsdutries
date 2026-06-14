import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Fallback opcional; si no se pasa, se usa el fallback por defecto de ROKE. */
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Frontera de error de React. Evita que un fallo de render en cualquier sección
 * (p. ej. la escena WebGL/Three.js cuando el dispositivo no soporta WebGL) tire
 * toda la aplicación a pantalla blanca. Muestra un fallback con la identidad
 * visual de ROKE y deja intactos Navigation/Footer al envolver solo el área de
 * contenido.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // En producción esto puede enviarse a un servicio de monitoreo (Sentry, etc.).
    console.error('ErrorBoundary capturó un error:', error, info);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): React.ReactNode {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <section className="min-h-[60vh] flex items-center justify-center py-[80px] px-6">
        <div className="max-w-[520px] w-full text-center flex flex-col items-center gap-6">
          <div className="w-14 h-14 border border-border flex items-center justify-center text-foreground">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground">
            <div className="w-8 h-[1px] bg-muted-foreground" />
            <span>Error inesperado</span>
          </div>
          <h1 className="font-sans text-[32px] md:text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-foreground m-0">
            Algo salió mal.
          </h1>
          <p className="text-[16px] leading-[1.55] text-muted-foreground">
            Ocurrió un error al mostrar esta sección. Puedes intentar recargarla o
            volver al inicio. Si el problema persiste, escríbenos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reintentar
            </button>
            <a
              href="/"
              className="inline-flex items-center h-11 px-6 border border-border text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Ir al inicio
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default ErrorBoundary;
