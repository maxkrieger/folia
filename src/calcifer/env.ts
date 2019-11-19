import * as p5 from "p5";
import Matter from "matter-js";
import Thing from "./ThingCard";
import { C } from "../Data";
import Ball from "./Ball";
// import Attribute from "./AttributeCard";
// import Ball from "./things/Ball";
// import Big from "./things/Big";
// import Repeat from "./things/Repeat";
// import Oscillate from "./things/Oscillate";
// import Emitter from "./things/Emitter";

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
    console.log("peekaboo!", card);
    this.addThing(
      new Ball(this.p, this.engine.world, card.coords.x, card.coords.y)
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
    // this.addThing(
    //   new Ball(
    //     this.p,
    //     this.engine.world,
    //     this.updateComposite,
    //     100,
    //     100,
    //     new Big(this.p, new Repeat())
    //   )
    // );
    // this.addThing(
    //   new Ball(
    //     this.p,
    //     this.engine.world,
    //     200,
    //     200,
    //     new Oscillate(this.p, new Repeat())
    //   )
    // );
    // this.addThing(
    //   new Ball(
    //     this.p,
    //     this.engine.world,
    //     400,
    //     400,
    //     new Ball(this.p, this.engine.world, 450, 450)
    //   )
    // );
    // this.addThing(
    //   new Emitter(
    //     this.p,
    //     this.engine.world,
    //     100,
    //     100,
    //     new Ball(
    //       this.p,
    //       this.engine.world,
    //       10,
    //       10,
    //       new Oscillate(this.p, new Repeat())
    //     )
    //   )
    // );
    this.things.forEach(t => t.setup());

    this.mouseConstraint.mouse.pixelRatio = this.p.pixelDensity();
    Matter.World.add(this.engine.world, this.mouseConstraint);
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
