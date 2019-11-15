export interface ICoords {
  x: number;
  y: number;
}
export interface C {
  name: string;
  instanceid: string;
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

export const insertLeaf = (card: C, leaf: C): C =>
  card.child === undefined
    ? {
        ...card,
        child: {
          ...leaf,
          hasParent: true,
          coords: { x: card.coords.x + 165 / 2 + 10, y: card.coords.y }
        }
      }
    : { ...card, child: insertLeaf(card.child, leaf) };

export const putIn = (cards: C[], sourceID: string, childID: string): C[] => {
  const leaf = cards.find((c: C) => findByID(childID, c) !== undefined);
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
