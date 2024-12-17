import Link from "next/link";
import { TiThMenu } from "react-icons/ti";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 border-b border-b-secondary border-opacity-40 min-h-14 font-p fixed">
      <a href="/" className="text-2xl font-medium mr-6 font-heading min-w-fit">
        Les Arcanes du Mage
      </a>
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
        <div className="dropdown dropdown-bottom dropdown-left md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm btn-ghost hover:bg-secondary"
          >
            <TiThMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rouded-box z[1] mt-3 w-52 p-2 shadow gap-1"
          >
            <li>
              <Link href="" className="hover:bg-secondary">
                Deck Builder
              </Link>
            </li>
            <li>
              <Link href="" className="hover:bg-secondary">
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
