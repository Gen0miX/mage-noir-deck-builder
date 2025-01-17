import { useState } from "react";
import { FaKey } from "react-icons/fa";

export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);

    try {
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-3 px-3 sm:px-10 md:px-14 bg-base-200 bg-opacity-90 border border-base-content border-opacity-40 rounded-lg shadow-lg max-w-[26rem]">
      <h1 className="font-heading text-2xl font-bold uppercase self-center text-center mt-10">
        Réinitialisez votre mot de passe !
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <div className="flex">
          <button
            type="submit"
            className="grow btn btn-primary flex text-base-content mt-5 mb-10"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Réinitialiser"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
