import AttributeCard from "../AttributeCard";

export default class Pen extends AttributeCard {
  constructor() {
    super("pen");
  }
  public getEffect(cb: (name: string, payload: any) => void) {
    if (this.child) {
      this.child.getEffect((name, payload) => {
        if (name === "rainbow") {
          cb("pen", { rainbow: true });
        } else {
          cb(name, payload);
          cb("pen", null);
        }
      });
    } else {
      cb("pen", null);
    }
  }
  public cancel() {
    if (this.child) {
      this.child.cancel();
    }
  }
}
