"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCards, fetchCardById, fetchFilterData } from "@/api/cardsApi";
import {
  Card,
  Component,
  Element,
  Type,
  Extension,
  ManaCostSlider,
} from "@/context/types/Card";

export interface CardsContextType {
  cards: Card[];
  loading: boolean;
  fetchAllCards: () => Promise<void>;
  getCardById: (id: number) => Promise<Card | undefined>;
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
  components: Component[];
  elements: Element[];
  types: Type[];
  extensions: Extension[];
  fetchFilters: () => Promise<void>;
  manaCostSliders: ManaCostSlider[];
  updateManaCostSlider: (elementId: number, value: number) => void;
  hpSlider: number;
  updateHpSlider: (value: number) => void;
  resetFilters: () => void;
  sortBy: "name" | "element" | "type" | "hp" | "extension";
  setSortBy: (sortBy: "name" | "element" | "type" | "hp" | "extension") => void;
  sortOrders: {
    [key in "name" | "element" | "type" | "hp" | "extension"]: "asc" | "desc";
  };
  toggleSortOrder: (
    key: "name" | "element" | "type" | "hp" | "extension"
  ) => void;
  activeComponentNameFilters: string[];
  toggleComponentNameFilter: (componentName: string) => void;
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
  const [manaCostSliders, setManaCostSliders] = useState<ManaCostSlider[]>([]);
  const [hpSlider, setHpSlider] = useState<number>(0);
  const [activeComponentNameFilters, setActiveComponentNameFilters] = useState<
    string[]
  >([]);

  const [sortBy, setSortBy] = useState<
    "name" | "element" | "type" | "hp" | "extension"
  >("element");
  const [sortOrders, setSortOrders] = useState<{
    [key in "name" | "element" | "type" | "hp" | "extension"]: "asc" | "desc";
  }>({
    name: "asc",
    element: "asc",
    type: "asc",
    hp: "desc",
    extension: "asc",
  });

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

  const toggleFilter = (filter: string) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const toggleComponentNameFilter = (componentName: string) => {
    setActiveComponentNameFilters((prevFilters) =>
      prevFilters.includes(componentName)
        ? prevFilters.filter((name) => name !== componentName)
        : [...prevFilters, componentName]
    );
  };

  const updateManaCostSlider = (elementId: number, value: number) => {
    setManaCostSliders((prevSliders) => {
      const updatedSliders = prevSliders.filter(
        (slider) => slider.elementId !== elementId
      );
      if (value > 0) {
        updatedSliders.push({ elementId, value });
      }
      return updatedSliders;
    });
  };

  const updateHpSlider = (value: number) => {
    setHpSlider(value);
  };

  const resetFilters = () => {
    setActiveFilters([]);
    setManaCostSliders([]);
    setHpSlider(0);
  };

  const toggleSortOrder = (
    key: "name" | "element" | "type" | "hp" | "extension"
  ) => {
    setSortOrders((prevOrders) => ({
      ...prevOrders,
      [key]: prevOrders[key] === "asc" ? "desc" : "asc",
    }));
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
        manaCostSliders,
        updateManaCostSlider,
        hpSlider,
        updateHpSlider,
        resetFilters,
        sortBy,
        setSortBy,
        sortOrders,
        toggleSortOrder,
        activeComponentNameFilters,
        toggleComponentNameFilter,
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
