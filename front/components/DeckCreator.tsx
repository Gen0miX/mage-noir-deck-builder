import React from "react";
import { Card } from "@/context/types/Card";
import { div } from "framer-motion/client";

type DeckCreatorProps = {
  deck: Card[];
};

const DeckCreator: React.FC<DeckCreatorProps> = ({ deck }) => {
  return (
    <div className="bg-base-300 h-full flex-grow border-l border-l-base-content border-opacity-40 overflow-y-auto">
      Deck Creator
      <div className="flex flex-col">
        {deck.map((card, index) => (
          <div key={`${card.id}-${index}`}>{card.name}</div>
        ))}
      </div>
    </div>
  );
};

export default DeckCreator;
