import React, { useState } from "react";
import Card from "./Card";
import {
  C,
  ICoords,
  setCoords,
  putIn,
  lift,
  isUnrelated,
  dropDelete
} from "./Data";
import uniqid from "uniqid";
import Canvas from "./Canvas";

const tmp = (x: number, y: number) => ({
  name: "",
  instanceid: uniqid("card-"),
  color: "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
  hasParent: false,
  coords: { x, y }
});

interface IState {
  cards: C[];
}

const setAllCoords = (dy: number, dx: number, id: string, cards: C[]) =>
  cards.map((card: C) => setCoords(dy, dx, id, card));

const App: React.FC = () => {
  const [state, setState] = useState<IState>({
    cards: [tmp(500, 500), tmp(550, 500), tmp(600, 500)]
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
            setState(prevState => ({
              ...prevState,
              cards: setAllCoords(dy, dx, id, prevState.cards)
            }));
          }}
          isUnrelated={(id1, id2) => isUnrelated(state.cards, id1, id2)}
        />
      ))}
    </div>
  );
};

export default App;
