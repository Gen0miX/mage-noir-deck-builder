"use client";
import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginRegisterContainer from "@/components/LoginRegisterContainer";

const RegisterPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <Suspense
      fallback={<span className="loading loading-dots loading-md"></span>}
    >
      <LoginRegisterContainer></LoginRegisterContainer>
    </Suspense>
  );
};

export default RegisterPage;
