import apiClient from "@/lib/apiClient";

export const documentationService = {
  // Documentación
  getDocumentation: async () => {
    try {
      const response = await apiClient.get("/documentation");
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching documentation:", error);
      throw error;
    }
  },

  getDocumentationBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/documentation/${slug}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching documentation:", error);
      throw error;
    }
  },

  // API Documentation
  getApiDocumentation: async () => {
    try {
      const response = await apiClient.get("/api-documentation");
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching API documentation:", error);
      throw error;
    }
  },

  getApiDocumentationBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/api-documentation/${slug}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching API documentation:", error);
      throw error;
    }
  },

  // System Status
  getSystemStatus: async () => {
    try {
      const response = await apiClient.get("/system-status");
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching system status:", error);
      throw error;
    }
  },

  // User Requests (Unified)
  submitUserRequest: async (data) => {
    try {
      const response = await apiClient.post("/user-requests", data);
      return response.data;
    } catch (error) {
      console.error("Error submitting user request:", error);
      throw error;
    }
  },

  // Documentation Requests (uses unified endpoint)
  submitDocumentationRequest: async (name, email, topic, description) => {
    return documentationService.submitUserRequest({
      name,
      email,
      topic,
      description,
      kind: "documentation_request",
    });
  },

  // API Documentation Requests (uses unified endpoint)
  submitApiDocumentationRequest: async (name, email, topic, description) => {
    return documentationService.submitUserRequest({
      name,
      email,
      topic,
      description,
      kind: "api_documentation_request",
    });
  },

  // Blog Subscriptions (uses unified endpoint)
  subscribeToBlog: async (name, email) => {
    return documentationService.submitUserRequest({
      name: name || "Anónimo",
      email,
      kind: "blog_subscription",
      topic: "Suscripción al Blog",
      description: "Solicitud de suscripción al blog.",
    });
  },
};

export default documentationService;
