"use client";
import { useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LuSlidersHorizontal, LuSearch } from "react-icons/lu";
import ElementIcon from "./ElementIcon";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="sticky top-0 flex flex-col w-full p-3 z-50 bg-base-200 border-b border-b-base-content border-opacity-40 gap-2">
      <div className="flex w-full gap-2">
        <label className="input input-bordered input-sm flex items-center gap-2 bg-base-200 w-full lg:input-md">
          <input type="text" className="grow" placeholder="Rechercher..." />
          <LuSearch />
        </label>
        <button className="btn btn-sm btn-primary lg:btn-md text-base-content font-medium">
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
          <button className="btn p-1">
            <ElementIcon id={1} className="w-[30px] lg:w-10"></ElementIcon>
          </button>
          <button className="btn p-1">
            <ElementIcon id={2} className="w-[30px] lg:w-10"></ElementIcon>
          </button>
          <button className="btn p-1">
            <ElementIcon id={3} className="w-[30px] lg:w-10"></ElementIcon>
          </button>
          <button className="btn p-1">
            <ElementIcon id={4} className="w-[30px] lg:w-10"></ElementIcon>
          </button>
          <button className="btn p-1">
            <ElementIcon id={5} className="w-[30px] lg:w-10"></ElementIcon>
          </button>
          <button className="btn p-1">
            <ElementIcon id={6} className="w-[30px] lg:w-10"></ElementIcon>
          </button>
        </div>
      </div>
    </div>
  );
}
