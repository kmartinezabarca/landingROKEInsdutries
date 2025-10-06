import apiClient from "../lib/apiClient";

export const getAllServices = async () => {
  const response = await apiClient.get("/all-services"); // Nuevo endpoint para todos los servicios
  return response.data;
};

