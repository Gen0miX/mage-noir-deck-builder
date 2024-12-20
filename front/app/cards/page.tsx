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
  const { cards, loading, activeFilters } = useCards();

  if (loading) return <Loading />;

  const filteredCards = activeFilters.length
    ? cards.filter((card) => {
        // Filtres classiques
        const matchesOtherFilters = activeFilters.some((filter) =>
          filter.startsWith("mana:")
            ? false // On ignore les sliders ici
            : activeFilters.includes(card.element.name) ||
              activeFilters.includes(card.type.name) ||
              card.components.some((component) =>
                activeFilters.includes(component.name)
              ) ||
              activeFilters.includes(card.extension.name)
        );

        // Filtres basés sur les sliders
        const matchesManaCostSliders = activeFilters
          .filter((filter) => filter.startsWith("mana:"))
          .every((sliderFilter) => {
            const [key, value] = sliderFilter.split("=");
            const elementId = parseInt(key.split(":")[1], 10); // Extrait elementId
            const sliderValue = parseInt(value, 10); // Extrait la valeur

            // Vérifie si la carte a un mana_cost correspondant
            return card.mana_cost.some(
              (mana) => mana.id === elementId && mana.quantity >= sliderValue
            );
          });

        // La carte doit correspondre à au moins un des deux groupes de filtres
        return matchesOtherFilters || matchesManaCostSliders;
      })
    : cards;

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
