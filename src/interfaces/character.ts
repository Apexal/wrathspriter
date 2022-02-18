import { AnimationFrame, Move, SchoolProgram } from ".";

/**
 * Represents a Wrathskeller character. The properties of the object
 * are set as the user steps through the character creator.
 */
export interface Character {
  /** The character's name as displayed in the game */
  name: string;
  /** Short backstory of the character */
  backstory: string;
  /** The moves this character can make */
  moveset: Move[];
  /** The program selected as the character's major */
  major: SchoolProgram;
  /** The program selected as the character's minor */
  minor: SchoolProgram | null;

  // Self-explanatory animations
  blockAnimation: AnimationFrame[];
  crouchAnimation: AnimationFrame[];
  walkAnimation: AnimationFrame[];
  dashAnimation: AnimationFrame[];
  grappledAnimation: AnimationFrame[];
  // TODO: have multiple hurt animations based on crouching, jumping, etc.?
  hurtAnimation: AnimationFrame[];
  winAnimation: AnimationFrame[];
  loseAnimation: AnimationFrame[];
}
