import React from 'react';
import { motion } from 'framer-motion';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Container from '../components/common/Container';
import { ROUTES } from '../utils/constants/config';

/**
 * Página de error genérica.
 * Funciona tanto como fallback de React Router (useRouteError)
 * como componente standalone para errores de la aplicación.
 */
const ErrorPage: React.FC = () => {
  const routeError = useRouteError();

  const getErrorMessage = (): string => {
    if (isRouteErrorResponse(routeError)) {
      if (routeError.status === 404) return 'No pudimos encontrar la página.';
      if (routeError.status === 401) return 'No tienes permiso para ver esta página.';
      if (routeError.status === 503) return 'El servicio no está disponible en este momento.';
      return routeError.data?.message ?? 'Ocurrió un error en el servidor.';
    }
    if (routeError instanceof Error) return routeError.message;
    return 'Ocurrió un error inesperado.';
  };

  const getStatusCode = (): number | null => {
    if (isRouteErrorResponse(routeError)) return routeError.status;
    return null;
  };

  const statusCode = getStatusCode();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Container className="py-20">
        <div className="max-w-xl mx-auto text-center">
          {/* Icono */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          </motion.div>

          {/* Código de estado */}
          {statusCode && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-6xl font-extrabold text-red-500 dark:text-red-400 mb-4"
            >
              {statusCode}
            </motion.p>
          )}

          {/* Título y mensaje */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Algo salió mal
            </h1>
            <p className="text-muted-foreground text-base mb-10">
              {getErrorMessage()}
            </p>
          </motion.div>

          {/* Acciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-semibold text-foreground"
            >
              <RefreshCw className="w-5 h-5" />
              Recargar
            </button>
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
            >
              <Home className="w-5 h-5" />
              Ir al inicio
            </Link>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;
