"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginRegisterContainer from "@/components/LoginRegisterContainer";

const Register: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return <LoginRegisterContainer></LoginRegisterContainer>;
};

export default Register;
