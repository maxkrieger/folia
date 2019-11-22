import * as p5 from "p5";
import Matter from "matter-js";
import Thing from "../ThingCard";
import Card from "../CardClass";
import turtle from "./turtle.svg";

export default class Turtle extends Thing {
  public img: p5.Image;
  public rotationInterval: number;
  public rainbowMode = false;
  public virtualCanvas: p5.Graphics;
  public maxage = 180000;
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
    this.virtualCanvas = this.p.createGraphics(
      this.p.windowWidth,
      this.getHeight()
    );

    Matter.Composite.add(
      this.composite,
      Matter.Bodies.circle(x, y, 25, {
        angle: this.p.randomGaussian(0, 1)
      })
    );
    this.setRotationInterval();
  }

  public setRotationInterval = () => {
    this.rotationInterval = window.setInterval(() => {
      Matter.Body.setAngularVelocity(
        this.composite.bodies[0],
        this.p.randomGaussian(0, 0.01)
      );
    }, this.p.randomGaussian(500, 100));
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
    const { x, y } = this.composite.bodies[0].position;
    if (this.penMode.lastX === -1) {
      this.penMode.lastX = x;
      this.penMode.lastY = y;
    }
    if (this.penMode.enable) {
      const p = this.virtualCanvas;
      p.push();
      const interval = 5000;
      p.colorMode(this.p.HSB, interval);
      p.stroke("white");
      if (this.penMode.rainbow) {
        p.stroke(
          (this.p.millis() - this.startMillis) % interval,
          interval / 2,
          interval
        );
      }
      p.strokeWeight(5);
      p.line(this.penMode.lastX, this.penMode.lastY, x, y);
      this.penMode.lastX = x;
      this.penMode.lastY = y;
      p.pop();
      this.p.image(p, 0, 0);
    }
  };
  public draw = () => {
    if (this.p.millis() - this.startMillis >= this.maxage) {
      this.cancel();
    }
    const mouseover = Matter.Query.point([this.composite.bodies[0]], {
      x: this.p.mouseX,
      y: this.p.mouseY
    });
    if (
      mouseover.length > 0 &&
      this.p.mouseIsPressed &&
      this.composite.bodies[0].position.y >= this.getHeight() - 50
    ) {
      this.onDragOut(this);
    }
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
      this.composite.bodies[0].position.x,
      this.composite.bodies[0].position.y
    );
    this.p.rotate(this.composite.bodies[0].angle);
    if (this.rainbowMode) {
      this.p.colorMode(this.p.HSB, 1000);
      this.p.tint((this.p.millis() - this.startMillis) % 1000, 500, 1000);
    }
    this.p.image(this.img, -24, -20);
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
