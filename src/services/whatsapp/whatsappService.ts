import { CONFIG } from '../../utils/constants/config';

type ServiceMessageKey = 'hosting' | 'gaming' | 'general' | 'support' | 'cloud' | 'development' | 'security';

/** Servicio para manejar la integración con WhatsApp */
export class WhatsAppService {
  /** Genera la URL de WhatsApp con mensaje predefinido */
  static generateWhatsAppURL(customMessage: string | null = null): string {
    const phone = CONFIG.CONTACT.WHATSAPP.replace(/[^\d]/g, '');
    const message = customMessage ?? CONFIG.WHATSAPP_MESSAGE;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  /** Abre WhatsApp en una nueva ventana */
  static openWhatsApp(customMessage: string | null = null): void {
    const url = this.generateWhatsAppURL(customMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /** Genera mensaje personalizado para diferentes servicios */
  static generateServiceMessage(service: string): string {
    const messages: Record<ServiceMessageKey, string> = {
      hosting: `¡Hola! Estoy interesado en sus servicios de hosting web.\n\nMe gustaría conocer:\n- Planes disponibles y precios\n- Características técnicas (storage, bandwidth, etc.)\n- Tiempo de activación\n- Soporte técnico incluido\n- Garantía de uptime\n\n¿Podrían enviarme información detallada?`,
      gaming: `¡Hola! Me interesa contratar un servidor gaming.\n\nNecesito información sobre:\n- Planes para servidores de juegos\n- Especificaciones técnicas (RAM, CPU, etc.)\n- Juegos soportados (Minecraft, CS:GO, etc.)\n- Instalación y configuración\n- Soporte técnico especializado\n\n¿Pueden ayudarme a elegir el plan adecuado?`,
      general: CONFIG.WHATSAPP_MESSAGE,
      support: `¡Hola! Necesito soporte técnico con mi servicio de ${CONFIG.COMPANY_NAME}.\n\nDetalles del problema:\n- [Describir el problema específico]\n- Cuándo comenzó el problema\n- Pasos ya realizados para solucionarlo\n- Impacto en el servicio\n\n¿Podrían ayudarme a resolverlo lo antes posible?`,
      cloud: `¡Hola! Estoy buscando soluciones de cloud hosting.\n\nMe interesa conocer:\n- Planes de cloud hosting disponibles\n- Escalabilidad y recursos\n- Características avanzadas (CDN, Load Balancer, etc.)\n- Precios y facturación\n- Migración desde mi proveedor actual\n\n¿Podrían proporcionarme más información?`,
      development: `¡Hola! Necesito servicios de desarrollo web.\n\nMi proyecto requiere:\n- Desarrollo de sitio web/aplicación\n- Tecnologías modernas (React, Node.js, etc.)\n- Diseño responsive\n- SEO y optimización\n- Mantenimiento y soporte\n\n¿Podrían ayudarme con una cotización?`,
      security: `¡Hola! Me interesa mejorar la seguridad de mi sitio web.\n\nNecesito información sobre:\n- Servicios de seguridad web\n- Protección contra DDoS y malware\n- Certificados SSL\n- Monitoreo y auditorías\n- Planes de protección disponibles\n\n¿Pueden asesorarme sobre la mejor solución?`,
    };

    return messages[service as ServiceMessageKey] ?? messages.general;
  }

  /** Genera mensaje de contacto general */
  static generateContactMessage(name = 'Cliente', service = 'Consulta general'): string {
    return `¡Hola! Soy ${name} y me interesa obtener información sobre ${service}.\n\nMe gustaría conocer más detalles sobre:\n- Características del servicio\n- Precios y planes disponibles\n- Tiempo de implementación\n- Soporte incluido\n\n¿Podrían ayudarme con esta información?\n\nGracias por su atención.`;
  }

  /** Genera mensaje para planes específicos */
  static generatePlanMessage(planName: string, planType: string, price: string): string {
    return `¡Hola! Estoy interesado en contratar el plan "${planName}" de ${planType}.\n\nPrecio: ${price}\n\nMe gustaría conocer:\n- Proceso de contratación\n- Tiempo de activación\n- Métodos de pago disponibles\n- Configuración inicial incluida\n- Soporte durante la implementación\n\n¿Podrían guiarme en el proceso de contratación?\n\nGracias.`;
  }

  /** Genera mensaje de soporte técnico */
  static generateSupportMessage(issueType = 'consulta técnica'): string {
    return `¡Hola! Necesito soporte técnico urgente.\n\nTipo de consulta: ${issueType}\n\nDetalles del problema:\n- [Describir el problema específico]\n- Cuándo comenzó el problema\n- Pasos ya realizados para solucionarlo\n- Impacto en el servicio\n\n¿Podrían ayudarme a resolverlo lo antes posible?\n\nGracias por su pronta atención.`;
  }

  /** Contacto rápido con mensaje predeterminado */
  static quickContact(): void {
    const message = `¡Hola! Me interesa conocer más sobre los servicios de ${CONFIG.COMPANY_NAME}.\n\n¿Podrían proporcionarme información sobre:\n- Servicios disponibles\n- Precios y planes\n- Proceso de contratación\n\nGracias.`;
    this.openWhatsApp(message);
  }

  /** Retorna true si WhatsApp está configurado */
  static isAvailable(): boolean {
    return !!CONFIG.CONTACT.WHATSAPP;
  }

  /** Obtiene el número de WhatsApp formateado */
  static getFormattedNumber(): string {
    return CONFIG.CONTACT.WHATSAPP ?? '';
  }
}

export default WhatsAppService;
