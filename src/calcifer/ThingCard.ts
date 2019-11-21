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

  public composite: Matter.Composite;
}
