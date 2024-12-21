"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";

export default function NavBar() {
  const pathname = usePathname();
  const drawerCheckboxRef = useRef<HTMLInputElement>(null);

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
          <Link
            href="/"
            className="text-2xl font-medium mr-6 font-heading min-w-fit"
          >
            Les Arcanes du Mage
          </Link>
          <div className="navbar-start">
            <div className="gap-2 hidden md:flex">
              <Link
                href=""
                className="btn btn-sm btn-ghost text-base-content text-lg font-light hover:bg-secondary"
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
            <FaTimes />
          </button>
          <ul className="menu min-h-full w-60 p-4">
            <li>
              <Link href="" className="hover:bg-secondary">
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
