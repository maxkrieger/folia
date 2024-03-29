import * as p5 from "p5";
import Matter from "matter-js";
import Thing from "../ThingCard";
import Card from "../CardClass";

export default class Particle extends Thing {
  public radius: number;
  public getEffect = (cb: (name: string, payload: any) => void) => {
    const nb = new Particle(this.p, this.world, this.x, this.y, this.child);
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
        if (name === "big") {
          Matter.Body.scale(
            nb.composite.bodies[0],
            payload / nb.radius,
            payload / nb.radius
          );
          nb.radius = payload;
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
    super("particle");
    const radius = 50;
    this.child = child;
    this.x = x;
    this.y = y;
    this.world = world;

    Matter.Composite.add(
      this.composite,
      Matter.Bodies.circle(x, y, radius / 2)
    );
    this.radius = radius;
    this.p = p;
  }
  public setup() {}
  public draw = () => {
    this.p.circle(
      this.composite.bodies[0].position.x,
      this.composite.bodies[0].position.y,
      this.radius
    );
    this.drawableChildren.forEach(child => {
      child.draw();
    });
  };
  public cancel = () => {
    if (this.child) {
      this.child.cancel();
    }
  };
}
