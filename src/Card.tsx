import * as React from "react";
import reactable from "reactablejs";
import Duck from "./Duck.svg";
import { C, ICoords } from "./Data";

interface ISCProps {
  getRef: any;
  x: number;
  y: number;
  angle: number;
  dropping: boolean;
  cardData: C;
  onSetCoords(dy: number, dx: number, id: string): void;
  ond(parent: string, child: string): void;
}

const SC: React.FC<ISCProps> = (props: ISCProps) => {
  const width = 165 / 2;
  const { getRef, x, y, angle, dropping, cardData, onSetCoords, ond } = props;
  const [mousedown, setMousedown] = React.useState(false);
  const isHead = cardData.child && !cardData.hasParent;
  return (
    <>
      <div
        style={{
          position: "relative",
          left: x,
          top: y,
          width,
          height: 230 / 2,
          backgroundColor: dropping ? "#6BCAFF" : "#FFFFFF",
          opacity: mousedown ? 0.5 : 1,
          transition: "opacity 0.25s",
          transform: `rotate(${angle}deg)`,
          border: "1px solid black",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          touchAction: "none",
          zIndex: mousedown ? 1000 : "initial"
        }}
        onMouseDown={() => setMousedown(true)}
        onMouseUp={() => setMousedown(false)}
        ref={getRef}
        data-card-id={cardData.instanceid}
      >
        <img src={Duck} width={50} height={50} alt="card" />
      </div>
      {cardData.child && (
        // use transform when mousedown
        <Card
          cardData={cardData.child}
          onSetCoords={onSetCoords}
          onDrop={ond}
        />
      )}
    </>
  );
};

const Reactable = reactable(SC);

interface ICardProps {
  cardData: C;
  onSetCoords(dy: number, dx: number, id: string): void;
  onDrop(parent: string, child: string): void;
}

const Card: React.FC<ICardProps> = ({
  cardData,
  onSetCoords,
  onDrop
}: ICardProps) => {
  const [dropping, setDropping] = React.useState(false);
  return (
    <Reactable
      draggable={{
        onmove: ({ dy, dx }) => onSetCoords(dy, dx, cardData.instanceid)
      }}
      dropzone={{
        accept: ({ dropzone, draggableElement }) => true,
        ondragenter: () => setDropping(true),
        ondragleave: () => setDropping(false),
        ondrop: ({ relatedTarget }) => {
          onDrop(cardData.instanceid, relatedTarget.dataset.cardId);
          setDropping(false);
        },
        overlap: 0.1
      }}
      dropping={dropping}
      cardData={cardData}
      onSetCoords={onSetCoords}
      ond={onDrop}
      {...cardData.coords}
    />
  );
};

export default Card;
