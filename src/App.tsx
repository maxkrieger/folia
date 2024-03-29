import React, { useState } from "react";
import { Card, CARD_WIDTH, CARD_HEIGHT, GUTTER_SIZE } from "./Card";
import {
  C,
  setCoords,
  putIn,
  lift,
  isUnrelated,
  dropDelete,
  findInAllByID,
  createCard,
  incrementAges
} from "./Data";
import Canvas from "./Canvas";
import CardIndex from "./calcifer/CardIndex";
import useInterval from "./useInterval";

export const CARD_PALETTE_OFFSET = 50;

interface IState {
  cards: C[];
}

const setAllCoords = (dy: number, dx: number, id: string, cards: C[]) =>
  cards.map((card: C) => setCoords(dy, dx, id, card));

const allCards = (bottomY: number) =>
  Object.keys(CardIndex).map((name: string, index: number) =>
    createCard(
      name,
      window.innerWidth / 2 -
        ((CARD_WIDTH + GUTTER_SIZE) * Object.keys(CardIndex).length) / 2 +
        (CARD_WIDTH + GUTTER_SIZE) * index +
        GUTTER_SIZE,
      bottomY,
      CardIndex[name][2],
      true
    )
  );

const App: React.FC = () => {
  const allcards = allCards(
    window.innerHeight - CARD_HEIGHT - GUTTER_SIZE - CARD_PALETTE_OFFSET
  );
  const [state, setState] = useState<IState>({
    cards: allcards
  });

  useInterval(() => {
    setState({ ...state, cards: incrementAges(state.cards) });
  }, 1000);

  return (
    <div
      style={{ width: "100%", height: `calc(100%-${CARD_PALETTE_OFFSET}px)` }}
    >
      <Canvas
        dropped={(id: string, cb: (card: C) => void) => {
          setState(prevState => {
            const [found, deleted] = dropDelete(id, prevState.cards);
            cb(found);
            return {
              ...prevState,
              cards: deleted
            };
          });
        }}
        addCard={(card: C) => {
          setState(prevState => ({
            ...prevState,
            cards: [...prevState.cards, card]
          }));
        }}
      />
      {state.cards.map((card: C) => (
        <Card
          key={card.instanceid}
          cardData={card}
          allCards={state.cards}
          onDrop={(parentID: string, childID: string) =>
            setState(prevState => ({
              ...prevState,
              cards: putIn(prevState.cards, parentID, childID)
            }))
          }
          onLift={(id: string) =>
            setState(prevState => ({
              ...prevState,
              cards: lift(prevState.cards, id)
            }))
          }
          onSetCoords={(dy, dx, id) => {
            setState(prevState => {
              const c = findInAllByID(id, prevState.cards);
              const newcards = c.isTemplate
                ? [
                    ...setAllCoords(dy, dx, id, prevState.cards),
                    createCard(c.name, c.coords.x, c.coords.y, c.type, true)
                  ]
                : setAllCoords(dy, dx, id, prevState.cards);
              return {
                ...prevState,
                cards: newcards
              };
            });
          }}
          isUnrelated={isUnrelated}
        />
      ))}
      <div
        style={{
          bottom: CARD_PALETTE_OFFSET,
          position: "fixed",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.5)",
          zIndex: 0,
          height: CARD_HEIGHT + GUTTER_SIZE * 2
        }}
      />
      <button
        style={{ position: "absolute", bottom: 0, left: 0 }}
        onClick={() => window.location.reload()}
      >
        reset
      </button>
    </div>
  );
};

export default App;
