import React, { useState } from "react";
import Card from "./Card";
import { C, ICoords, setCoords, putIn } from "./Data";
import uniqid from "uniqid";

const tmp = () => ({
  name: "",
  instanceid: uniqid("card-"),
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
    cards: [{ ...tmp() }, tmp()]
  });
  return (
    <div style={{}}>
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
          onSetCoords={(dy, dx, id) =>
            // TODO: remove card from parent
            setState(prevState => ({
              ...prevState,
              cards: setAllCoords(dy, dx, id, prevState.cards)
            }))
          }
        />
      ))}
    </div>
  );
};

export default App;
