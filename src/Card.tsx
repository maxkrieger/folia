import * as React from "react";
import reactable from "reactablejs";
import Duck from "./Duck";
import { C, ICoords, depth, shiftLeafX } from "./Data";
import interact from "interactjs";

export const CARD_WIDTH = 165 / 2;

export const CARD_HEIGHT = 230 / 2;

interface ISCProps {
  getRef: any;
  x: number;
  y: number;
  angle: number;
  dropping: boolean;
  cardData: C;
  mousedown: boolean;
  onSetCoords(dy: number, dx: number, id: string): void;
  ond(parent: string, child: string): void;
  onLift(id: string): void;
  isUnrelated(id1: string, id2: string): boolean;
}

const SC: React.FC<ISCProps> = (props: ISCProps) => {
  const {
    getRef,
    x,
    y,
    angle,
    dropping,
    cardData,
    onSetCoords,
    ond,
    onLift,
    mousedown,
    isUnrelated
  } = props;
  const [md, setMousedown] = React.useState(false);

  const c = (
    <div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: dropping ? "#6BCAFF" : "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Duck color={cardData.color} />
    </div>
  );
  const selfcontain = (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: mousedown ? 0.5 : 1,
        transition: "opacity 0.25s",
        transform: `rotate(${angle}deg)`,
        border: "1px solid black",
        boxSizing: "border-box",
        touchAction: "none",
        zIndex: mousedown ? 1000 : "initial"
      }}
      onMouseDown={() => setMousedown(true)}
      onMouseUp={() => setMousedown(false)}
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

const Reactable = reactable(SC);

interface ICardProps {
  cardData: C;
  onSetCoords(dy: number, dx: number, id: string): void;
  onDrop(parent: string, child: string): void;
  onLift(id: string): void;
  isUnrelated(id1: string, id2: string): boolean;
}

const Card: React.FC<ICardProps> = ({
  cardData,
  onSetCoords,
  onDrop,
  onLift,
  isUnrelated
}: ICardProps) => {
  const [dropping, setDropping] = React.useState(false);

  const [mousedown, setMousedown] = React.useState(false);
  const isHead = cardData.child !== undefined && !cardData.hasParent;

  const c = (
    // TODO: inertia?

    <Reactable
      draggable={
        {
          onend: () => onLift(cardData.instanceid),
          onmove: ({ dy, dx }: any) => onSetCoords(dy, dx, cardData.instanceid),
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: document.body
            })
          ]
        } as any
      }
      dropzone={{
        accept: ({ dropzone, draggableElement }) => {
          if (draggableElement.dataset.cardId) {
            return (
              isUnrelated(
                cardData.instanceid,
                draggableElement.dataset.cardId as string
              ) && cardData.instanceid !== draggableElement.dataset.cardId
            );
          } else return false;
        },
        ondragenter: () => setDropping(true),
        ondragleave: () => setDropping(false),
        ondrop: ({ relatedTarget }) => {
          onDrop(cardData.instanceid, relatedTarget.dataset.cardId);
          setDropping(false);
        },
        overlap: 0.1
      }}
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
          width: depth(cardData) * (CARD_WIDTH + 10) + 10,
          height: CARD_HEIGHT + 20,
          left: cardData.coords.x - 10,
          top: cardData.coords.y - 10,
          backgroundColor: "tan",
          borderRadius: "10px"
        }}
      />
      {c}
    </>
  );
};

export default Card;
