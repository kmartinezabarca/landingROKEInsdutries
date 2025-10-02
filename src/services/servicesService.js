import apiClient from "../lib/apiClient";

export const getServices = async () => {
  const response = await apiClient.get("/services");
  return response.data;
};

