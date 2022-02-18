import { AnimationFrame, Move, SchoolProgram, SoundEffect } from ".";

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

  /** Sound effects to randomly choose from when hurt */
  hurtSoundEffects: SoundEffect[];
  /** Sound effects to randomly choose from on character entry */
  enterSoundEffects: SoundEffect[];

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
