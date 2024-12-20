import apiClient from "@/api/apiClient";

export const fetchCards = async () => {
  const response = await apiClient.get("/cards");
  return response.data;
};

export const fetchCardById = async (id: number) => {
  const response = await apiClient.get(`/cards/${id}`);
  return response.data;
};

export const fetchFilterData = async () => {
  try {
    const [elements, types, extensions, components] = await Promise.all([
      apiClient.get("/elements").then((res) => res.data),
      apiClient.get("/types").then((res) => res.data),
      apiClient.get("/extensions").then((res) => res.data),
      apiClient.get("/components").then((res) => res.data),
    ]);
    return {
      elements,
      types,
      extensions,
      components,
    };
  } catch (error) {
    console.error("Error fetching filter data:", error);
    throw error;
  }
};
