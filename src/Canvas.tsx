import * as React from "react";
import p5 from "p5";
import Env from "./calcifer/env";
import reactable from "reactablejs";
import { C } from "./Data";

const Canv: React.FC = ({ getRef, getDropFn }: any) => {
  const ref = React.useCallback(node => {
    if (node !== null) {
      const sketch = (p: p5) => new Env(p);
      new p5(sketch, node);
    }
  }, []);

  React.useEffect(() => {
    getDropFn((d: C) => console.log(`hi`, d));
  }, []);

  return (
    <div ref={getRef}>
      <div ref={ref} />
    </div>
  );
};

// use `as any` to coerce
const Reactable = reactable(Canv);

interface IProps {
  dropped(id: string): C;
}

const Canvas: React.FC<IProps> = ({ dropped }: IProps) => {
  const [dropfn, setDropfn] = React.useState<(card: C) => void>(console.log);
  const setdbfn = React.useCallback(
    (f: any) => {
      console.log(f);
      setDropfn(() => f);
    },
    [setDropfn]
  );
  const cb = React.useCallback((c: C) => dropfn(c), [dropfn]);
  return (
    <Reactable
      dropzone={{
        accept: ({ dropzone, draggableElement }) => {
          if (draggableElement.dataset.cardId) {
            return true;
          } else return false;
        },
        ondrop: ({ relatedTarget }) => {
          console.log(relatedTarget.dataset.cardId);
          const c = dropped(relatedTarget.dataset.cardId);
          cb(c);
        },
        overlap: 0.5
      }}
      getDropFn={setdbfn}
    />
  );
};

export default Canvas;
