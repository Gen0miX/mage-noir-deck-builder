import React, { useMemo } from "react";
import { Card } from "@/context/types/Card";
import Image from "next/image";
import deckIcon from "@/public/deck_icon.png";
import ElementIcon from "@/components/ElementIcon";
import DeckCardsBanner from "@/components/DeckCardsBanner";

type DeckCreatorProps = {
  deck: Card[];
  onAddCard: (card: Card) => void;
  onRemoveCard: (card: Card) => void;
};

const DeckCreator: React.FC<DeckCreatorProps> = ({
  deck,
  onAddCard,
  onRemoveCard,
}) => {
  const uniqueCardsWithCount = useMemo(() => {
    return deck.reduce((acc, card) => {
      const existing = acc.find((entry) => entry.card.id === card.id);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ card, count: 1 });
      }
      return acc;
    }, [] as { card: Card; count: number }[]);
  }, [deck]);

  const elementCounts = deck.reduce((acc, card) => {
    const elementId = card.elementId;
    if (!acc[elementId]) acc[elementId] = 0;
    acc[elementId]++;
    return acc;
  }, {} as Record<number, number>);

  const totalCards = deck.length;

  const ELEMENT_IDS = [1, 2, 3, 4, 5, 6];

  return (
    <div className="bg-base-300 h-full flex-grow border-l border-l-base-content border-opacity-40 overflow-y-auto">
      <div className="sticky top-0 bg-base-300 flex items-center justify-between pl-5 mr-1 pt-3 pb-2">
        <div className="text-2xl font-p font-bold flex-wrap">Deck Title</div>
        <div className="flex gap-2 p-4 flex-nowrap">
          {ELEMENT_IDS.map((elementId) => (
            <div key={elementId} className="relative flex items-center">
              <ElementIcon id={elementId} className="w-8 h-8" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {elementCounts[elementId] || 0}
              </span>
            </div>
          ))}
          <div className="relative flex items-center">
            <Image
              src={deckIcon}
              width={250}
              height={250}
              quality={100}
              alt="Deck icon"
              className="w-8 h-8"
            />
            <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-80">
              {totalCards}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {uniqueCardsWithCount.map(({ card, count }) => (
          <DeckCardsBanner
            key={card.id}
            card={card}
            count={count}
            onAddCard={(card) => onAddCard(card)}
            onRemoveCard={(card) => onRemoveCard(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default DeckCreator;
