import AttributeCard from "../AttributeCard";
import Card from "../CardClass";
import p5 from "p5";

export default class Pen extends AttributeCard {
  public enableRainbow = false;
  constructor(
    p: p5,
    world: Matter.World,

    x: number = 0,
    y: number = 0,
    child?: Card
  ) {
    super("pen");
    this.child = child;
  }
  public getEffect(cb: (name: string, payload: any) => void) {
    if (this.child) {
      this.child.getEffect((name, payload) => {
        if (name === "rainbow") {
          this.enableRainbow = true;
          cb("pen", { rainbow: true });
        } else {
          cb(name, payload);
          cb("pen", { rainbow: this.enableRainbow });
        }
      });
    } else {
      cb("pen", { rainbow: false });
    }
  }
  public cancel() {
    if (this.child) {
      this.child.cancel();
    }
  }
}
