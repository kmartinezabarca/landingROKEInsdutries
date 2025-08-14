import { CONFIG } from '../../utils/constants/config.js';

/**
 * Servicio para manejar la integración con WhatsApp
 */
export class WhatsAppService {
  /**
   * Genera la URL de WhatsApp con mensaje predefinido
   * @param {string} customMessage - Mensaje personalizado (opcional)
   * @returns {string} URL de WhatsApp
   */
  static generateWhatsAppURL(customMessage = null) {
    const phone = CONFIG.CONTACT.WHATSAPP.replace(/[^\d]/g, ''); // Remover caracteres no numéricos
    const message = customMessage || CONFIG.WHATSAPP_MESSAGE;
    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${phone}?text=${encodedMessage}`;
  }

  /**
   * Abre WhatsApp en una nueva ventana
   * @param {string} customMessage - Mensaje personalizado (opcional)
   */
  static openWhatsApp(customMessage = null) {
    const url = this.generateWhatsAppURL(customMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Genera mensaje personalizado para diferentes servicios
   * @param {string} service - Tipo de servicio
   * @returns {string} Mensaje personalizado
   */
  static generateServiceMessage(service) {
    const messages = {
      hosting: `¡Hola! Estoy interesado en sus servicios de hosting web.

Me gustaría conocer:
- Planes disponibles y precios
- Características técnicas (storage, bandwidth, etc.)
- Tiempo de activación
- Soporte técnico incluido
- Garantía de uptime

¿Podrían enviarme información detallada?`,

      gaming: `¡Hola! Me interesa contratar un servidor gaming.

Necesito información sobre:
- Planes para servidores de juegos
- Especificaciones técnicas (RAM, CPU, etc.)
- Juegos soportados (Minecraft, CS:GO, etc.)
- Instalación y configuración
- Soporte técnico especializado

¿Pueden ayudarme a elegir el plan adecuado?`,

      general: CONFIG.WHATSAPP_MESSAGE,

      support: `¡Hola! Necesito soporte técnico con mi servicio de ${CONFIG.COMPANY_NAME}.

Detalles del problema:
- [Describir el problema específico]
- Cuándo comenzó el problema
- Pasos ya realizados para solucionarlo
- Impacto en el servicio

¿Podrían ayudarme a resolverlo lo antes posible?`,

      cloud: `¡Hola! Estoy buscando soluciones de cloud hosting.

Me interesa conocer:
- Planes de cloud hosting disponibles
- Escalabilidad y recursos
- Características avanzadas (CDN, Load Balancer, etc.)
- Precios y facturación
- Migración desde mi proveedor actual

¿Podrían proporcionarme más información?`,

      development: `¡Hola! Necesito servicios de desarrollo web.

Mi proyecto requiere:
- Desarrollo de sitio web/aplicación
- Tecnologías modernas (React, Node.js, etc.)
- Diseño responsive
- SEO y optimización
- Mantenimiento y soporte

¿Podrían ayudarme con una cotización?`,

      security: `¡Hola! Me interesa mejorar la seguridad de mi sitio web.

Necesito información sobre:
- Servicios de seguridad web
- Protección contra DDoS y malware
- Certificados SSL
- Monitoreo y auditorías
- Planes de protección disponibles

¿Pueden asesorarme sobre la mejor solución?`
    };

    return messages[service] || messages.general;
  }

  /**
   * Genera mensaje de contacto general
   * @param {string} name - Nombre del cliente
   * @param {string} service - Servicio de interés
   * @returns {string} Mensaje personalizado
   */
  static generateContactMessage(name = 'Cliente', service = 'Consulta general') {
    return `¡Hola! Soy ${name} y me interesa obtener información sobre ${service}. 

Me gustaría conocer más detalles sobre:
- Características del servicio
- Precios y planes disponibles  
- Tiempo de implementación
- Soporte incluido

¿Podrían ayudarme con esta información?

Gracias por su atención.`;
  }

  /**
   * Genera mensaje para planes específicos
   * @param {string} planName - Nombre del plan
   * @param {string} planType - Tipo de plan (hosting/gaming)
   * @param {string} price - Precio del plan
   * @returns {string} Mensaje personalizado
   */
  static generatePlanMessage(planName, planType, price) {
    return `¡Hola! Estoy interesado en contratar el plan "${planName}" de ${planType}.

Precio: ${price}

Me gustaría conocer:
- Proceso de contratación
- Tiempo de activación
- Métodos de pago disponibles
- Configuración inicial incluida
- Soporte durante la implementación

¿Podrían guiarme en el proceso de contratación?

Gracias.`;
  }

  /**
   * Genera mensaje de soporte técnico
   * @param {string} issueType - Tipo de problema
   * @returns {string} Mensaje de soporte
   */
  static generateSupportMessage(issueType = 'consulta técnica') {
    return `¡Hola! Necesito soporte técnico urgente.

Tipo de consulta: ${issueType}

Detalles del problema:
- [Describir el problema específico]
- Cuándo comenzó el problema
- Pasos ya realizados para solucionarlo
- Impacto en el servicio

¿Podrían ayudarme a resolverlo lo antes posible?

Gracias por su pronta atención.`;
  }

  /**
   * Contacto rápido con mensaje predeterminado
   */
  static quickContact() {
    const message = `¡Hola! Me interesa conocer más sobre los servicios de ${CONFIG.COMPANY_NAME}.

¿Podrían proporcionarme información sobre:
- Servicios disponibles
- Precios y planes
- Proceso de contratación

Gracias.`;

    this.openWhatsApp(message);
  }

  /**
   * Validar si WhatsApp está disponible
   * @returns {boolean} True si está configurado
   */
  static isAvailable() {
    return !!CONFIG.CONTACT.WHATSAPP;
  }

  /**
   * Obtener número formateado para mostrar
   * @returns {string} Número formateado
   */
  static getFormattedNumber() {
    if (!CONFIG.CONTACT.WHATSAPP) return '';
    return CONFIG.CONTACT.WHATSAPP;
  }
}

export default WhatsAppService;

