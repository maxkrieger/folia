import AttributeCard from "../AttributeCard";
import p5 from "p5";
import Card from "../CardClass";
export default class Wavy extends AttributeCard {
  public interval: number;
  public state = 0;
  public p: p5;
  constructor(
    p: p5,
    world: Matter.World,

    x: number = 0,
    y: number = 0,
    child?: Card
  ) {
    super("wavy");
    this.child = child;
    this.p = p;
  }
  public getEffect(cb: (name: string, payload: any) => void) {
    if (this.child) {
      this.child.getEffect(cb);
    }
    const wavelength = 0.5 + this.p.randomGaussian(0, 0.2);
    this.interval = window.setInterval(() => {
      this.state += 0.1;
      cb("wavy", Math.sin(wavelength * this.state));
    }, 50);
  }
  public cancel() {
    window.clearInterval(this.interval);
    if (this.child) {
      this.child.cancel();
    }
  }
}
