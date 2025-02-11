import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FaUser, FaKey, FaEnvelope } from "react-icons/fa6";
import { register } from "@/api/authApi";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);

    try {
      await register({ email, password, username });
      router.push("/register/verify-email?email=" + email);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        const errors = err.response.data.errors;
        if (Array.isArray(errors)) {
          for (const error of errors) {
            if (error.rule === "database.unique") {
              if (error.field === "email") {
                setError("Cet email est déjà utilisé.");
                return;
              } else if (error.field === "username") {
                setError("Ce nom d'utilisateur est déjà utilisé.");
                return;
              } else {
                setError("Erreur inconnue");
                return;
              }
            } else {
              setError("Erreur inconnue");
            }
          }
        } else {
          setError("Erreur inconnue");
        }
      }

      setError("Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-3 px-3 sm:px-10 md:px-14 bg-base-200 bg-opacity-90 border border-base-content border-opacity-40 rounded-lg shadow-lg">
      <h1 className="font-heading text-2xl font-bold uppercase self-center mt-10">
        Inscription
      </h1>
      <p className="mb-5 self-center">
        Déjà un compte ?{" "}
        <Link href={"/login"} className="link link-primary">
          Se connecter
        </Link>
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <div className="label">
            <span className="label-text">Utilisateur</span>
          </div>
          <label className="input input-bordered input-primary flex items-center gap-2">
            <FaUser size={20} className="text-primary"></FaUser>
            <input
              type="text"
              className="grow"
              placeholder="Utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <label className="input input-bordered input-primary flex items-center gap-2">
            <FaEnvelope size={20} className="text-primary"></FaEnvelope>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <div className="label">
            <span className="label-text">Mot de passe</span>
          </div>
          <label className="input input-bordered input-primary flex items-center gap-2 mb-2">
            <FaKey size={20} className="text-primary"></FaKey>
            <input
              type="password"
              className="grow"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered input-primary flex items-center gap-2">
            <FaKey size={20} className="text-primary"></FaKey>
            <input
              type="password"
              className="grow"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="grow btn btn-primary flex text-base-content mt-5 mb-10"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "S'enregistrer"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
