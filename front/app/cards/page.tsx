"use client";
import React, { useEffect, useState } from "react";
import { fetchCards } from "@/api/cardsApi";
import Image from "next/image";

const CardsPage: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        console.log(data);
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
    <div className="min-h-svh">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-5 mb-5 mx-5">
        {cards.map((card) => (
          <div key={card.id} className="relative group ">
            {/* Image optimisée avec Next.js */}
            <Image
              src={card.imageUrl}
              alt={card.name}
              width={372}
              height={520}
              layout="responsive" // S'assure que l'image garde son ratio
              className="object-cover transition-transform duration-300 shadow-lg group-hover:shadow-[0_0px_0px_25px_10px_rgba(222,0,0,1)] rounded-lg"
              loading="lazy"
            />
            {/* Overlay pour le nom */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm font-semibold">{card.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsPage;
