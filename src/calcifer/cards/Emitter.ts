import Thing from "../ThingCard";
import p5 from "p5";
import Card from "../CardClass";
import Matter from "matter-js";

export default class Emitter extends Thing {
  public emitInterval: number;
  public radius = 10;
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
    this.drawableChildren.forEach(child => {
      Matter.Composite.remove(child.world, child.composite.bodies[0]);
    });
    if (this.child) {
      this.child.cancel();
    }
    Matter.Composite.remove(this.world, this.composite.bodies[0]);
  };
  public getEffect = (cb: (name: string, payload: any) => void) => {
    const ne = new Emitter(this.p, this.world, this.x, this.y, this.child);
    if (ne.child && ne.child.name === this.name) {
      ne.child.getEffect(cb);
      return;
    }
    Matter.World.add(this.world, ne.composite);
    if (ne.child) {
      ne.child.getEffect((name: string, payload: any) => {
        if (payload instanceof Thing) {
          this.emitInterval = window.setInterval(() => {
            if (ne.drawableChildren.length > 20) {
              ne.drawableChildren[0].cancel();
              Matter.Composite.remove(ne.composite, ne.composite.composites[1]);
              ne.drawableChildren.shift();
            }
            const { x, y } = ne.composite.bodies[0].position;
            payload.getEffect((bname, b) => {
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
          }, this.p.randomGaussian(900, 100));
        }
      });
    }

    cb(this.name, ne);
  };
  public draw = () => {
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
