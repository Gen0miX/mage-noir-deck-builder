"use client";
import { act, useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import DeckCreator from "@/components/DeckCreator";
import { useCards } from "@/context/CardsContext";
import { Card } from "@/context/types/Card";
import Loading from "@/components/Loading";
import DeckBuilderNav from "@/components/DeckBuilderNav";
import FilterModal from "@/components/FilterModal";
import CardInfo from "@/components/CardInfo";

export default function DeckBuilderPage() {
  const { cards, loading } = useCards();
  const [activeView, setActiveView] = useState<"cards" | "deck" | "card">(
    "cards"
  );
  const [deck, setDeck] = useState<Card[]>([]);
  const [cardInfoCard, setCardInfoCard] = useState<Card | null>(null);
  const [toast, setToast] = useState<{
    type: "warning";
    message: string;
  } | null>(null);

  if (loading) return <Loading />;

  const openCardInfo = (card: Card) => {
    setCardInfoCard(card);
    setActiveView("card");
  };

  const closeCardInfo = () => {
    setCardInfoCard(null);
    setActiveView("cards");
  };

  const addToDeck = (card: Card) => {
    const countCard = deck.filter((c) => c.id === card.id).length;

    if (countCard >= 4) {
      console.log("card already 4 times in deck");
      return;
    }

    setDeck((prevDeck) => [...prevDeck, card]);
    console.log("Deck:", deck);
  };

  const removeFromDeck = (card: Card) => {
    setDeck((prevDeck) => {
      const index = prevDeck.findIndex((c) => c.id === card.id);
      if (index !== -1) {
        const newDeck = [...prevDeck];
        newDeck.splice(index, 1);
        return newDeck;
      }
      return prevDeck;
    });
  };

  const cardCounts = deck.reduce((acc, card) => {
    acc[card.id] = (acc[card.id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="h-full max-w-full flex flex-col">
      <div className="flex-1 overflow-hidden md:hidden">
        {activeView === "cards" && (
          <CardsGrid
            cards={cards}
            showFilters={true}
            showInspectButton={true}
            onInspectButtonClick={(card) => openCardInfo(card)}
            onCardClick={(card) => addToDeck(card)}
            onAddCard={(card) => addToDeck(card)}
            onRemoveCard={(card) => removeFromDeck(card)}
            cardCounts={cardCounts}
            gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          />
        )}
        {activeView === "deck" && (
          <DeckCreator
            deck={deck}
            onAddCard={(card) => addToDeck(card)}
            onRemoveCard={(card) => removeFromDeck(card)}
          />
        )}
      </div>
      {(activeView === "cards" || activeView === "deck") && (
        <div className="flex-1 overflow-hidden hidden md:flex">
          <CardsGrid
            cards={cards}
            showFilters={true}
            showInspectButton={true}
            onInspectButtonClick={(card) => openCardInfo(card)}
            onCardClick={(card) => addToDeck(card)}
            onAddCard={(card) => addToDeck(card)}
            onRemoveCard={(card) => removeFromDeck(card)}
            cardCounts={cardCounts}
            gridClassName="md:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4"
            containerClassName="md:w-1/2 xl:w-3/5"
          />
          <DeckCreator
            deck={deck}
            onAddCard={(card) => addToDeck(card)}
            onRemoveCard={(card) => removeFromDeck(card)}
          />
        </div>
      )}
      {activeView === "card" && cardInfoCard && (
        <CardInfo card={cardInfoCard} onClickClose={closeCardInfo} />
      )}
      <DeckBuilderNav activeView={activeView} setActiveView={setActiveView} />
      <FilterModal id="filter_modal"></FilterModal>
    </div>
  );
}
