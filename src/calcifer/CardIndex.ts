import Turtle from "./cards/Turtle";
import Ball from "./cards/Ball";
import Duck from "./icons/Duck";
import TurtleIcon from "./icons/TurtleIcon";

const CardIndex = {
  turtle: [Turtle, TurtleIcon],
  ball: [Ball, Duck]
} as any;
export default CardIndex;
