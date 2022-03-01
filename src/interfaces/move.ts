import { AnimationFrame } from ".";

export interface SoundEffect {
  /** Optional display name for this sound effect */
  name: string | null;
  base64EncodedAudio: string;
}

/** Represents a move the character can perform. */
export interface Move {
  /** The displayed name of the move */
  name: string;
  /**
   * The type of move this is. The game only recognizes these types and assigns controls, damage amounts, logic, etc. to them.
   * See https://github.com/Apexal/wrathskeller/blob/master/documentation/controls_mechanics.md
   **/
  type:
    | "light_punch"
    | "light_kick"
    | "special"
    | "heavy_special"
    | "super"
    | "grab"
    | "launch"
    | "trip"
    | "taunt"
    | "burst";
  /** The ordered frames of the animation */
  animation: AnimationFrame[];
  /** Possible sound effects for the move. One is chosen randomly each time the move is performed. */
  soundEffects: SoundEffect[];
}
