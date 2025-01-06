import Link from "next/link";
import { FaUser, FaKey, FaEnvelope } from "react-icons/fa6";

export default function RegisterForm() {
  return (
    <div className="flex flex-col justify-center gap-3 px-3 sm:px-10 md:px-14  bg-base-200 bg-opacity-90 border border-base-content border-opacity-40 rounded-lg shadow-lg">
      <h1 className="font-heading text-2xl font-bold uppercase self-center mt-10">
        Inscription
      </h1>
      <p className="mb-5 self-center">
        Déjà un compte ?{" "}
        <Link href={"/login"} className="link link-primary">
          Se connecter
        </Link>
      </p>
      <div>
        <div className="label">
          <span className="label-text">Utilisateur</span>
        </div>
        <label className="input input-bordered input-primary flex items-center gap-2">
          <FaUser size={20} className="text-primary"></FaUser>
          <input type="text" className="grow" placeholder="Utilisateur" />
        </label>
      </div>

      <div>
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <label className="input input-bordered input-primary flex items-center gap-2">
          <FaEnvelope size={20} className="text-primary"></FaEnvelope>
          <input type="email" className="grow" placeholder="Email" />
        </label>
      </div>
      <div>
        <div className="label">
          <span className="label-text">Mot de passe</span>
        </div>
        <label className="input input-bordered input-primary flex items-center gap-2 mb-2">
          <FaKey size={20} className="text-primary"></FaKey>
          <input type="password" className="grow" placeholder="Mot de passe" />
        </label>
        <label className="input input-bordered input-primary flex items-center gap-2">
          <FaKey size={20} className="text-primary"></FaKey>
          <input
            type="password"
            className="grow"
            placeholder="Confirmer le mot de passe"
          />
        </label>
      </div>

      <div className="flex">
        <button className="grow btn btn-primary flex text-base-content mt-5 mb-10">
          S'enregistrer
        </button>
      </div>
    </div>
  );
}
