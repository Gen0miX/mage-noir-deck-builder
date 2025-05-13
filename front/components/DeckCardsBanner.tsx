import { useState, useEffect } from "react";
import { Card } from "@/context/types/Card";
import { FaMinus, FaPlus } from "react-icons/fa";
import ElementIcon from "@/components/ElementIcon";
import Image from "next/image";

type DeckCardsBannerProps = {
  card: Card;
  count: number;
  onAddCard: (card: Card) => void;
  onRemoveCard: (card: Card) => void;
};

const DeckCardsBanner: React.FC<DeckCardsBannerProps> = ({
  card,
  count,
  onAddCard,
  onRemoveCard,
}) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [adjustedPos, setAdjustedPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const imageHeight = 336;
    const imageWidth = 240;
    const padding = 10;
    const footerHeight = 37;

    let top = mousePos.y + padding;
    let left = mousePos.x + padding;

    // Ajustement pour ne pas dépasser le bas de la fenêtre
    if (top + imageHeight > window.innerHeight - footerHeight) {
      top = window.innerHeight - footerHeight - imageHeight - padding;
    }

    // Ajustement pour ne pas dépasser la droite
    if (left + imageWidth > window.innerWidth) {
      left = window.innerWidth - imageWidth - padding;
    }

    setAdjustedPos({ top, left });
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        className={`bg-primary-content border-${card.element.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()} border-2 border-opacity-70 p-1 m-1 mx-2 rounded-xl`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ElementIcon id={card.elementId} className="w-8 h-8"></ElementIcon>
            <span
              className="ml-2"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onMouseMove={handleMouseMove}
            >
              {card.name}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => onRemoveCard?.(card)}
              disabled={count === 0}
              className="btn btn-circle btn-sm btn-outline"
            >
              <FaMinus className="text-xs" />
            </button>

            <span className="font-medium">{count} / 4</span>

            <button
              onClick={() => onAddCard?.(card)}
              disabled={count >= 4}
              className="btn btn-circle btn-outline btn-sm"
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
        </div>
      </div>
      {hovered && (
        <Image
          src={card.imageUrl}
          alt={card.name}
          width={200}
          height={300}
          className={`pointer-events-none fixed z-50 w-60 h-auto border-2 border-${card.element.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()} rounded-lg border-opacity-60 shadow-lg`}
          style={{
            top: adjustedPos.top,
            left: adjustedPos.left,
          }}
        />
      )}
    </>
  );
};

export default DeckCardsBanner;
