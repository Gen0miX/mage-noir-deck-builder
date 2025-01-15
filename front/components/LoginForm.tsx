import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaKey } from "react-icons/fa6";
import { login } from "@/api/authApi";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token.token);
      localStorage.setItem("userName", data.user.fullName);
      setUser(data.user);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Email ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
    }
  };

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
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="input input-bordered input-primary flex items-center gap-2">
          <FaUser size={20} className="text-primary"></FaUser>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered input-primary flex items-center gap-2 ">
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
        <Link
          href={"/register/pwd-forgot"}
          className="link link-primary self-end"
        >
          Mot de passe oublié ?
        </Link>
        <div className="flex">
          <button
            type="submit"
            className="grow btn btn-primary flex text-base-content mt-5 mb-10"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Se connecter"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
