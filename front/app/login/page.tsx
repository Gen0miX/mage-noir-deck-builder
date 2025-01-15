"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginRegisterContainer from "@/components/LoginRegisterContainer";

const Login: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVerified = searchParams.get("verified") === "true";

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

export default Login;
