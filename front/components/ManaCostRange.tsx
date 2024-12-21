import { useState, useEffect } from "react";
import { useCards } from "@/context/CardsContext";
import ElementIcon from "./ElementIcon";

interface ManaCostRangeProps {
  elementId: number;
}

export default function ManaCostRange({ elementId }: ManaCostRangeProps) {
  const { updateManaCostSlider, manaCostSliders } = useCards();

  const initialValue =
    manaCostSliders.find((slider) => slider.elementId === elementId)?.value ||
    0;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const newValue =
      manaCostSliders.find((slider) => slider.elementId === elementId)?.value ||
      0;
    setValue(newValue);
  }, [manaCostSliders, elementId]); //

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    updateManaCostSlider(elementId, newValue);
  };

  return (
    <div className="flex items-center justify-between gap-1 sm:gap-0 p-2 border border-base-content border-opacity-40 rounded-lg">
      <ElementIcon
        id={elementId}
        className="w-[30px] h-[30px] lg:w-10 lg:h-10"
      />
      <input
        type="range"
        min={0}
        max="10"
        value={value}
        onChange={handleChange}
        className="range range-xs range-primary sm:w-60"
        step="1"
      />
      <p className="w-4">{value}</p>
    </div>
  );
}
