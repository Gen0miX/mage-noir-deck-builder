"use client";
import { useAuth } from "@/context/AuthContext";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="btn btn-sm btn-ghost text-base-content text-lg font-light hover:bg-secondary"
    >
      Logout
    </button>
  );
};

export default ProfilePage;
