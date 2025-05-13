import { useCards } from "@/context/CardsContext";
import { Card } from "@/context/types/Card";
import { useMemo } from "react";

export function useCardFiltering(initialCards: Card[]) {
  const {
    activeFilters,
    searchQuery,
    manaCostSliders,
    hpSlider,
    sortBy,
    sortOrders,
    activeComponentNameFilters,
  } = useCards();

  return useMemo(() => {
    let filtered = initialCards;

    // Step 1: Organize active filters by type
    const filterGroups = {
      element: activeFilters.filter((filter) =>
        initialCards.some((card) => card.element.name === filter)
      ),
      type: activeFilters.filter((filter) =>
        initialCards.some((card) => card.type.name === filter)
      ),
      extension: activeFilters.filter((filter) =>
        initialCards.some((card) => card.extension.name === filter)
      ),
      component: activeFilters.filter((filter) =>
        initialCards.some((card) =>
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

    if (activeComponentNameFilters.length > 0) {
      filtered = filtered.filter((card) =>
        activeComponentNameFilters.some((componentName) =>
          card.name.toLowerCase().includes(componentName.toLowerCase())
        )
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((card) => {
        const search = searchQuery.toLowerCase();
        const nameMatch = card.name.toLowerCase().includes(search);
        const descriptionMatch = card.description
          ?.toLowerCase()
          .includes(search);
        return nameMatch || descriptionMatch;
      });
    }

    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "element":
          comparison = a.elementId - b.elementId;
          break;
        case "type":
          comparison = a.type.name.localeCompare(b.type.name);
          break;
        case "hp":
          comparison = a.hp - b.hp;
          break;
        case "extension":
          comparison = a.extension.name.localeCompare(b.extension.name);
          break;
      }

      // Inverse le résultat si l'ordre est "desc" pour ce critère
      return sortOrders[sortBy] === "desc" ? -comparison : comparison;
    });
    return filtered;
  }, [
    initialCards,
    activeFilters,
    searchQuery,
    manaCostSliders,
    hpSlider,
    sortBy,
    sortOrders,
    activeComponentNameFilters,
  ]);
}
