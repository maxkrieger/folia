import Turtle from "./cards/Turtle";
// import Ball from "./cards/Particle";
// import Duck from "./icons/Duck";
import TurtleIcon from "./icons/TurtleIcon";
import Rainbow from "./cards/Rainbow";
import RainbowIcon from "./icons/RainbowIcon";
import Pen from "./cards/PenFollow";
import BrushIcon from "./icons/BrushIcon";
import Emitter from "./cards/Emitter";
import EmitterIcon from "./icons/EmitterIcon";
import Wavy from "./cards/Wavy";
import SineIcon from "./icons/SineIcon";
import { CardType } from "../Data";

const CardIndex = {
  turtle: [Turtle, TurtleIcon, CardType.THING],
  // ball: [Ball, Duck],
  emitter: [Emitter, EmitterIcon, CardType.THING],
  rainbow: [Rainbow, RainbowIcon, CardType.ATTRIBUTE],
  pen: [Pen, BrushIcon, CardType.ATTRIBUTE],
  wavy: [Wavy, SineIcon, CardType.ATTRIBUTE]
} as any;
export default CardIndex;
