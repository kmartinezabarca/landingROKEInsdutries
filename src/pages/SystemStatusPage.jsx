import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Server, 
  Globe, 
  Database,
  Shield,
  Zap,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Container from '../components/common/Container';
import documentationService from '../services/documentationService';

const SystemStatusPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadSystemStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await documentationService.getSystemStatus();
        setStatuses(data);
      } catch (err) {
        console.error("Error loading system status:", err);
        setError("No se pudo cargar el estado del sistema. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadSystemStatus();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'maintenance':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'degraded_performance':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'partial_outage':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'major_outage':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational':
        return 'Operacional';
      case 'maintenance':
        return 'Mantenimiento';
      case 'degraded_performance':
        return 'Rendimiento Degradado';
      case 'partial_outage':
        return 'Interrupción Parcial';
      case 'major_outage':
        return 'Interrupción Total';
      default:
        return 'Operacional';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-500';
      case 'maintenance':
        return 'text-yellow-500';
      case 'degraded_performance':
        return 'text-orange-500';
      case 'partial_outage':
        return 'text-orange-500';
      case 'major_outage':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };

  const overallStatus = statuses.length > 0
    ? statuses.every(status => status.status === 'operational')
      ? 'operational'
      : statuses.some(status => status.status === 'major_outage')
      ? 'major_outage'
      : 'degraded_performance'
    : 'operational';

  const getServiceIcon = (serviceName) => {
    const name = serviceName.toLowerCase();
    if (name.includes('hosting') || name.includes('web')) return <Globe className="w-5 h-5" />;
    if (name.includes('gaming') || name.includes('servidor')) return <Server className="w-5 h-5" />;
    if (name.includes('base') || name.includes('database')) return <Database className="w-5 h-5" />;
    if (name.includes('cdn') || name.includes('global')) return <Zap className="w-5 h-5" />;
    if (name.includes('seguridad') || name.includes('security')) return <Shield className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Activity className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Estado del Sistema
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Monitoreo en tiempo real del estado de todos nuestros servicios e infraestructura.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-4 shadow-sm"
            >
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                  Error al cargar el estado del sistema
                </h3>
                <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Overall Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-lg p-8 mb-12 border"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    {getStatusIcon(overallStatus)}
                    <h2 className="text-2xl font-semibold ml-3">
                      Estado General: <span className={getStatusColor(overallStatus)}>
                        {getStatusText(overallStatus)}
                      </span>
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Última actualización</div>
                    <div className="font-mono text-sm">
                      {currentTime.toLocaleString('es-ES', {
                        timeZone: 'UTC',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })} UTC
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">
                      {statuses.length > 0 
                        ? ((statuses.filter(s => s.status === 'operational').length / statuses.length) * 100).toFixed(1)
                        : 100}%
                    </div>
                    <div className="text-sm text-muted-foreground">Servicios Operacionales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">
                      {statuses.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Servicios Monitoreados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500">
                      {statuses.filter(s => s.status !== 'operational').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Problemas Detectados</div>
                  </div>
                </div>
              </motion.div>

              {/* Services Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card rounded-lg p-8 border"
              >
                <h3 className="text-2xl font-semibold mb-6">Estado de Servicios</h3>
                {statuses.length > 0 ? (
                  <div className="space-y-4">
                    {statuses.map((service) => (
                      <div key={service.uuid} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-background rounded-lg mr-4">
                            {getServiceIcon(service.service_name)}
                          </div>
                          <div>
                            <div className="font-semibold">{service.service_name}</div>
                            {service.message && (
                              <div className="text-sm text-muted-foreground">
                                {service.message}
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground mt-1">
                              Actualizado: {new Date(service.last_updated).toLocaleDateString('es-ES')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {getStatusIcon(service.status)}
                          <span className={`ml-2 font-medium ${getStatusColor(service.status)}`}>
                            {getStatusText(service.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay servicios disponibles
                  </div>
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default SystemStatusPage;
