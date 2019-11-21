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
  public interval: number;
  public moving = false;

  public getEffect = (cb: (name: string, payload: any) => void) => {
    const nb = new Turtle(this.p, this.world, this.x, this.y, this.child);
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

    Matter.Composite.add(
      this.composite,
      Matter.Bodies.rectangle(x, y, 48 / 2, 60 / 2)
    );
    this.interval = window.setInterval(() => {
      if (this.moving) {
        Matter.Body.setVelocity(this.composite.bodies[0], { x: 0, y: 0 });
      } else {
        const F = Matter.Vector.rotate(
          Matter.Vector.create(0, -1),
          this.composite.bodies[0].angle
        );
        Matter.Body.setVelocity(this.composite.bodies[0], F);
      }
      this.moving = !this.moving;
    }, this.p.randomGaussian(750, 100));
  }
  public setup() {}
  public draw = () => {
    this.p.push();
    this.p.angleMode(this.p.RADIANS);
    this.p.translate(
      this.composite.bodies[0].vertices[0].x,
      this.composite.bodies[0].vertices[0].y
    );
    this.p.rotate(this.composite.bodies[0].angle);
    this.p.image(this.img, 0, 0);
    this.p.pop();
    this.drawableChildren.forEach(child => {
      child.draw();
    });
  };
  public cancel = () => {
    window.clearInterval(this.interval);
    Matter.World.remove(this.world, this.composite.bodies[0]);
    if (this.child) {
      this.child.cancel();
    }
  };
}
