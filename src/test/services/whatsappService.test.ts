import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WhatsAppService } from '@/services/whatsapp/whatsappService';

// Mock window.open para no abrir ventanas reales en tests
const mockWindowOpen = vi.fn();
vi.stubGlobal('window', { ...window, open: mockWindowOpen });

describe('WhatsAppService', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  describe('generateWhatsAppURL', () => {
    it('genera una URL válida de WhatsApp con el número configurado', () => {
      const url = WhatsAppService.generateWhatsAppURL();
      expect(url).toMatch(/^https:\/\/wa\.me\/\d+/);
    });

    it('incluye el mensaje codificado en la URL', () => {
      const message = 'Hola, necesito información';
      const url = WhatsAppService.generateWhatsAppURL(message);
      expect(url).toContain(encodeURIComponent(message));
    });

    it('elimina caracteres no numéricos del número de teléfono', () => {
      const url = WhatsAppService.generateWhatsAppURL('test');
      // La URL debe contener solo dígitos después de wa.me/
      const match = url.match(/wa\.me\/(\d+)/);
      expect(match).not.toBeNull();
      expect(match![1]).toMatch(/^\d+$/);
    });

    it('usa el mensaje predeterminado si no se pasa uno', () => {
      const url = WhatsAppService.generateWhatsAppURL();
      expect(url).toContain('wa.me');
      expect(url).toContain('text=');
    });
  });

  describe('generateContactMessage', () => {
    it('incluye el nombre del cliente en el mensaje', () => {
      const msg = WhatsAppService.generateContactMessage('Carlos', 'Hosting');
      expect(msg).toContain('Carlos');
    });

    it('incluye el servicio de interés en el mensaje', () => {
      const msg = WhatsAppService.generateContactMessage('Ana', 'Cloud Hosting');
      expect(msg).toContain('Cloud Hosting');
    });

    it('usa valores por defecto si no se pasan argumentos', () => {
      const msg = WhatsAppService.generateContactMessage();
      expect(msg).toContain('Cliente');
    });
  });

  describe('generateServiceMessage', () => {
    it('retorna mensaje específico para hosting', () => {
      const msg = WhatsAppService.generateServiceMessage('hosting');
      expect(msg).toContain('hosting web');
    });

    it('retorna mensaje específico para gaming', () => {
      const msg = WhatsAppService.generateServiceMessage('gaming');
      expect(msg).toContain('gaming');
    });

    it('retorna mensaje general para servicios desconocidos', () => {
      const generalMsg = WhatsAppService.generateServiceMessage('general');
      const unknownMsg = WhatsAppService.generateServiceMessage('servicio-inexistente');
      expect(unknownMsg).toBe(generalMsg);
    });
  });

  describe('generatePlanMessage', () => {
    it('incluye el nombre del plan en el mensaje', () => {
      const msg = WhatsAppService.generatePlanMessage('Plan Pro', 'hosting', '$9.99/mes');
      expect(msg).toContain('Plan Pro');
    });

    it('incluye el precio en el mensaje', () => {
      const msg = WhatsAppService.generatePlanMessage('Básico', 'gaming', '$5.99/mes');
      expect(msg).toContain('$5.99/mes');
    });
  });

  describe('isAvailable', () => {
    it('retorna true cuando WhatsApp está configurado', () => {
      expect(WhatsAppService.isAvailable()).toBe(true);
    });
  });

  describe('getFormattedNumber', () => {
    it('retorna un string no vacío', () => {
      expect(WhatsAppService.getFormattedNumber()).toBeTruthy();
    });
  });
});
