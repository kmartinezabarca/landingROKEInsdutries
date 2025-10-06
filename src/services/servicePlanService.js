import apiClient from "../lib/apiClient";

export const getServicePlans = async () => {
  const response = await apiClient.get("/service-plans");
  return response.data;
};

