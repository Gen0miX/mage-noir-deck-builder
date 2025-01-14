"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { verifyEmail } from "@/api/authApi";
import Loading from "@/components/Loading";
import { div } from "framer-motion/client";

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const { token } = useParams();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (typeof token === "string") {
          await verifyEmail(token);
          router.push("/login?verified=true");
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        console.error("Email verification failed:", error);

        router.push("/register/verification-failed");
      }
    };

    verifyToken();
  }, [token, router]);

  return <Loading />;
};

export default VerifyEmailPage;
