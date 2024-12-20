"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useCards } from "@/context/CardsContext";
import ElementIcon from "./ElementIcon";
import ManaCostRange from "./ManaCostRange";
import { div } from "framer-motion/client";

interface FilterModalProps {
  id: string;
}

export default function FilterModal({ id }: FilterModalProps) {
  const {
    activeFilters,
    toggleFilter,
    elements,
    types,
    components,
    extensions,
  } = useCards();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredElements = elements.filter((element) =>
    element.name.toLowerCase().includes(searchQuery)
  );

  const filteredTypes = types.filter((filter) =>
    filter.name.toLowerCase().includes(searchQuery)
  );

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchQuery)
  );

  const filteredExtensions = extensions.filter((extension) =>
    extension.name.toLowerCase().includes(searchQuery)
  );

  const filteredManaCosts = elements.filter((element) =>
    element.name.toLowerCase().includes(searchQuery)
  );

  return (
    <dialog id={id} className="modal font-p">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-primary absolute right-5 top-5">
            <FaTimes />
          </button>
        </form>
        <h2 className="uppercase font-heading font-semibold text-2xl mb-5">
          Filtres
        </h2>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="filter-accordion" />
          <div className="collapse-title text-xl font-medium font-heading">
            Éléments
          </div>
          <div className="collapse-content flex justify-evenly">
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
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="filter-accordion" />
          <div className="collapse-title text-xl font-medium font-heading">
            Coût en mana
          </div>
          <div className="collapse-content">
            <div className="flex flex-col gap-2">
              {filteredManaCosts.map((element) => (
                <ManaCostRange
                  key={element.id}
                  elementId={element.id}
                ></ManaCostRange>
              ))}
            </div>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="filter-accordion" />
          <div className="collapse-title text-xl font-medium font-heading">
            Composants
          </div>
          <div className="collapse-content grid grid-cols-2 gap-1">
            {filteredComponents.map((component) => (
              <label
                key={component.id}
                className="label cursor-pointer flex justify-start gap-2"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  onClick={() => toggleFilter(component.name)}
                />
                <span className="label-text">{component.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="filter-accordion" />
          <div className="collapse-title text-xl font-medium font-heading">
            Types
          </div>
          <div className="collapse-content grid grid-cols-2 gap-1">
            {filteredTypes.map((type) => (
              <label
                key={type.id}
                className="label cursor-pointer flex justify-start gap-2"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  onClick={() => toggleFilter(type.name)}
                />
                <span className="label-text">{type.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="filter-accordion" />
          <div className="collapse-title text-xl font-medium font-heading">
            Extension
          </div>
          <div className="collapse-content grid grid-cols-2 gap-1">
            {filteredExtensions.map((extension) => (
              <label
                key={extension.id}
                className="label cursor-pointer flex justify-start gap-2"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  onClick={() => toggleFilter(extension.name)}
                />
                <span className="label-text">{extension.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}
