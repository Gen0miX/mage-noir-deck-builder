import Link from "next/link";
import { TiThMenu } from "react-icons/ti";

export default function NavBar() {
  return (
    <div className="drawer drawer-end z-50">
      <input type="checkbox" id="my-drawer-3" className="drawer-toggle" />
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
                className="btn btn-sm btn-ghost text-base-content text-lg font-light hover:bg-secondary "
              >
                Deck Builder
              </Link>
              <Link
                href="/cards"
                className="btn btn-sm btn-ghost text-base-content text-lg font-light hover:bg-secondary"
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
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li>
            <Link href="" className="hover:bg-secondary">
              Deck Builder
            </Link>
          </li>
          <li>
            <Link href="/cards" className="hover:bg-secondary">
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
  );
}
