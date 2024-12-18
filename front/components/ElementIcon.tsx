import VegetalIcon from "@/public/elements/vegetal_icon_round.png";
import FireIcon from "@/public/elements/fire_icon_round.png";
import AirIcon from "@/public/elements/air_icon_round.png";
import WaterIcon from "@/public/elements/water_icon_round.png";
import MineralIcon from "@/public/elements/mineral_icon_round.png";
import ArcaneIcon from "@/public/elements/arcane_icon_round.png";
import Image from "next/image";

interface ElementIconProps {
  id: number;
  className?: string;
}

export default function ElementIcon({ id, className }: ElementIconProps) {
  if (id == 1)
    return (
      <Image
        src={VegetalIcon}
        width={250}
        height={250}
        quality={100}
        className={`${className}`}
        alt="Icône élément végétal"
      />
    );
  if (id == 2)
    return (
      <Image
        src={FireIcon}
        width={250}
        height={250}
        quality={100}
        className={`${className}`}
        alt="Icône élément feu"
      />
    );
  if (id == 3)
    return (
      <Image
        src={AirIcon}
        width={250}
        height={250}
        quality={100}
        className={`${className}`}
        alt="Icône élément air"
      />
    );
  if (id == 4)
    return (
      <Image
        src={WaterIcon}
        width={250}
        height={250}
        quality={100}
        className={`${className}`}
        alt="Icône élément eau"
      />
    );
  if (id == 5)
    return (
      <Image
        src={MineralIcon}
        width={250}
        height={250}
        quality={100}
        className={`${className}`}
        alt="Icône élément minéral"
      />
    );
  if (id == 6)
    return (
      <Image
        src={ArcaneIcon}
        width={250}
        height={250}
        quality={100}
        className={`${className}`}
        alt="Icône élément arcane"
      />
    );
}
