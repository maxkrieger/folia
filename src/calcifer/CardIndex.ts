import Turtle from "./cards/Turtle";
import Ball from "./cards/Ball";
import Duck from "./icons/Duck";
import TurtleIcon from "./icons/TurtleIcon";
import Rainbow from "./cards/Rainbow";
import RainbowIcon from "./icons/RainbowIcon";

const CardIndex = {
  turtle: [Turtle, TurtleIcon],
  ball: [Ball, Duck],
  rainbow: [Rainbow, RainbowIcon]
} as any;
export default CardIndex;
