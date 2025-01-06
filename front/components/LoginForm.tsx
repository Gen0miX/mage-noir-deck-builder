import Link from "next/link";
import { FaUser, FaKey } from "react-icons/fa6";

export default function LoginForm() {
  return (
    <div className="flex flex-col justify-center gap-3 px-3 sm:px-10 md:px-14 bg-base-200 bg-opacity-90 border border-base-content border-opacity-40 rounded-lg shadow-lg">
      <h1 className="font-heading text-2xl font-bold uppercase self-center mt-10">
        Connexion
      </h1>
      <p className="mb-5 self-center">
        Pas encore de compte ?{" "}
        <Link href={"/register"} className="link link-primary">
          S'inscrire
        </Link>
      </p>
      <label className="input input-bordered input-primary flex items-center gap-2">
        <FaUser size={20} className="text-primary"></FaUser>
        <input type="text" className="grow" placeholder="Utilisateur" />
      </label>
      <label className="input input-bordered input-primary flex items-center gap-2 ">
        <FaKey size={20} className="text-primary"></FaKey>
        <input type="password" className="grow" placeholder="Mot de passe" />
      </label>
      <Link href={"/pwd-forgot"} className="link link-primary self-end">
        Mot de passe oublié ?
      </Link>
      <div className="flex">
        <button className="grow btn btn-primary flex text-base-content mt-5 mb-10">
          Se connecter
        </button>
      </div>
    </div>
  );
}
