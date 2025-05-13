"use client";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { LuSlidersHorizontal, LuSearch } from "react-icons/lu";
import ElementIcon from "./ElementIcon";
import FilterModal from "./FilterModal";
import { useCards } from "@/context/CardsContext";

export default function Filter() {
  const {
    activeFilters,
    toggleFilter,
    searchQuery,
    setSearchQuery,
    elements,
    setSortBy,
    sortBy,
    sortOrders,
    toggleSortOrder,
  } = useCards();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSort = (
    key: "name" | "element" | "type" | "hp" | "extension"
  ) => {
    if (sortBy === key) {
      toggleSortOrder(key);
    } else {
      setSortBy(key);
    }
  };

  return (
    <div className="sticky top-0 flex flex-col w-full p-3 z-50 bg-base-200 border-b border-b-base-content border-opacity-40 gap-2 font-p">
      <div className="flex w-full gap-2">
        <label className="input input-bordered input-sm flex items-center gap-2 bg-base-200 w-full lg:input-md">
          <input
            type="text"
            className="grow"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
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
            <ul className="menu menu-sm absolute left-0 mt-2 w-40 bg-base-200 shadow-lg z-10 border border-base-content border-opacity-40">
              <li className="hover:bg-secondary rounded-lg ">
                <a
                  onClick={() => handleSort("element")}
                  className={`btn btn-sm text-base-content hover:btn-secondary hover:text-base-content ${
                    sortBy === "element" ? "btn-secondary" : "btn-ghost"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    Élément
                    {sortOrders.element === "asc" ? (
                      <MdOutlineKeyboardArrowUp size={18} />
                    ) : (
                      <MdOutlineKeyboardArrowDown size={18} />
                    )}
                  </div>
                </a>
              </li>
              <li className="hover:bg-secondary rounded-lg">
                <a
                  onClick={() => handleSort("hp")}
                  className={`btn btn-sm text-base-content hover:btn-secondary hover:text-base-content ${
                    sortBy === "hp" ? "btn-secondary" : "btn-ghost"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    Point de vie
                    {sortOrders.hp === "asc" ? (
                      <MdOutlineKeyboardArrowUp size={18} />
                    ) : (
                      <MdOutlineKeyboardArrowDown size={18} />
                    )}
                  </div>
                </a>
              </li>
              <li className="hover:bg-secondary rounded-lg">
                <a
                  onClick={() => handleSort("name")}
                  className={`btn btn-sm text-base-content hover:btn-secondary hover:text-base-content ${
                    sortBy === "name" ? "btn-secondary" : "btn-ghost"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    Nom
                    {sortOrders.name === "asc" ? (
                      <MdOutlineKeyboardArrowUp size={18} />
                    ) : (
                      <MdOutlineKeyboardArrowDown size={18} />
                    )}
                  </div>
                </a>
              </li>
              <li className="hover:bg-secondary rounded-lg">
                <a
                  onClick={() => handleSort("type")}
                  className={`btn btn-sm text-base-content hover:btn-secondary hover:text-base-content ${
                    sortBy === "type" ? "btn-secondary" : "btn-ghost"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    Type
                    {sortOrders.type === "asc" ? (
                      <MdOutlineKeyboardArrowUp size={18} />
                    ) : (
                      <MdOutlineKeyboardArrowDown size={18} />
                    )}
                  </div>
                </a>
              </li>
              <li className="hover:bg-secondary rounded-lg">
                <a
                  onClick={() => handleSort("extension")}
                  className={`btn btn-sm text-base-content hover:btn-secondary hover:text-base-content ${
                    sortBy === "extension" ? "btn-secondary" : "btn-ghost"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    Extension
                    {sortOrders.extension === "asc" ? (
                      <MdOutlineKeyboardArrowUp size={18} />
                    ) : (
                      <MdOutlineKeyboardArrowDown size={18} />
                    )}
                  </div>
                </a>
              </li>
            </ul>
          )}
        </div>
        <div className="jusify-end">
          {elements.map((element) => (
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
    </div>
  );
}
