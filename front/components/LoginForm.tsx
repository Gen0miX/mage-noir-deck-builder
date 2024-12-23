import Link from "next/link";
import Image from "next/image";
import bg from "@/public/cape_galactique_wallpaper.png";
import { FaUser, FaKey } from "react-icons/fa6";

export default function LoginForm() {
  return (
    <section className="h-full flex justify-center items-center font-p">
      <div className="flex flex-col justify-center gap-3 px-3 sm:px-10 md:px-14 h-96 bg-base-200 bg-opacity-90 border border-base-content border-opacity-40 rounded-lg shadow-lg">
        <h1 className="font-heading text-2xl font-bold uppercase self-center">
          Connexion
        </h1>
        <p className="mb-6 self-center">
          Pas encore de compte ?{" "}
          <Link href={"/sign-in"} className="link link-primary">
            S'inscrire
          </Link>
        </p>
        <label className="input input-bordered input-primary flex items-center gap-2">
          <FaUser size={20} className="text-primary"></FaUser>
          <input type="text" className="grow" placeholder="Utilisateur" />
        </label>
        <label className="input input-bordered input-primary flex items-center gap-2 mb-6">
          <FaKey size={20} className="text-primary"></FaKey>
          <input type="password" className="grow" placeholder="Mot de passe" />
        </label>
        <div className="flex">
          <button className="grow btn btn-primary flex text-base-content">
            Se connecter
          </button>
        </div>
      </div>
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
