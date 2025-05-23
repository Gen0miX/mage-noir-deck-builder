"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import { FaTimes, FaUserAlt } from "react-icons/fa";
import logoImage from "@/public/Cercle_mage_noir_blanc.png";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const pathname = usePathname();
  const drawerCheckboxRef = useRef<HTMLInputElement>(null);
  const { user, loading } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const closeDrawer = () => {
    if (drawerCheckboxRef.current) {
      drawerCheckboxRef.current.checked = false;
    }
  };

  return (
    <div className="drawer drawer-end z-50">
      <input
        type="checkbox"
        id="my-drawer-3"
        className="drawer-toggle"
        ref={drawerCheckboxRef}
      />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-200 border-b border-b-base-content border-opacity-40 min-h-14 font-p sticky top-0">
          <Link href="/" className="text-3xl mr-6 font-heading min-w-fit">
            <Image src={logoImage} alt={"Logo cercle Mage Noir"} width={55} />
            <span className="hidden md:block md:ml-2">Les Arcanes du Mage</span>
          </Link>
          <div className="navbar-start">
            <div className="gap-2 hidden md:flex">
              <Link
                href="/builder"
                className={`btn btn-sm text-base-content text-lg font-light hover:bg-secondary ${
                  pathname === "/builder" ? "btn-secondary" : "btn-ghost"
                } `}
              >
                Deck Builder
              </Link>
              <Link
                href="/cards"
                className={`btn btn-sm text-base-content text-lg font-light hover:bg-secondary ${
                  pathname === "/cards" ? "btn-secondary" : "btn-ghost"
                } `}
              >
                Cartes
              </Link>
              <Link
                href=""
                className="btn btn-sm btn-ghost text-base-content text-lg font-light hover:bg-secondary"
              >
                Decks
              </Link>
            </div>
          </div>
          <div className="navbar-end">
            {user || loading ? (
              loading ? (
                <Link
                  href=""
                  className="btn btn-sm text-base-content mr-2 text-lg font-light hover:bg-secondary"
                >
                  <span className="loading loading-spinner loading-md"></span>
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className={`btn btn-sm text-base-content mr-2 text-lg font-light hover:bg-secondary ${
                    pathname === "/profile" ? "btn-secondary" : "btn-ghost"
                  } `}
                >
                  <FaUserAlt size={20}></FaUserAlt>
                  {localStorage.getItem("userName")}
                </Link>
              )
            ) : (
              <Link
                href="/login"
                role="button"
                className={`btn btn-sm text-base-content mr-2 text-lg font-light hover:bg-secondary ${
                  pathname === "/login" ? "btn-secondary" : "btn-ghost"
                } `}
              >
                Login
              </Link>
            )}
            <div className="md:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-sm btn-ghost hover:bg-secondary"
              >
                <TiThMenu />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side font-p">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex h-full bg-base-200 w-80 border-l border-base-content border-opacity-40">
          <button
            className="btn btn-sm btn-circle btn-primary absolute right-4 top-4"
            onClick={closeDrawer}
          >
            <FaTimes className="text-base-content" />
          </button>
          <ul className="menu min-h-full w-60 p-4">
            <li>
              <Link
                href="/builder"
                className={`hover:bg-secondary ${
                  pathname === "/builder" ? "bg-secondary" : "bg-transparent"
                }`}
              >
                Deck Builder
              </Link>
            </li>
            <li>
              <Link
                href="/cards"
                className={`hover:bg-secondary ${
                  pathname === "/cards" ? "bg-secondary" : "bg-transparent"
                }`}
              >
                Cartes
              </Link>
            </li>
            <li>
              <Link href="" className="hover:bg-secondary">
                Decks
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
