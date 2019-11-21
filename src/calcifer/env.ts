import * as p5 from "p5";
import Matter from "matter-js";
import Thing from "./ThingCard";
import { C } from "../Data";
import CardIndex from "./CardIndex";
import Card from "./CardClass";

export default class Env {
  public mouse: Matter.Mouse;
  public mouseConstraint: Matter.MouseConstraint;
  public canvas: p5.Renderer;
  public p: p5;
  public engine: Matter.Engine;

  public things: Thing[] = [];

  constructor(p: p5) {
    this.p = p;
    this.p.setup = this.Setup;
    this.p.windowResized = this.windowResized;
    this.p.draw = this.draw;
    this.engine = Matter.Engine.create();

    // this.p.preload = this.preload;
  }
  public windowResized = () => {
    this.p.resizeCanvas(this.p.windowWidth, this.p.windowHeight / 2);
  };
  public onDrop = (card: C) => {
    const constructed = this.construct(card);
    if (constructed instanceof Thing) {
      this.addThing(constructed);
    }
    // else: do placeholder?
  };
  public construct = (card: C): Card => {
    // NOTE: coords.x/y are card specific
    return new CardIndex[card.name](
      this.p,
      this.engine.world,
      card.coords.x,
      card.coords.y,
      card.child ? this.construct(card.child) : undefined
    );
  };
  public addThing = (thing: Thing) => {
    thing.getEffect((name, payload) => {
      this.things.push(payload);
    });
  };
  public Setup = () => {
    this.canvas = this.p.createCanvas(
      this.p.windowWidth,
      this.p.windowHeight / 2
    );
    this.mouse = Matter.Mouse.create(this.canvas.elt);
    const mouseParams = {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.3,
        angularStiffness: 0.95
      } as any
    };
    this.mouseConstraint = Matter.MouseConstraint.create(
      this.engine,
      mouseParams
    );
    this.engine.world.gravity.y = 0;

    this.things.forEach(t => t.setup());

    this.mouseConstraint.mouse.pixelRatio = this.p.pixelDensity();
    Matter.World.add(this.engine.world, this.mouseConstraint);
    Matter.World.add(
      this.engine.world,
      Matter.Bodies.rectangle(
        0,
        this.p.windowHeight / 2 + 50,
        this.p.windowWidth,
        50,
        { isStatic: true }
      )
    );
    Matter.Engine.run(this.engine);
  };
  public draw = () => {
    // Matter.Engine.update(this.engine);
    this.p.background("#322931");
    this.things.forEach(t => {
      t.draw();
    });
  };
}
