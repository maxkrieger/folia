import Thing from "../ThingCard";
import p5 from "p5";
import Card from "../CardClass";
import Matter from "matter-js";

export default class Emitter extends Thing {
  public emitInterval: number;
  public radius = 10;
  public count = 20;
  public maxage = 50000;
  constructor(
    p: p5,
    world: Matter.World,

    x: number = 0,
    y: number = 0,
    child?: Card
  ) {
    super("emitter");
    this.x = x;
    this.y = y;
    this.p = p;
    this.world = world;
    this.child = child;
    Matter.Composite.add(
      this.composite,
      Matter.Bodies.circle(x, y, this.radius / 2, {
        isSensor: true
      })
    );
  }
  public cancel = () => {
    this.cancelled = true;
    window.clearInterval(this.emitInterval);
    this.drawableChildren.forEach(child => {
      Matter.Composite.remove(child.world, child.composite.bodies[0]);
    });
    if (this.child) {
      this.child.cancel();
    }
    this.drawableChildren = [];
    Matter.Composite.remove(this.world, this.composite.bodies[0]);
  };
  public getEffect = (cb: (name: string, payload: any) => void) => {
    const ne = new Emitter(this.p, this.world, this.x, this.y, this.child);
    ne.Setup();
    Matter.World.add(this.world, ne.composite);
    if (ne.child) {
      ne.child.getEffect((name: string, payload: any) => {
        if (name === "wavy") {
          Matter.Body.rotate(ne.composite.bodies[0], 0.05 * payload);
          const F = Matter.Vector.rotate(
            Matter.Vector.create(0, -0.5),
            ne.composite.bodies[0].angle
          );
          Matter.Body.setVelocity(ne.composite.bodies[0], F);
        }
        if (payload instanceof Thing) {
          ne.emitInterval = window.setInterval(() => {
            // if (ne.drawableChildren.length > 20) {
            //   ne.drawableChildren[0].cancel();
            //   Matter.Composite.remove(ne.composite, ne.composite.composites[1]);
            //   ne.drawableChildren.shift();
            // }
            if (ne.count > 0) {
              ne.count--;
              const { x, y } = ne.composite.bodies[0].position;
              payload.getEffect((bname, b) => {
                if (b.name === ne.name) {
                  // prevent emitters-of-emitters
                  return;
                }
                Matter.Body.setPosition(b.composite.bodies[0], { x, y });
                const rot = this.p.randomGaussian(0, 1);

                Matter.Body.applyForce(
                  b.composite.bodies[0],
                  {
                    x: b.composite.bodies[0].position.x,
                    y: b.composite.bodies[0].position.y
                  },
                  Matter.Vector.rotate({ x: 0, y: -0.1 }, rot)
                );
                Matter.Body.rotate(b.composite.bodies[0], rot);
                Matter.Composite.add(ne.composite, b.composite);
                ne.drawableChildren.push(b);
              });
            }
          }, this.p.randomGaussian(900, 100));
        }
      });
    }

    cb(this.name, ne);
  };
  public draw = () => {
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
    if (this.p.millis() - this.startMillis >= this.maxage) {
      this.cancel();
      return;
    }
    this.p.push();
    this.p.fill("white");
    this.p.circle(
      this.composite.bodies[0].position.x,
      this.composite.bodies[0].position.y,
      this.radius
    );
    this.p.pop();
    this.drawableChildren.forEach(child => {
      child.draw();
    });
  };
  public setup = () => {};
}
