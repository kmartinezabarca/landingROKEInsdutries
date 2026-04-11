import { describe, it, expect, vi, beforeEach } from 'vitest';
import { documentationService } from '@/services/documentationService';

vi.mock('@/lib/apiClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import apiClient from '@/lib/apiClient';

const mockDocs = [
  {
    uuid: 'doc-1',
    title: 'Primeros pasos con hosting',
    slug: 'primeros-pasos-hosting',
    content: '# Primeros pasos\n\nContenido...',
    updated_at: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

describe('documentationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDocumentation', () => {
    it('retorna el array de documentos', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { data: mockDocs } });

      const result = await documentationService.getDocumentation();
      expect(apiClient.get).toHaveBeenCalledWith('/documentation');
      expect(result).toEqual(mockDocs);
    });

    it('retorna array vacío cuando data es null', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { data: null } });

      const result = await documentationService.getDocumentation();
      expect(result).toEqual([]);
    });

    it('propaga el error cuando el API falla', async () => {
      vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Server Error'));
      await expect(documentationService.getDocumentation()).rejects.toThrow('Server Error');
    });
  });

  describe('submitUserRequest', () => {
    it('envía la solicitud al endpoint correcto', async () => {
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: { success: true } });

      await documentationService.submitUserRequest({
        name: 'Ana',
        email: 'ana@test.com',
        topic: 'Hosting',
        kind: 'contact',
      });

      expect(apiClient.post).toHaveBeenCalledWith('/user-requests', {
        name: 'Ana',
        email: 'ana@test.com',
        topic: 'Hosting',
        kind: 'contact',
      });
    });
  });

  describe('submitDocumentationRequest', () => {
    it('envía con kind correcto', async () => {
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: {} });

      await documentationService.submitDocumentationRequest(
        'Carlos',
        'carlos@test.com',
        'Configurar DNS',
        'Necesito ayuda con...'
      );

      expect(apiClient.post).toHaveBeenCalledWith('/user-requests', expect.objectContaining({
        kind: 'documentation_request',
        name: 'Carlos',
        email: 'carlos@test.com',
        topic: 'Configurar DNS',
      }));
    });
  });

  describe('subscribeToBlog', () => {
    it('envía suscripción con kind correcto', async () => {
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: {} });

      await documentationService.subscribeToBlog('Suscriptor', 'user@test.com');

      expect(apiClient.post).toHaveBeenCalledWith('/user-requests', expect.objectContaining({
        kind: 'blog_subscription',
        email: 'user@test.com',
        topic: 'Suscripción al Blog',
      }));
    });

    it('usa "Anónimo" si no se pasa nombre', async () => {
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: {} });

      await documentationService.subscribeToBlog('', 'user@test.com');

      expect(apiClient.post).toHaveBeenCalledWith('/user-requests', expect.objectContaining({
        name: 'Anónimo',
      }));
    });
  });
});
