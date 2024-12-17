"use client";
import React, { useEffect, useState } from "react";
import { fetchCards } from "@/api/cardsApi";

const CardsPage: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Cartes</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CardsPage;
