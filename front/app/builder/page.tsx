"use client";
import { act, useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import DeckCreator from "@/components/DeckCreator";
import { useCards } from "@/context/CardsContext";
import { Card } from "@/context/types/Card";
import Loading from "@/components/Loading";
import DeckBuilderNav from "@/components/DeckBuilderNav";

export default function DeckBuilderPage() {
  const { cards, loading } = useCards();
  const [activeView, setActiveView] = useState<"cards" | "deck">("cards");

  if (loading) return <Loading />;

  const addToDeck = (card: Card) => {
    console.log(card.name);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden md:hidden">
        {activeView === "cards" && (
          <CardsGrid
            cards={cards}
            showFilters={true}
            showInspectButton={true}
            onCardClick={(card) => addToDeck(card)}
          />
        )}
        {activeView === "deck" && <DeckCreator />}
      </div>
      <div className="flex-1 overflow-hidden hidden md:flex">
        <CardsGrid
          cards={cards}
          showFilters={true}
          showInspectButton={true}
          onCardClick={(card) => addToDeck(card)}
        />
        <DeckCreator />
      </div>
      <DeckBuilderNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}
