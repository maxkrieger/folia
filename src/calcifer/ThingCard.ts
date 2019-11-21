import Matter from "matter-js";
import Card from "./CardClass";

export default abstract class Thing extends Card {
  constructor(name: string) {
    super(name);
    this.composite = Matter.Composite.create({ label: this.id });
  }

  public abstract setup(): any;

  public abstract draw(): any;

  public drawableChildren: Thing[] = [];

  public composite: Matter.Composite;
}