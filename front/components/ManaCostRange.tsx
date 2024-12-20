import { useState } from "react";
import { useCards } from "@/context/CardsContext";
import ElementIcon from "./ElementIcon";

interface ManaCostRangeProps {
  elementId: number;
}

export default function ManaCostRange({ elementId }: ManaCostRangeProps) {
  const { toggleFilter } = useCards();
  const [value, setValue] = useState(0); // État pour la valeur

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    toggleFilter({ elementId, value: newValue });
  };

  return (
    <div className="flex items-center justify-between p-2 border border-base-content border-opacity-40 rounded-lg">
      <ElementIcon
        id={elementId}
        className="w-[30px] h-[30px] lg:w-10 lg:h-10"
      />
      <div className="flex flex-col w-60">
        <input
          type="range"
          min={0}
          max="10"
          value={value}
          onChange={handleChange}
          className="range range-xs range-primary"
          step="1"
        />
      </div>
      <p className="w-4">{value}</p>
    </div>
  );
}
