import { Element } from "./Element";
import { Type } from "./Type";
import { Extension } from "./Extension";
import { Illustrator } from "./Illustration";
import { ManaCost } from "./ManaCost";
import { Component } from "./Component";

export interface Card {
  id: number;
  name: string;
  elementId: number;
  typeId: number;
  hp: number;
  description: string;
  imageUrl: string;
  illustratorId: number;
  extensionId: number;
  createdAt: string;

  extension: Extension;
  illustrator: Illustrator;
  type: Type;
  element: Element;
  mana_cost: ManaCost[];
  components: Component[];
}
