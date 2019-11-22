import Turtle from "./cards/Turtle";
import Ball from "./cards/Particle";
import Duck from "./icons/Duck";
import TurtleIcon from "./icons/TurtleIcon";
import Rainbow from "./cards/Rainbow";
import RainbowIcon from "./icons/RainbowIcon";
import Pen from "./cards/PenFollow";
import BrushIcon from "./icons/BrushIcon";
import Emitter from "./cards/Emitter";
import EmitterIcon from "./icons/EmitterIcon";

const CardIndex = {
  turtle: [Turtle, TurtleIcon],
  ball: [Ball, Duck],
  emitter: [Emitter, EmitterIcon],
  rainbow: [Rainbow, RainbowIcon],
  pen: [Pen, BrushIcon]
} as any;
export default CardIndex;
