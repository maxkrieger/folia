import React, { useState } from "react";
import { Card, CARD_WIDTH, CARD_HEIGHT, GUTTER_SIZE } from "./Card";
import {
  C,
  setCoords,
  putIn,
  lift,
  isUnrelated,
  dropDelete,
  findInAllByID
} from "./Data";
import uniqid from "uniqid";
import Canvas from "./Canvas";
import CardIndex from "./calcifer/CardIndex";

const createCard = (name: string, x: number, y: number): C => ({
  name,
  instanceid: uniqid("card-"),
  color: "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
  hasParent: false,
  coords: { x, y },
  isTemplate: true,
  angle: 0
});

interface IState {
  cards: C[];
}

const setAllCoords = (dy: number, dx: number, id: string, cards: C[]) =>
  cards.map((card: C) => setCoords(dy, dx, id, card));

const allCards = (bottomY: number) =>
  Object.keys(CardIndex).map((name: string, index: number) =>
    createCard(name, (CARD_WIDTH + GUTTER_SIZE) * index + GUTTER_SIZE, bottomY)
  );

const App: React.FC = () => {
  const allcards = allCards(window.innerHeight - CARD_HEIGHT - GUTTER_SIZE);
  const [state, setState] = useState<IState>({
    cards: allcards
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
                    createCard(c.name, c.coords.x, c.coords.y)
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
          bottom: 0,
          position: "fixed",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.5)",
          zIndex: 0,
          height: CARD_HEIGHT + GUTTER_SIZE * 2
        }}
      />
    </div>
  );
};

export default App;
