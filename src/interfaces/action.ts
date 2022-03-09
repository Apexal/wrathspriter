import { AnimationFrame } from ".";

export interface SoundEffect {
  /** Optional display name for this sound effect */
  name: string | null;
  base64EncodedAudio: string;
}

/** Represents an action the character can perform. */
export interface Action {
  /** The displayed name of the action in the editor and game */
  name: string;
  /**
   * The type of action this is. The game only recognizes these types and assigns controls, damage amounts, logic, etc. to them.
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
  /** Possible sound effects for the action. One is chosen randomly each time the move is performed. */
  soundEffects: SoundEffect[];
}
