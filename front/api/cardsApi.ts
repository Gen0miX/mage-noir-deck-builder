import apiClient from "@/api/apiClient";

export const fetchCards = async () => {
  const response = await apiClient.get("/cards");
  return response.data;
};

export const fetchCardById = async (id: number) => {
  const response = await apiClient.get(`/cards/${id}`);
  return response.data;
};

export const filterCards = async (filters: Record<string, any>) => {
  const response = await apiClient.get("/cards/filter", { params: filters });
  return response.data;
};
