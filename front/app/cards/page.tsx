"use client";
import React, { Component, useEffect, useState } from "react";
import { useCards } from "@/context/CardsContext";
import Image from "next/image";
import Filter from "@/components/Filters";
import Loading from "@/components/Loading";
import Link from "next/link";

const getShadowClass = (elementName: string) => {
  switch (elementName) {
    case "Végétal":
      return "group-hover:shadow-[0px_0px_8px_3px_#61c02c]";
    case "Eau":
      return "group-hover:shadow-[0px_0px_8px_3px_#388ecc]";
    case "Feu":
      return "group-hover:shadow-[0px_0px_8px_3px_#cc2f24]";
    case "Minéral":
      return "group-hover:shadow-[0px_0px_8px_3px_#9c8f78]";
    case "Air":
      return "group-hover:shadow-[0px_0px_8px_3px_#c4d6f0]";
    case "Arcane":
      return "group-hover:shadow-[0px_0px_8px_3px_#9a459f]";
    default:
      return "group-hover:shadow-[0px_0px_8px_3px_#bbbbbb]";
  }
};

const CardsPage: React.FC = () => {
  const {
    cards,
    loading,
    activeFilters,
    manaCostSliders,
    hpSlider,
    sortCriteria,
  } = useCards();

  if (loading) return <Loading />;

  const filteredCards = (() => {
    // Start with all cards as the base
    let filtered = cards;

    // Step 1: Organize active filters by type
    const filterGroups = {
      element: activeFilters.filter((filter) =>
        cards.some((card) => card.element.name === filter)
      ),
      type: activeFilters.filter((filter) =>
        cards.some((card) => card.type.name === filter)
      ),
      extension: activeFilters.filter((filter) =>
        cards.some((card) => card.extension.name === filter)
      ),
      component: activeFilters.filter((filter) =>
        cards.some((card) =>
          card.components.some((component) => component.name === filter)
        )
      ),
    };

    // Step 2: Apply each group of filters
    Object.entries(filterGroups).forEach(([filterType, filters]) => {
      if (filters.length) {
        filtered = filtered.filter((card) => {
          // Check if the card matches any filter in this group
          switch (filterType) {
            case "element":
              return filters.includes(card.element.name);
            case "type":
              return filters.includes(card.type.name);
            case "extension":
              return filters.includes(card.extension.name);
            case "component":
              return card.components.some((component) =>
                filters.includes(component.name)
              );
            default:
              return true; // No filter applied if no match
          }
        });
      }
    });

    // Step 3: Apply mana cost sliders sequentially
    if (manaCostSliders.length) {
      manaCostSliders.forEach((slider) => {
        filtered = filtered.filter((card) => {
          // Check if the card matches the slider conditions
          return card.mana_cost.some(
            (mana) =>
              mana.id === slider.elementId && mana.quantity >= slider.value
          );
        });
      });
    }

    if (hpSlider > 0) {
      filtered = filtered.filter((card) => card.hp >= hpSlider);
    }

    // Step 4: Return the filtered cards
    // If no filters or sliders are active, return all cards
    return activeFilters.length || manaCostSliders.length || hpSlider > 0
      ? filtered
      : cards;
  })();

  return (
    <div className="flex flex-col h-full">
      <Filter></Filter>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 px-2 sm:gap-4 pt-5 pb-5 sm:px-5 z-0 overflow-y-auto">
          {filteredCards.map((card) => (
            <Link
              href={`/cards/${card.id}`}
              key={card.id}
              className="group relative shadow-lg "
            >
              <Image
                src={card.imageUrl}
                alt={card.name}
                width={372}
                height={520}
                quality={100}
                layout="responsive" // S'assure que l'image garde son ratio
                className={`object-cover rounded-lg ${getShadowClass(
                  card.element.name
                )}`}
                loading="lazy"
              />
              {/* Overlay pour le nom */}
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                <p className="text-sm font-semibold">{card.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsPage;
