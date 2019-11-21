import * as React from "react";
import reactable from "reactablejs";
import { C, depth, shiftLeafX } from "./Data";
import interact from "interactjs";
import CardIndex from "./calcifer/CardIndex";

export const CARD_WIDTH = 165 / 2;

export const CARD_HEIGHT = 230 / 2;

export const GUTTER_SIZE = 10;

interface ISCProps {
  getRef: any;
  x: number;
  y: number;
  angle: number;
  dropping: boolean;
  cardData: C;
  allCards: C[];
  mousedown: boolean;
  onSetCoords(dy: number, dx: number, id: string): void;
  ond(parent: string, child: string): void;
  onLift(id: string): void;
  isUnrelated(isUnrelated: C[], id1: string, id2: string): boolean;
}

const StaticCard: React.FC<any> = ({ cardData, dropping }: any) => {
  const Icon = CardIndex[cardData.name][1];
  return (
    <div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: dropping ? "#6BCAFF" : "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        border: "1px solid black",
        alignItems: "center",
        cursor: "grab",
        zIndex: 10
      }}
    >
      <Icon color={cardData.color} />
    </div>
  );
};

const SC: React.FC<ISCProps> = (props: ISCProps) => {
  const {
    getRef,
    x,
    y,
    dropping,
    cardData,
    onSetCoords,
    ond,
    onLift,
    mousedown,
    isUnrelated,
    allCards
  } = props;

  const c = <StaticCard cardData={cardData} dropping={dropping} />;
  const isSingleton = cardData.child === undefined && !cardData.hasParent;
  const selfcontain = (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: mousedown ? 0.5 : 1,
        transition: "opacity 0.25s, transform 0.25s",
        transform: `rotate(${isSingleton ? cardData.angle : 0}deg)`,
        boxSizing: "border-box",
        touchAction: "none",
        zIndex: mousedown ? 1000 : 10
      }}
      data-card-id={cardData.instanceid}
      ref={getRef}
    >
      {c}
    </div>
  );
  if (!cardData.child) {
    return selfcontain;
  }
  const child = (
    <Card
      cardData={
        mousedown
          ? shiftLeafX(
              cardData.child,
              cardData.coords.x + CARD_WIDTH / 5,
              CARD_WIDTH / 5,
              cardData.coords.y
            )
          : cardData.child
      }
      allCards={allCards}
      onSetCoords={onSetCoords}
      onDrop={ond}
      onLift={onLift}
      isUnrelated={isUnrelated}
    />
  );
  return (
    <>
      {selfcontain}
      {child}
    </>
  );
};

interface ICardProps {
  cardData: C;
  allCards: C[];
  onSetCoords(dy: number, dx: number, id: string): void;
  onDrop(parent: string, child: string): void;
  onLift(id: string): void;
  isUnrelated(cards: C[], id1: string, id2: string): boolean;
}

const Reactable = reactable(SC);

const Card: React.FC<ICardProps> = ({
  cardData,
  onSetCoords,
  onDrop,
  onLift,
  isUnrelated,
  allCards
}: ICardProps) => {
  const [dropping, setDropping] = React.useState(false);

  const [mousedown, setMousedown] = React.useState(false);
  const isHead = cardData.child !== undefined && !cardData.hasParent;

  // This doesn't actually help since reactable's a HOC
  const dropzone = React.useMemo(
    () => ({
      ondragenter: () => setDropping(true),
      ondragleave: () => setDropping(false),
      ondrop: ({ relatedTarget }: any) => {
        onDrop(cardData.instanceid, relatedTarget.dataset.cardId);
        setDropping(false);
      },
      overlap: 0.1,
      accept: ({ dropzone, draggableElement }: any) => {
        if (draggableElement.dataset.cardId) {
          return (
            isUnrelated(
              allCards,
              cardData.instanceid,
              draggableElement.dataset.cardId as string
            ) && cardData.instanceid !== draggableElement.dataset.cardId
          );
        } else return false;
      }
    }),
    [allCards, cardData.instanceid, isUnrelated, onDrop]
  );

  const c = (
    <Reactable
      draggable={
        {
          inertia: true,
          onend: () => onLift(cardData.instanceid),
          onmove: ({ dy, dx }: any) => onSetCoords(dy, dx, cardData.instanceid),
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: document.body
            })
          ]
        } as any
      }
      dropzone={dropzone}
      dropping={dropping}
      onDown={() => {
        setMousedown(true);
      }}
      onUp={() => {
        setMousedown(false);
      }}
      mousedown={mousedown}
      cardData={cardData}
      onSetCoords={onSetCoords}
      onLift={onLift}
      ond={onDrop}
      allCards={allCards}
      isUnrelated={isUnrelated}
      {...cardData.coords}
    />
  );
  return (
    <>
      <div
        style={{
          display: isHead && !mousedown ? "initial" : "none",
          position: "absolute",
          width: depth(cardData) * (CARD_WIDTH + GUTTER_SIZE) + GUTTER_SIZE,
          height: CARD_HEIGHT + 20,
          left: cardData.coords.x - GUTTER_SIZE,
          top: cardData.coords.y - GUTTER_SIZE,
          backgroundColor: "tan",
          borderRadius: "10px",
          zIndex: 10
        }}
      />
      {c}
    </>
  );
};

export { Card, StaticCard };
