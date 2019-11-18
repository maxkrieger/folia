import Card from "./CardClass";
export default abstract class Attribute extends Card {
  constructor(name: string) {
    super(name);
  }
}
