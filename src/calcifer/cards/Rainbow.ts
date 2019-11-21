import AttributeCard from "../AttributeCard";
import p5 from "p5";
import Card from "../CardClass";

export default class Rainbow extends AttributeCard {
  constructor(
    p: p5,
    world: Matter.World,

    x: number = 0,
    y: number = 0,
    child?: Card
  ) {
    super("rainbow");
    this.child = child;
  }
  public getEffect(cb: (name: string, payload: any) => void) {
    if (this.child) {
      this.child.getEffect(cb);
    }
    cb("rainbow", null);
  }
  public cancel() {
    if (this.child) {
      this.child.cancel();
    }
  }
}
