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
  Zap
} from 'lucide-react';
import Container from '../components/common/Container';

const SystemStatusPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      name: "Hosting Web",
      status: "operational",
      uptime: "99.98%",
      responseTime: "145ms",
      icon: <Globe className="w-5 h-5" />
    },
    {
      name: "Servidores Gaming",
      status: "operational", 
      uptime: "99.95%",
      responseTime: "89ms",
      icon: <Server className="w-5 h-5" />
    },
    {
      name: "Base de Datos",
      status: "operational",
      uptime: "99.99%",
      responseTime: "12ms",
      icon: <Database className="w-5 h-5" />
    },
    {
      name: "CDN Global",
      status: "operational",
      uptime: "99.97%",
      responseTime: "67ms",
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: "Sistema de Seguridad",
      status: "operational",
      uptime: "100%",
      responseTime: "23ms",
      icon: <Shield className="w-5 h-5" />
    },
    {
      name: "Panel de Control",
      status: "maintenance",
      uptime: "99.92%",
      responseTime: "234ms",
      icon: <Activity className="w-5 h-5" />
    }
  ];

  const incidents = [
    {
      id: 1,
      title: "Mantenimiento Programado - Panel de Control",
      status: "in-progress",
      severity: "low",
      startTime: "2025-08-14 02:00 UTC",
      description: "Actualización de seguridad programada para el panel de control. Tiempo estimado: 2 horas.",
      updates: [
        {
          time: "2025-08-14 02:00 UTC",
          message: "Mantenimiento iniciado. El panel de control puede experimentar intermitencias."
        },
        {
          time: "2025-08-14 01:45 UTC", 
          message: "Mantenimiento programado comenzará en 15 minutos."
        }
      ]
    },
    {
      id: 2,
      title: "Resolución de Latencia en Servidores EU",
      status: "resolved",
      severity: "medium",
      startTime: "2025-08-13 14:30 UTC",
      endTime: "2025-08-13 15:45 UTC",
      description: "Se detectó latencia elevada en algunos servidores de la región europea.",
      updates: [
        {
          time: "2025-08-13 15:45 UTC",
          message: "Problema resuelto. Todos los servicios funcionan normalmente."
        },
        {
          time: "2025-08-13 15:20 UTC",
          message: "Implementando solución. Latencia mejorando gradualmente."
        },
        {
          time: "2025-08-13 14:30 UTC",
          message: "Investigando reportes de latencia elevada en región EU."
        }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'maintenance':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'outage':
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
      case 'degraded':
        return 'Degradado';
      case 'outage':
        return 'Fuera de Servicio';
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
      case 'degraded':
        return 'text-orange-500';
      case 'outage':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };

  const getIncidentStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'investigating':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const overallStatus = services.every(service => service.status === 'operational') 
    ? 'operational' 
    : services.some(service => service.status === 'outage')
    ? 'outage'
    : 'degraded';

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
              Monitoreo en tiempo real del estado de todos nuestros servicios y infraestructura.
            </p>
          </div>

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
                <div className="text-3xl font-bold text-green-500">99.97%</div>
                <div className="text-sm text-muted-foreground">Uptime General</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">127ms</div>
                <div className="text-sm text-muted-foreground">Tiempo de Respuesta</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">6</div>
                <div className="text-sm text-muted-foreground">Servicios Activos</div>
              </div>
            </div>
          </motion.div>

          {/* Services Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-lg p-8 mb-12 border"
          >
            <h3 className="text-2xl font-semibold mb-6">Estado de Servicios</h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-background rounded-lg mr-4">
                      {service.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{service.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Uptime: {service.uptime} | Respuesta: {service.responseTime}
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
          </motion.div>

          {/* Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-lg p-8 border"
          >
            <h3 className="text-2xl font-semibold mb-6">Incidentes Recientes</h3>
            <div className="space-y-6">
              {incidents.map((incident) => (
                <div key={incident.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">{incident.title}</h4>
                      <p className="text-muted-foreground mb-3">{incident.description}</p>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getIncidentStatusColor(incident.status)}`}>
                          {incident.status === 'resolved' ? 'Resuelto' : 
                           incident.status === 'in-progress' ? 'En Progreso' : 'Investigando'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                          {incident.severity === 'low' ? 'Baja' : 
                           incident.severity === 'medium' ? 'Media' : 'Alta'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {incident.startTime}
                      </div>
                      {incident.endTime && (
                        <div className="mt-1">Resuelto: {incident.endTime}</div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-medium">Actualizaciones:</h5>
                    {incident.updates.map((update, updateIndex) => (
                      <div key={updateIndex} className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{update.time}</div>
                          <div className="text-sm text-muted-foreground">{update.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Subscribe to Updates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-primary/5 rounded-lg p-8 mt-12 text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">Mantente Informado</h3>
            <p className="text-muted-foreground mb-6">
              Suscríbete a nuestras notificaciones para recibir actualizaciones en tiempo real 
              sobre el estado de nuestros servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Suscribirse por Email
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                RSS Feed
              </button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default SystemStatusPage;

