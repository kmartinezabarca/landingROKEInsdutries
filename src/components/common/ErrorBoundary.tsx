import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  /** Componente alternativo personalizado (opcional) */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Captura errores de React en tiempo de renderizado y muestra una UI de recuperación.
 * Envuelve el árbol completo de la app para evitar pantallas en blanco.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    // TODO: Integrar con Sentry u otro servicio de monitoreo
    // Sentry.captureException(error, { extra: errorInfo });
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Error capturado:', error, errorInfo);
    }
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleGoHome = (): void => {
    window.location.href = '/';
  };

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-lg w-full text-center">
            {/* Icono */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Título */}
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Algo salió mal
            </h1>
            <p className="text-muted-foreground mb-8">
              Ocurrió un error inesperado. Puedes intentar recargar la página
              o volver al inicio.
            </p>

            {/* Detalle del error en desarrollo */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-8 text-left bg-muted rounded-lg p-4 border border-border">
                <summary className="text-sm font-medium text-foreground cursor-pointer mb-2">
                  Detalle del error (solo en desarrollo)
                </summary>
                <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-muted transition-colors font-medium text-foreground"
              >
                <RefreshCw className="w-4 h-4" />
                Intentar de nuevo
              </button>
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-muted transition-colors font-medium text-foreground"
              >
                <RefreshCw className="w-4 h-4" />
                Recargar página
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                <Home className="w-4 h-4" />
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
