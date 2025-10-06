import apiClient from "../lib/apiClient";

export const getBillingCycles = async () => {
  const response = await apiClient.get("/billing-cycles");
  return response.data;
};

