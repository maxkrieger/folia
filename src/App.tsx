import React, { useState } from "react";
import Card from "./Card";
import { C, ICoords, setCoords, putIn, lift, isUnrelated } from "./Data";
import uniqid from "uniqid";

const tmp = () => ({
  name: "",
  instanceid: uniqid("card-"),
  color: "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
  hasParent: false,
  coords: {
    x: 0,
    y: 0
  }
});

interface IState {
  cards: C[];
}

const setAllCoords = (dy: number, dx: number, id: string, cards: C[]) =>
  cards.map((card: C) => setCoords(dy, dx, id, card));

const App: React.FC = () => {
  const [state, setState] = useState<IState>({
    cards: [tmp(), tmp(), tmp()]
  });
  return (
    <div style={{ width: "100%", height: "100%" }}>
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
