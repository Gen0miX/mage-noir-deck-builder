"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCards } from "@/context/CardsContext";
import { Card } from "@/context/types/Card";
import Image from "next/image";

const CardPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const { getCardById } = useCards();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    console.log("yo");

    const loadCard = async () => {
      setLoading(true);
      const cardData = await getCardById(Number(id));
      setCard(cardData || null);
      setLoading(false);
    };

    loadCard();
  }, [id, getCardById]);

  if (loading) return <p>Loading...</p>;
  if (!card) return <p>Card not found</p>;

  console.log(card);

  return (
    <div className="flex flex-col items-center p-4">
      <Image src={card.imageUrl} alt={card.name} width={372} height={520} />
      <h1 className="text-2xl font-bold mt-4">{card.name}</h1>
      <p className="text-lg text-gray-600 mt-2">{card.description}</p>
      <p className="text-sm mt-2">
        <strong>Type:</strong> {card.type.name}
      </p>
      <p className="text-sm">
        <strong>Element:</strong> {card.element.name}
      </p>
      <p className="text-sm">
        <strong>Extension:</strong> {card.extension.name}
      </p>
      <p className="text-sm">
        <strong>Illustrator:</strong> {card.illustrator.name}
      </p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Mana Cost</h2>
        <ul>
          {card.mana_cost.map((mana) => (
            <li key={mana.id}>
              {mana.quantity}x {mana.name}
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-semibold">Composants</h2>
        <ul>
          {card.components.map((component) => (
            <li key={component.id}>
              {component.quantity}x {component.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardPage;
