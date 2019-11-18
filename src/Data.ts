import { CARD_WIDTH, GUTTER_SIZE } from "./Card";

export interface ICoords {
  x: number;
  y: number;
}
export interface C {
  name: string;
  instanceid: string;
  color: string;
  child?: C;
  hasParent: boolean;
  coords: ICoords;
}

export const setCoords = (dy: number, dx: number, id: string, card: C): C =>
  card.instanceid === id
    ? {
        ...card,
        coords: { x: card.coords.x + dx, y: card.coords.y + dy },
        child: card.child
          ? setCoords(dy, dx, card.child.instanceid, card.child)
          : card.child
      }
    : card.child
    ? { ...card, child: setCoords(dy, dx, id, card.child) }
    : card;

export const findByID = (id: string, card: C): C | undefined =>
  card.instanceid === id
    ? card
    : card.child
    ? findByID(id, card.child)
    : undefined;

export const deleteByID = (id: string, card: C): C | undefined =>
  card.instanceid === id
    ? undefined
    : card.child
    ? { ...card, child: deleteByID(id, card.child) }
    : card;

export const dropDelete = (id: string, cards: C[]): [C, C[]] => {
  const found = cards
    .map((card: C) => findByID(id, card))
    .find((c: C | undefined) => c !== undefined);
  if (found === undefined) {
    console.error(`Cannot find card ${id}`);
    return [cards[0], cards];
  }
  const deleted = cards
    .map((card: C) => deleteByID(id, card))
    .filter((c: C | undefined) => c !== undefined);
  return [found, deleted as C[]];
};

export const shiftLeafX = (leaf: C, x: number, dx: number, y: number): C => ({
  ...leaf,
  hasParent: true,
  coords: { y, x },
  child: leaf.child ? shiftLeafX(leaf.child, x + dx, dx, y) : undefined
});

export const insertLeaf = (card: C, leaf: C): C =>
  card.child === undefined
    ? {
        ...card,
        child: shiftLeafX(
          leaf,
          card.coords.x + CARD_WIDTH + GUTTER_SIZE,
          CARD_WIDTH + GUTTER_SIZE,
          card.coords.y
        )
      }
    : { ...card, child: insertLeaf(card.child, leaf) };

export const putIn = (cards: C[], sourceID: string, childID: string): C[] => {
  const leaf = cards
    .map((c: C) => findByID(childID, c))
    .find((c: C | undefined) => c !== undefined);
  if (leaf === undefined) {
    console.error(`ASSERT: cannot find child by ID ${childID}`);
    return cards;
  }
  return (cards
    .map((card: C) => deleteByID(childID, card))
    .filter((card: C | undefined) => card !== undefined) as C[]).map(
    (card: C) => {
      if (findByID(sourceID, card) !== undefined) {
        return insertLeaf(card, leaf);
      } else {
        return card;
      }
    }
  );
};

export const isUnrelated = (cards: C[], id1: string, id2: string): boolean => {
  const head1 = cards
    .map((c: C) => findByID(id1, c))
    .find((c: C | undefined) => c !== undefined);
  const head2 = cards
    .map((c: C) => findByID(id2, c))
    .find((c: C | undefined) => c !== undefined);

  if (head1 === undefined || head2 === undefined) {
    console.log(`Cannot find ${id1} ${head1} ${id2} ${head2}`);
    return false;
  }

  return (
    findByID(id1, head2) === undefined && findByID(id2, head1) === undefined
  );
};

export const lift = (cards: C[], id: string): C[] => {
  const leaf = cards
    .map((c: C) => findByID(id, c))
    .find((c: C | undefined) => c !== undefined);

  if (leaf === undefined) {
    console.error(`ASSERT: cannot find ID ${id}`);
    return cards;
  }
  if (!leaf.hasParent) {
    return cards;
  }
  const removed = cards
    .map((card: C) => deleteByID(id, card))
    .filter((card: C | undefined) => card !== undefined) as C[];
  return [...removed, { ...leaf, hasParent: false }];
};

export const depth = (card: C): number =>
  card.child ? depth(card.child) + 1 : 1;
