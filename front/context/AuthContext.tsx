"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchMe, logout } from "@/api/authApi";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  loading: boolean;
  logout: () => void;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMe();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log("Erreur lors de la déconnexion :", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, logout: handleLogout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
