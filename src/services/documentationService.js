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

  // Documentation Requests
  submitDocumentationRequest: async (data) => {
    try {
      const response = await apiClient.post("/documentation-requests", data);
      return response.data;
    } catch (error) {
      console.error("Error submitting documentation request:", error);
      throw error;
    }
  },

  // Blog Subscriptions
  subscribeToBlog: async (email) => {
    try {
      const response = await apiClient.post("/blog/subscribe", { email });
      return response.data;
    } catch (error) {
      console.error("Error subscribing to blog:", error);
      throw error;
    }
  },
};

export default documentationService;
