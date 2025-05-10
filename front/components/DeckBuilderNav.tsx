import { FaSearch } from "react-icons/fa";
import { PiCardsBold } from "react-icons/pi";

type DeckBuilderNavProps = {
  activeView: "cards" | "deck";
  setActiveView: (view: "cards" | "deck") => void;
};

export default function DeckBuilderNav({
  activeView,
  setActiveView,
}: DeckBuilderNavProps) {
  return (
    <div className="sticky w-full flex bottom-0 left-0 p-2 gap-2 bg-base-200 border-t border-t-base-content border-opacity-40 font-p md:hidden">
      <button
        className={`flex flex-grow flex-col h-24 btn btn-outline font-normal text-lg hover:bg-primary hover:text-base-content ${
          activeView === "cards" ? "bg-primary" : "btn-ghost"
        }`}
        onClick={() => setActiveView("cards")}
      >
        <FaSearch className="text-lg" />
        Cartes
      </button>
      <button
        className={`flex flex-grow flex-col h-24 btn btn-outline font-normal text-lg hover:bg-primary hover:text-base-content ${
          activeView === "deck" ? "bg-primary" : "btn-ghost"
        }`}
        onClick={() => setActiveView("deck")}
      >
        <div className="absolute top-4 right-4 badge badge-secondary badge-md">
          1
        </div>
        <PiCardsBold className="text-xl" />
        Deck
      </button>
    </div>
  );
}
