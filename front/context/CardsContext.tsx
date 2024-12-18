"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCards, fetchCardById } from "@/api/cardsApi";
import { Card } from "@/context/types/Card";

export interface CardsContextType {
  cards: Card[];
  loading: boolean;
  fetchAllCards: () => Promise<void>;
  getCardById: (id: number) => Promise<Card | undefined>;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour charger toutes les cartes
  const fetchAllCards = async () => {
    setLoading(true);
    try {
      const data = await fetchCards();
      setCards(data); // Assume que l'API retourne un tableau de cartes
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCardById = async (id: number): Promise<Card | undefined> => {
    const existingCard = cards.find((card) => card.id === id);
    if (existingCard) return existingCard;

    try {
      const fetchedCard = await fetchCardById(id); // API pour chercher la carte
      const cardData = Array.isArray(fetchedCard)
        ? fetchedCard[0]
        : fetchedCard; // Vérifie si la réponse est un tableau
      if (cardData) {
        setCards((prevCards) => [...prevCards, cardData]);
      }
      return cardData;
    } catch (error) {
      console.error("Error fetching card by ID:", error);
      return undefined;
    }
  };

  // Charger les cartes dès le début
  useEffect(() => {
    fetchAllCards();
  }, []);

  return (
    <CardsContext.Provider
      value={{ cards, loading, fetchAllCards, getCardById }}
    >
      {children}
    </CardsContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useCards = (): CardsContextType => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};
