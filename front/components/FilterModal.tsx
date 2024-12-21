"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useCards } from "@/context/CardsContext";
import ElementIcon from "./ElementIcon";
import ManaCostRange from "./ManaCostRange";
import { FaHeart } from "react-icons/fa6";

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
    updateHpSlider,
    resetFilters,
    hpSlider,
  } = useCards();
  const [searchQuery, setSearchQuery] = useState("");
  const [hpValue, setHpValue] = useState(hpSlider);

  useEffect(() => {
    setHpValue(hpSlider);
  }, [hpSlider]);

  const handleHpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHpValue = Number(event.target.value);
    setHpValue(newHpValue);
    updateHpSlider(newHpValue);
  };

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
      <div className="modal-box flex flex-col">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-primary absolute right-5 top-5">
            <FaTimes color="white" />
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
          <div className="collapse-content flex justify-evenly overflow-y-auto">
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
          <div className="collapse-content overflow-y-auto">
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
            Point de vie
          </div>
          <div className="collapse-content overflow-y-auto">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-1 sm:gap-0 p-2 border border-base-content border-opacity-40 rounded-lg">
                <div className="flex justify-center items-center rounded-full min-w-[30px] w-[30px] h-[30px] lg:w-10 lg:h-10 bg-primary ">
                  <FaHeart className="w-[14px] h-[14px] lg:w-6 lg:h-6"></FaHeart>
                </div>
                <input
                  type="range"
                  min={0}
                  max="10"
                  value={hpValue}
                  onChange={handleHpChange}
                  className="range range-xs range-primary sm:w-60"
                  step="1"
                />
                <p className="w-4">{hpValue}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="filter-accordion" />
          <div className="collapse-title text-xl font-medium font-heading ">
            Composants
          </div>
          <div className="collapse-content grid grid-cols-2 gap-1 overflow-y-auto">
            {filteredComponents.map((component) => {
              const isChecked = activeFilters.includes(component.name);

              return (
                <label
                  key={component.id}
                  className="label cursor-pointer flex justify-start gap-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={isChecked}
                    onChange={() => toggleFilter(component.name)}
                  />
                  <span className="label-text">{component.name}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="filter-accordion" />
          <div className="collapse-title text-xl font-medium font-heading">
            Types
          </div>
          <div className="collapse-content grid grid-cols-2 gap-1 overflow-y-auto">
            {filteredTypes.map((type) => {
              const isChecked = activeFilters.includes(type.name);
              return (
                <label
                  key={type.id}
                  className="label cursor-pointer flex justify-start gap-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={isChecked}
                    onChange={() => toggleFilter(type.name)}
                  />
                  <span className="label-text">{type.name}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="filter-accordion" />
          <div className="collapse-title text-xl font-medium font-heading">
            Extension
          </div>
          <div className="collapse-content grid grid-cols-2 gap-1 overflow-y-auto">
            {filteredExtensions.map((extension) => {
              const isChecked = activeFilters.includes(extension.name);
              return (
                <label
                  key={extension.id}
                  className="label cursor-pointer flex justify-start gap-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={isChecked}
                    onChange={() => toggleFilter(extension.name)}
                  />
                  <span className="label-text">{extension.name}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div
          className="btn btn-sm text-base-content btn-primary mt-5 self-center"
          onClick={resetFilters}
        >
          Supprimer les filtres
        </div>
      </div>
    </dialog>
  );
}
