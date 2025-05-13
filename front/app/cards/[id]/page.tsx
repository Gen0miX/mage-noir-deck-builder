"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCards } from "@/context/CardsContext";
import { Card } from "@/context/types/Card";
import CardInfo from "@/components/CardInfo";
import Loading from "@/components/Loading";

const CardPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getCardById } = useCards();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadCard = async () => {
      setLoading(true);
      const cardData = await getCardById(Number(id));
      setCard(cardData || null);
      setLoading(false);
    };

    loadCard();
  }, [id, getCardById]);

  const handleBack = () => {
    router.back();
  };

  if (loading) return <Loading />;
  if (!card) return <p>Card not found</p>;

  console.log(card);

  return <CardInfo card={card} onClickClose={handleBack}></CardInfo>;
};

export default CardPage;
