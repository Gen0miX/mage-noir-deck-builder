import { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { sendResetPasswordEmail } from "@/api/authApi";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function PasswordForgot() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendResetPasswordEmail(email);
      router.push("/login?isReset=true");
    } catch (error) {
      setToast({
        type: "error",
        message: "Adresse email non trouvée !",
      });
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => setToast(null), 4000);
  };
  return (
    <div className="flex flex-col justify-center gap-3 px-3 sm:px-10 md:px-14 bg-base-200 bg-opacity-90 border border-base-content border-opacity-40 rounded-lg shadow-lg max-w-[26rem]">
      <h1 className="font-heading text-2xl font-bold uppercase self-center mt-10">
        Mot de passe oublié ?
      </h1>
      <p className="text-justify">
        Veuillez entrer votre email pour réinitialiser votre mot de passe.
      </p>
      <form onSubmit={handleSubmit}>
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
        <div className="flex justify-end mt-5 mb-10 gap-5 ">
          <Link href="/login" className=" btn btn-secondary text-base-content">
            Annuler
          </Link>
          <button
            type="submit"
            className=" btn btn-primary  text-base-content "
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Réinitialiser"
            )}
          </button>
        </div>
      </form>
      {toast && <Toast type={toast.type}>{toast.message}</Toast>}
    </div>
  );
}
