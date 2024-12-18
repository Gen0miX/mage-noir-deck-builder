"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCards } from "@/context/CardsContext";
import { Card } from "@/context/types/Card";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import ElementIcon from "@/components/ElementIcon";

const CardPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
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
    <section className="flex justify-center w-full min-h-full">
      <div className="flex flex-col items-center p-4 font-p sm:w-[640px] lg:flex-row lg:w-[1024px]">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-circle btn-primary absolute top-0 right-0 mr-2 mt-2"
        >
          <FaTimes size={20} />
        </button>
        <div className="rounded-lg overflow-hidden shadow-lg w-full max-w-[372px] m-5">
          <Image
            src={card.imageUrl}
            alt={card.name}
            width={372}
            height={520}
            layout="responsive"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold mt-4 font-heading text-center mb-4">
            {card.name}
          </h1>
          <p className="text-lg font-light mt-2 text-justify">
            {card.description
              //A CHANGER AU SCRAPING POUR MEILLEURE RESULTAT !!!!
              // Ajoute un espace avant chaque parenthèse ouvrante
              .replace(/(\S)\(/g, "$1 (") // Ajoute un espace si un caractère précède une parenthèse ouvrante
              // Split uniquement sur les points qui ne sont pas suivis d'une parenthèse fermante
              .split(/(?<!\))\.(?!\))/)
              .filter((sentence) => sentence.trim() !== "") // Enlever les phrases vides
              .map((sentence, index) => (
                <React.Fragment key={index}>
                  {sentence.trim()}.
                  <br />
                </React.Fragment>
              ))}
          </p>

          <div className="divider"></div>

          <div className="flex flex-col sm:flex-row justify-between ">
            <div className="flex flex-col gap-5 mb-5">
              <p className="flex text-sm items-center gap-2">
                <strong>Élément : </strong>
                <ElementIcon
                  id={card.element.id}
                  className="w-6 h-6"
                ></ElementIcon>
              </p>
              <p className="text-sm">
                <strong>Extension : </strong> {card.extension.name}
              </p>
              <div className="flex flex-col sm:h-[120px]">
                <h2 className="text-xl font-bold font-heading mb-2">
                  Coût en Mana
                </h2>
                <ul className="">
                  {card.mana_cost.map((mana) => (
                    <li key={mana.id} className="flex gap-2 mb-1">
                      {Array.from({ length: mana.quantity }).map((_, index) => (
                        <ElementIcon
                          key={`${mana.id}-${index}`}
                          id={mana.id}
                          className="w-6"
                        />
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-5 mb-5">
              <p className="text-sm h-6">
                <strong>Type : </strong> {card.type.name}
              </p>
              <p className="text-sm">
                <strong>Illustrateur : </strong> {card.illustrator.name}
              </p>
              <div className="flex flex-col sm:h-[120px]">
                <h2 className="text-xl font-bold font-heading mb-2">
                  Composants
                </h2>
                <ul>
                  {card.components.map((component) => (
                    <li key={component.id} className="mb-1">
                      {component.quantity}x {component.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="text-sm sm:self-center">
            <strong>Point de vie : </strong> {card.hp}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardPage;
