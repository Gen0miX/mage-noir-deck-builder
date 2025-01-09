import apiClient from "@/api/apiClient";

export const register = async (userData: {
  email: string;
  password: string;
  username: string;
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
  const token = localStorage.getItem("token");
  const response = await apiClient.delete("/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchMe = async () => {
  const token = localStorage.getItem("token");
  const response = await apiClient.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
