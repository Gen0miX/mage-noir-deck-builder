"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Filter from "@/components/Filters";
import { Card } from "@/context/types/Card";
import { useCardFiltering } from "@/hooks/useCardFiltering";
import { FaSearch, FaMinus, FaPlus } from "react-icons/fa";

const getElementColorCode = (elementName: string) => {
  switch (elementName) {
    case "Végétal":
      return "#61c02c";
    case "Eau":
      return "#388ecc";
    case "Feu":
      return "#cc2f24";
    case "Minéral":
      return "#9c8f78";
    case "Air":
      return "#c4d6f0";
    case "Arcane":
      return "#9a459f";
    default:
      return "#bbbbbb";
  }
};

const elementToBgClass: Record<string, string> = {
  végétal: "bg-vegetal",
  eau: "bg-eau",
  feu: "bg-feu",
  minéral: "bg-mineral",
  air: "bg-air",
  arcane: "bg-arcane",
};

type CardsGridProps = {
  cards: Card[];
  showFilters?: boolean;
  onInspectButtonClick?: (card: Card) => void;
  onCardClick?: (card: Card) => void;
  onAddCard?: (card: Card) => void;
  onRemoveCard?: (card: Card) => void;
  cardCounts?: Record<string, number>;
  showInspectButton?: boolean;
  gridClassName?: string;
  containerClassName?: string;
};

const CardsGrid: React.FC<CardsGridProps> = ({
  cards,
  showFilters = true,
  onInspectButtonClick,
  onCardClick,
  onAddCard,
  onRemoveCard,
  cardCounts = {},
  showInspectButton = true,
  gridClassName = "",
  containerClassName = "",
}) => {
  const filteredCards = useCardFiltering(cards);

  return (
    <div className={`flex flex-col h-full ${containerClassName}`}>
      {showFilters && <Filter />} {/* 2) filtre seulement si demandé */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={`grid gap-2 px-2 sm:gap-4 pt-5 pb-5 sm:px-5 z-0 ${gridClassName}`}
        >
          {filteredCards.map((card) => {
            const count = cardCounts[card.id] || 0;
            return onCardClick ? (
              <div key={card.id} className="items-center w-full">
                <div
                  className="group relative shadow-lg cursor-pointer"
                  onClick={() => onCardClick(card)}
                >
                  <Image
                    src={card.imageUrl}
                    alt={card.name}
                    width={372}
                    height={520}
                    quality={100}
                    layout="responsive"
                    className={`object-cover w-full rounded-lg group-hover:shadow-[0px_0px_8px_3px_${getElementColorCode(
                      card.element.name
                    )}]`}
                    loading="lazy"
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                    <p className="text-sm font-semibold">{card.name}</p>
                  </div>

                  {showInspectButton && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectButtonClick?.(card);
                      }}
                      className={`opacity-0 absolute top-2 right-2 bg-${card.element.name
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()} rounded-full border-2 border-white px-2 py-2 text-lg shadow-md transition-opacity duration-300 group-hover:opacity-70 hover:!opacity-100`}
                    >
                      <FaSearch className="text-white" />
                    </button>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => onRemoveCard?.(card)}
                    disabled={count === 0}
                    className={`btn btn-circle btn-sm ${
                      count === 0
                        ? "btn-disabled"
                        : "btn-secondary text-base-content"
                    }`}
                  >
                    <FaMinus className="text-xs" />
                  </button>

                  <span className="text-sm font-medium">{count} / 4</span>

                  <button
                    onClick={() => onAddCard?.(card)}
                    disabled={count >= 4}
                    className={`btn btn-circle btn-sm ${
                      count >= 4
                        ? "btn-disabled"
                        : "btn-primary text-base-content"
                    }`}
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href={`/cards/${card.id}`}
                key={card.id}
                className="group relative shadow-lg"
              >
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  width={372}
                  height={520}
                  quality={100}
                  layout="responsive"
                  className={`object-cover rounded-lg group-hover:shadow-[0px_0px_8px_3px_${getElementColorCode(
                    card.element.name
                  )}]`}
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                  <p className="text-sm font-semibold">{card.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardsGrid;
