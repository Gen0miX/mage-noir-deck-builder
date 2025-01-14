"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bg from "@/public/rituel_du_vide_wallpaper.png";
import { usePathname } from "next/navigation";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import VerifyEmail from "./VerifyEmail";
import Toast from "./Toast";
import { FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface LoginRegisterContainerProps {
  isVerified?: boolean;
}

export default function LoginRegisterContainer({
  isVerified,
}: LoginRegisterContainerProps) {
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(isVerified);

  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isVerified]);

  let form;
  if (pathname === "/login") {
    form = <LoginForm />;
  } else if (pathname === "/register") {
    form = <RegisterForm />;
  } else if (pathname === "/register/verify-email") {
    form = <VerifyEmail />;
  }
  return (
    <section className="h-full flex justify-center items-center font-p">
      {showToast && (
        <Toast type="success">Votre Email a été validé avec succès !</Toast>
      )}
      {form}
      <Image
        alt="Background image"
        src={bg}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
      />
    </section>
  );
}
