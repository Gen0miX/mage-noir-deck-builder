"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bg from "@/public/rituel_du_vide_wallpaper.png";
import { usePathname } from "next/navigation";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import VerifyEmail from "./VerifyEmail";
import PasswordForgot from "./PasswordForgot";
import Toast from "./Toast";
import { useSearchParams } from "next/navigation";

export default function LoginRegisterContainer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "true";
  const isReset = searchParams.get("isReset") === "true";
  const [toast, setToast] = useState<{
    type: "success";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (isVerified) {
      setToast({
        type: "success",
        message: "Email vérifié avec succès !",
      });
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
    if (isReset) {
      setToast({
        type: "success",
        message: "Email de réinitialisation envoyé ! Vérifiez votre boît mail.",
      });
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [isVerified, isReset]);

  let form;
  if (pathname === "/login") {
    form = <LoginForm />;
  } else if (pathname === "/register") {
    form = <RegisterForm />;
  } else if (pathname === "/register/verify-email") {
    form = <VerifyEmail />;
  } else if (pathname === "/register/pwd-forgot") {
    form = <PasswordForgot />;
  }
  return (
    <section className="h-full flex justify-center items-center font-p">
      {toast && <Toast type={toast.type}>{toast.message}</Toast>}
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
