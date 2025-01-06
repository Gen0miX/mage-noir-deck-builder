"use client";
import Image from "next/image";
import bg from "@/public/rituel_du_vide_wallpaper.png";
import { usePathname } from "next/navigation";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginRegisterContainer() {
  const pathname = usePathname();
  let form;
  if (pathname === "/login") {
    form = <LoginForm />;
  } else if (pathname === "/register") {
    form = <RegisterForm />;
  }
  return (
    <section className="h-full flex justify-center items-center font-p">
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
