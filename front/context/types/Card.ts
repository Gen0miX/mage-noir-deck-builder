export interface Component {
  id: number;
  name: string;
}

export interface ComponentCard {
  id: number;
  name: string;
  quantity: number;
}

export interface ManaCost {
  id: number;
  name: string;
  quantity: number;
}

export interface Element {
  id: number;
  name: string;
}

export interface Extension {
  id: number;
  name: string;
}

export interface Illustrator {
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
}

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
  components: ComponentCard[];
}
