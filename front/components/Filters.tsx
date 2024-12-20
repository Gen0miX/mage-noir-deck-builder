"use client";
import { useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LuSlidersHorizontal, LuSearch } from "react-icons/lu";
import ElementIcon from "./ElementIcon";
import FilterModal from "./FilterModal";
import { useCards } from "@/context/CardsContext";

export default function Filter() {
  const { activeFilters, toggleFilter, elements } = useCards();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredElements = elements.filter((element) =>
    element.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="sticky top-0 flex flex-col w-full p-3 z-50 bg-base-200 border-b border-b-base-content border-opacity-40 gap-2">
      <div className="flex w-full gap-2">
        <label className="input input-bordered input-sm flex items-center gap-2 bg-base-200 w-full lg:input-md">
          <input type="text" className="grow" placeholder="Rechercher..." />
          <LuSearch />
        </label>
        <button
          className="btn btn-sm btn-primary lg:btn-md text-base-content font-medium"
          onClick={() => {
            const modal = document.getElementById(
              "filter_modal"
            ) as HTMLDialogElement | null;
            if (modal) {
              modal.showModal();
            }
          }}
        >
          <LuSlidersHorizontal size={18} />
          Filtres
        </button>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="btn btn-outline btn-primary btn-sm p-1 flex items-center  lg:btn-md"
          >
            <span className="text-base-content font-medium">Trier...</span>
            {/* Icône qui pivote */}
            <MdOutlineKeyboardArrowUp
              className={`transition-transform duration-300 text-base-content ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              size={24}
            ></MdOutlineKeyboardArrowUp>
          </button>
          {/* Contenu du dropdown */}
          {isOpen && (
            <ul className="menu menu-sm absolute left-0 mt-2 w-40 bg-base-200 rounded-box shadow-lg z-10 border border-base-content border-opacity-40">
              <li>
                <button className="btn btn-sm">Élément</button>
              </li>
              <li>
                <button className="btn btn-sm">Type</button>
              </li>
              <li>
                <button className="btn btn-sm">Extension</button>
              </li>
              <li>
                <button className="btn btn-sm">Nom</button>
              </li>
            </ul>
          )}
        </div>
        <div className="jusify-end">
          {filteredElements.map((element) => (
            <button
              key={element.id}
              className={`btn p-1 ${
                activeFilters.includes(element.name)
                  ? "btn-primary"
                  : "btn-ghost"
              }`}
              onClick={() => toggleFilter(element.name)}
            >
              <ElementIcon id={element.id} className="w-[30px] lg:w-10" />
            </button>
          ))}
        </div>
      </div>
      <FilterModal id="filter_modal"></FilterModal>
    </div>
  );
}
