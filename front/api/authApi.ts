import apiClient from "@/api/apiClient";

export const register = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await apiClient.post("/register", userData);
  return response.data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.delete("/logout");
  return response.data;
};

export const fetchMe = async () => {
  const response = await apiClient.get("/me");
  return response.data;
};
