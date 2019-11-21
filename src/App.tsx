import React, { useState } from "react";
import { Card, StaticCard, CARD_WIDTH, CARD_HEIGHT } from "./Card";
import { C, setCoords, putIn, lift, isUnrelated, dropDelete } from "./Data";
import uniqid from "uniqid";
import Canvas from "./Canvas";
import CardIndex from "./calcifer/CardIndex";

const createCard = (name: string, x: number, y: number) => ({
  name,
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

const allCards = Object.keys(CardIndex).map((name: string) =>
  createCard(name, 0, 0)
);

const App: React.FC = () => {
  const [state, setState] = useState<IState>({
    cards: []
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
            setState(prevState => ({
              ...prevState,
              cards: setAllCoords(dy, dx, id, prevState.cards)
            }));
          }}
          isUnrelated={isUnrelated}
        />
      ))}
      <div
        style={{
          bottom: 0,
          position: "fixed",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.5)"
        }}
      >
        {allCards.map((card: C) => (
          <div
            style={{ display: "inline-block", margin: "1em", zIndex: 0 }}
            key={card.name}
            onMouseDown={(e: React.MouseEvent) => {
              const x = e.pageX - CARD_WIDTH / 2;
              const y = e.pageY - CARD_HEIGHT / 2;
              setState(prevState => ({
                ...prevState,
                cards: [...prevState.cards, createCard(card.name, x, y)]
              }));
            }}
          >
            <StaticCard cardData={card} dropping={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
