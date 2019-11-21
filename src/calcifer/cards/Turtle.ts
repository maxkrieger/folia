import * as p5 from "p5";
import Matter from "matter-js";
import Thing from "../ThingCard";
import Card from "../CardClass";
import turtle from "./turtle.svg";

export default class Turtle extends Thing {
  public p: p5;
  public world: Matter.World;
  public x: number;
  public y: number;
  public img: p5.Image;
  public rotationInterval: number;
  public rainbowMode = false;
  public penMode: { enable: boolean; rainbow: boolean; penHistory: any[] } = {
    enable: false,
    rainbow: false,
    penHistory: []
  };

  public getEffect = (cb: (name: string, payload: any) => void) => {
    const nb = new Turtle(this.p, this.world, this.x, this.y, this.child);
    nb.Setup();
    Matter.World.add(this.world, nb.composite);
    if (nb.child) {
      nb.child.getEffect((name: string, payload: any) => {
        if (name === "oscillate") {
          Matter.Body.applyForce(
            nb.composite.bodies[0],
            { x: 0, y: 0 },
            {
              x: 0,
              y: 0.01 * payload
            }
          );
        }
        if (name === "rainbow") {
          nb.rainbowMode = true;
        }
        if (name === "pen") {
          nb.penMode = {
            ...nb.penMode,
            enable: true,
            rainbow: payload.rainbow
          };
        }
        if (name === "big") {
          //   Matter.Body.scale(
          //     nb.composite.bodies[0],
          //     payload / nb.radius,
          //     payload / nb.radius
          //   );
          //   nb.radius = payload;
        }
        if (payload instanceof Thing) {
          const bodyA = Matter.Composite.allBodies(nb.composite)[0];
          const bodyB = Matter.Composite.allBodies(payload.composite)[0];
          Matter.Composite.add(nb.composite, payload.composite);
          const bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y,
            bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x,
            bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y,
            bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;
          Matter.Composite.add(
            nb.composite,
            Matter.Constraint.create({
              bodyA,
              bodyB,
              pointA: { x: bodyAWidth * 1, y: bodyAHeight * 0 },
              pointB: {
                x: bodyBWidth * -0.8,
                y: bodyBHeight * 0
              },
              length: 8,
              damping: 0.1,
              stiffness: 0.1
            })
          );
          nb.drawableChildren.push(payload);
        }
      });
    }
    cb(this.name, nb);
  };

  constructor(
    p: p5,
    world: Matter.World,

    x: number = 0,
    y: number = 0,
    child?: Card
  ) {
    super("turtle");
    this.child = child;
    this.x = x;
    this.y = y;
    this.world = world;
    this.p = p;
    this.img = this.p.loadImage(turtle);

    Matter.Composite.add(this.composite, Matter.Bodies.rectangle(x, y, 48, 50));
    this.setRotationInterval();
  }

  public setRotationInterval = () => {
    this.rotationInterval = window.setInterval(() => {
      Matter.Body.setAngularVelocity(
        this.composite.bodies[0],
        this.p.randomGaussian(0, 0.1)
      );
    }, this.p.randomGaussian(5000, 1000));
  };

  public setup = () => {};
  public debugBounds = () => {
    this.p.push();
    const { vertices } = this.composite.bodies[0];
    this.p.fill(255, 255, 255, 0.5);
    this.p.beginShape();
    vertices.forEach(vert => {
      this.p.vertex(vert.x, vert.y);
    });
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  };
  public handlePen = () => {
    if (this.penMode.enable && this.p.frameCount % 20 === 0) {
      const { x, y } = this.composite.bodies[0].position;
      this.penMode.penHistory.push({
        x,
        y: y + 25
      });
    }
    if (this.penMode.enable && this.penMode.penHistory.length > 0) {
      this.penMode.penHistory.reduce((acc, cur, ind) => {
        this.p.push();
        this.p.colorMode(this.p.HSB, 1000);
        this.p.stroke("white");
        if (this.penMode.rainbow) {
          this.p.stroke(
            (this.p.millis() - this.startMillis + ind * 200) % 1000,
            500,
            1000
          );
        }
        this.p.strokeWeight(5);
        this.p.line(acc.x, acc.y, cur.x, cur.y);
        this.p.pop();
        return cur;
      });
    }
  };
  public draw = () => {
    // this.debugBounds();
    const F = Matter.Vector.rotate(
      Matter.Vector.create(0, -0.5),
      this.composite.bodies[0].angle
    );
    Matter.Body.setVelocity(this.composite.bodies[0], F);

    this.handlePen();
    this.p.push();
    this.p.angleMode(this.p.RADIANS);
    this.p.translate(
      this.composite.bodies[0].vertices[0].x,
      this.composite.bodies[0].vertices[0].y
    );
    this.p.rotate(this.composite.bodies[0].angle);
    if (this.rainbowMode) {
      this.p.colorMode(this.p.HSB, 1000);
      this.p.tint((this.p.millis() - this.startMillis) % 1000, 500, 1000);
    }
    this.p.image(this.img, 0, 0);
    this.p.pop();
    this.drawableChildren.forEach(child => {
      child.draw();
    });
  };
  public cancel = () => {
    window.clearInterval(this.rotationInterval);
    Matter.World.remove(this.world, this.composite.bodies[0]);
    if (this.child) {
      this.child.cancel();
    }
  };
}
