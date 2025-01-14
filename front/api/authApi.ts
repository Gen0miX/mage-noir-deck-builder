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

export const sendVerificationEmail = async (email: string) => {
  const response = await apiClient.post("/send-verification-email", { email });
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await apiClient.post(`/verify-email/${token}`);
  return response.data;
};

export const sendResetPasswordEmail = async (email: string) => {
  const response = await apiClient.post("/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (resetData: {
  token: string;
  password: string;
}) => {
  const response = await apiClient.post(
    `/reset-password/${resetData.token}`,
    resetData.password
  );
  return response.data;
};
