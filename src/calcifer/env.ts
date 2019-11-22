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
  public onDragOut: (t: Thing) => void;
  public rainbowMode = false;
  public penMode: {
    enable: boolean;
    rainbow: boolean;
    lastX: number;
    lastY: number;
  } = {
    enable: false,
    rainbow: false,
    lastX: -1,
    lastY: -1
  };
  public startMillis = 0;

  public things: Thing[] = [];

  constructor(p: p5, onDragOut: (t: Thing) => void) {
    this.p = p;
    this.p.setup = this.Setup;
    this.p.windowResized = this.windowResized;
    this.p.draw = this.draw;
    this.engine = Matter.Engine.create();
    this.onDragOut = onDragOut;
    // this.p.preload = this.preload;
  }
  public windowResized = () => {
    this.p.resizeCanvas(this.p.windowWidth, this.p.windowHeight / 2);
  };
  public onDrop = (card: C) => {
    const constructed = this.construct(card);
    if (constructed instanceof Thing) {
      this.addThing(constructed);
    } else {
      constructed.getEffect((name, payload) => {
        if (name === "rainbow") {
          this.rainbowMode = !this.rainbowMode;
        } else if (name === "pen") {
          this.penMode = {
            lastX: card.coords.x,
            lastY: card.coords.y,
            enable: true,
            rainbow: payload.rainbow
          };
        }
      });
      // Env-wide attrs or x/y placeholder
    }
  };
  public construct = (card: C): Card => {
    // NOTE: coords.x/y are card specific
    return new CardIndex[card.name][0](
      this.p,
      this.engine.world,
      card.coords.x,
      card.coords.y,
      card.child ? this.construct(card.child) : undefined
    );
  };

  public walls: Matter.Body[];
  public addThing = (thing: Thing) => {
    thing.Setup();
    thing.getEffect((name, payload) => {
      payload.setOnDragOut((t: Thing) => {
        this.things = this.things.filter((t2: Thing) => t2.id !== t.id);
        this.onDragOut(t);
      });
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
        stiffness: 0.1,
        angularStiffness: 0.95
      } as any
    };
    this.mouseConstraint = Matter.MouseConstraint.create(
      this.engine,
      mouseParams
    );
    this.engine.world.gravity.y = 0;

    this.things.forEach(t => t.Setup());

    this.startMillis = this.p.millis();
    this.mouseConstraint.mouse.pixelRatio = this.p.pixelDensity();
    Matter.World.add(this.engine.world, this.mouseConstraint);
    this.walls = [
      Matter.Bodies.rectangle(
        0,
        this.p.windowHeight / 2 + 50,
        this.p.windowWidth,
        50,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(0, -50, this.p.windowWidth, 50, {
        isStatic: true
      }),
      Matter.Bodies.rectangle(-50, 0, 50, this.p.windowHeight / 2, {
        isStatic: true
      }),
      Matter.Bodies.rectangle(
        this.p.windowWidth - 20,
        0,
        50,
        this.p.windowHeight / 2,
        {
          isStatic: true
        }
      )
    ];
    Matter.World.add(this.engine.world, this.walls);
    Matter.Engine.run(this.engine);
  };
  public draw = () => {
    // Matter.Engine.update(this.engine);
    const colls = this.walls.map((wall: any) =>
      (Matter.Query as any).collides(
        wall,
        Matter.Composite.allBodies(this.engine.world)
      )
    );
    const fl = colls.flat();
    fl.forEach(({ bodyB, bodyA }: any) => {
      if (!bodyB.isStatic) {
        Matter.Body.rotate(bodyB, Math.PI);
      }
      if (!bodyA.isStatic) {
        Matter.Body.rotate(bodyA, Math.PI);
      }
    });
    if (this.rainbowMode) {
      this.p.colorMode(this.p.HSB, 1000);
      this.p.background((this.p.millis() - this.startMillis) % 1000, 500, 400);
    } else {
      this.p.background("#322931");
    }
    if (this.penMode.enable) {
      const interval = 5000;
      this.p.push();
      this.p.colorMode(this.p.HSB, interval);
      this.p.fill("white");
      if (this.penMode.rainbow) {
        this.p.fill(
          (this.p.millis() - this.startMillis) % interval,
          interval / 2,
          interval
        );
      }
      this.p.circle(this.penMode.lastX, this.penMode.lastY, 10);
      this.p.pop();
    }
    this.things.forEach(t => {
      t.draw();
    });
  };
}
