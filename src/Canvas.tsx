import * as React from "react";
import p5 from "p5";
import Env from "./calcifer/env";
import reactable from "reactablejs";
import { C } from "./Data";
import { CARD_WIDTH, CARD_HEIGHT } from "./Card";

const Canv = ({ getRef, theref }: any) => {
  const [sk, setSk] = React.useState<any>(null);
  React.useImperativeHandle(theref, () => ({
    onDrop(card: C) {
      sk.onDrop({
        ...card,
        coords: {
          x: card.coords.x + CARD_WIDTH / 2,
          y: card.coords.y + CARD_HEIGHT / 2
        }
      });
    }
  }));
  const ref = React.useCallback((node: any) => {
    if (node !== null) {
      const sketch = (p: p5) => {
        const e = new Env(p);
        setSk(e);
        return e;
      };
      new p5(sketch, node);
    }
  }, []);

  return (
    <div ref={getRef}>
      <div ref={ref} />
    </div>
  );
};

// use `as any` to coerce
const Reactable = React.forwardRef((props: any, ref: any) => {
  const sub: React.FC = React.useMemo(
    () => (ps: any) => <Canv ref={ref} {...ps} />,
    [ref]
  );
  const Cl = React.useMemo(() => reactable(sub), [sub]);
  return <Cl {...props} />;
});

interface IProps {
  dropped(id: string, cb: (card: C) => void): void;
}

const Canvas: React.FC<IProps> = ({ dropped }: IProps) => {
  const ref = React.useRef<any>();
  return (
    <Reactable
      dropzone={
        {
          accept: ({ dropzone, draggableElement }) => {
            if (draggableElement.dataset.cardId) {
              return true;
            } else return false;
          },
          ondrop: ({ relatedTarget }) => {
            dropped(relatedTarget.dataset.cardId, (c: C) => {
              if (ref && ref.current) {
                ref.current.onDrop(c);
              }
            });
          },
          overlap: 0.5
        } as Interact.DropzoneOptions
      }
      theref={ref}
    />
  );
};

export default Canvas;
