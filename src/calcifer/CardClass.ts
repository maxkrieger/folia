import uniqid from "uniqid";

export default abstract class Card {
  public name: string;
  public id: string;
  public child?: Card;

  constructor(name: string) {
    this.name = name;
    this.id = uniqid(name);
  }
  public abstract cancel(): void;
  public abstract getEffect(cb: (name: string, payload: any) => void): void;
}
