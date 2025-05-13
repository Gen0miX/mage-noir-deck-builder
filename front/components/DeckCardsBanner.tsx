import { Card } from "@/context/types/Card";
import { FaMinus, FaPlus } from "react-icons/fa";
import ElementIcon from "@/components/ElementIcon";

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
  return (
    <div
      className={`bg-${card.element.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()} p-1 m-1 mx-2 rounded`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <ElementIcon id={card.elementId} className="w-8 h-8"></ElementIcon>
          <span className="ml-2">{card.name}</span>
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
  );
};

export default DeckCardsBanner;
