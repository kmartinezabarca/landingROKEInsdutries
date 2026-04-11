import apiClient from '@/lib/apiClient';
import type {
  ApiResponse,
  Documentation,
  UserRequestPayload,
  UserRequestKind,
  SystemService,
} from '../types/api';

export const documentationService = {
  // ---------------------------------------------------------------------------
  // Documentación general
  // ---------------------------------------------------------------------------

  getDocumentation: async (): Promise<Documentation[]> => {
    const response = await apiClient.get<ApiResponse<Documentation[]>>('/documentation');
    return response.data.data ?? [];
  },

  getDocumentationBySlug: async (slug: string): Promise<Documentation> => {
    const response = await apiClient.get<ApiResponse<Documentation>>(`/documentation/${slug}`);
    return response.data.data;
  },

  // ---------------------------------------------------------------------------
  // Documentación de API
  // ---------------------------------------------------------------------------

  getApiDocumentation: async (): Promise<Documentation[]> => {
    const response = await apiClient.get<ApiResponse<Documentation[]>>('/api-documentation');
    return response.data.data ?? [];
  },

  getApiDocumentationBySlug: async (slug: string): Promise<Documentation> => {
    const response = await apiClient.get<ApiResponse<Documentation>>(
      `/api-documentation/${slug}`
    );
    return response.data.data;
  },

  // ---------------------------------------------------------------------------
  // Estado del sistema
  // ---------------------------------------------------------------------------

  getSystemStatus: async (): Promise<SystemService[]> => {
    const response = await apiClient.get<ApiResponse<SystemService[]>>('/system-status');
    return response.data.data ?? [];
  },

  // ---------------------------------------------------------------------------
  // Solicitudes unificadas (/user-requests)
  // ---------------------------------------------------------------------------

  submitUserRequest: async (data: UserRequestPayload): Promise<unknown> => {
    const response = await apiClient.post('/user-requests', data);
    return response.data;
  },

  submitDocumentationRequest: async (
    name: string,
    email: string,
    topic: string,
    description?: string
  ): Promise<unknown> => {
    return documentationService.submitUserRequest({
      name,
      email,
      topic,
      description,
      kind: 'documentation_request' as UserRequestKind,
    });
  },

  submitApiDocumentationRequest: async (
    name: string,
    email: string,
    topic: string,
    description?: string
  ): Promise<unknown> => {
    return documentationService.submitUserRequest({
      name,
      email,
      topic,
      description,
      kind: 'api_documentation_request' as UserRequestKind,
    });
  },

  subscribeToBlog: async (name: string, email: string): Promise<unknown> => {
    return documentationService.submitUserRequest({
      name: name || 'Anónimo',
      email,
      kind: 'blog_subscription' as UserRequestKind,
      topic: 'Suscripción al Blog',
      description: 'Solicitud de suscripción al blog.',
    });
  },
};

export default documentationService;
