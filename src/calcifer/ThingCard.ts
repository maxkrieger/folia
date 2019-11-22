import Matter from "matter-js";
import Card from "./CardClass";
import p5 from "p5";

export default abstract class Thing extends Card {
  constructor(name: string) {
    super(name);
    this.composite = Matter.Composite.create({ label: this.id });
  }
  protected startMillis = -1;

  public Setup = () => {
    this.setup();
    this.startMillis = this.p.millis();
  };
  public abstract setup(): any;

  public abstract draw(): any;

  public abstract p: p5;
  public drawableChildren: Thing[] = [];

  public onDragOut: (t: Thing) => void = () => {};
  public setOnDragOut = (cb: (t: Thing) => void) => {
    this.onDragOut = cb;
  };

  public composite: Matter.Composite;
}
