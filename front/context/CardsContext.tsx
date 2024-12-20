"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCards, fetchCardById, fetchFilterData } from "@/api/cardsApi";
import {
  Card,
  Component,
  Element,
  Type,
  Extension,
} from "@/context/types/Card";

export interface CardsContextType {
  cards: Card[];
  loading: boolean;
  fetchAllCards: () => Promise<void>;
  getCardById: (id: number) => Promise<Card | undefined>;
  activeFilters: string[];
  toggleFilter: (filter: string | { elementId: number; value: number }) => void;
  components: Component[];
  elements: Element[];
  types: Type[];
  extensions: Extension[];
  fetchFilters: () => Promise<void>;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [elements, setElements] = useState<Element[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [extensions, setExtensions] = useState<Extension[]>([]);

  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const fetchFilters = async () => {
    try {
      // Charge toutes les données des filtres en un seul appel
      const { elements, types, extensions, components } =
        await fetchFilterData();

      // Met à jour les états locaux
      setElements(elements);
      setTypes(types);
      setExtensions(extensions);
      setComponents(components);
    } catch (error) {
      console.error("Failed to fetch filter data:", error);
    }
  };

  const toggleFilter = (
    filter: string | { elementId: number; value: number }
  ) => {
    setActiveFilters((prevFilters) => {
      let newFilters = [...prevFilters];

      // Cas 1 : Gestion d'un slider
      if (typeof filter === "object") {
        const filterKey = `mana:${filter.elementId}`;
        // Supprime l'ancien filtre pour cet élément, s'il existe
        newFilters = newFilters.filter((f) => !f.startsWith(filterKey));
        // Ajoute le filtre seulement si la valeur > 0
        if (filter.value > 0) {
          newFilters.push(`${filterKey}=${filter.value}`);
        }
      }
      // Cas 2 : Gestion d'un filtre classique (chaîne)
      else {
        if (newFilters.includes(filter)) {
          // Supprime le filtre s'il est déjà actif
          newFilters = newFilters.filter((f) => f !== filter);
        } else {
          // Ajoute le filtre sinon
          newFilters.push(filter);
        }
      }

      return newFilters;
    });
  };

  // Fonction pour charger toutes les cartes
  const fetchAllCards = async () => {
    setLoading(true);
    try {
      const data = await fetchCards();
      setCards(data);
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
    fetchFilters();
    fetchAllCards();
  }, []);

  return (
    <CardsContext.Provider
      value={{
        cards,
        loading,
        fetchAllCards,
        getCardById,
        activeFilters,
        toggleFilter,
        components,
        elements,
        types,
        extensions,
        fetchFilters,
      }}
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
