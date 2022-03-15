import { AnimationFrame, Action, SchoolProgram, SoundEffect } from ".";

/**
 * Represents a Wrathskeller character. The properties of the object
 * are set as the user steps through the character creator.
 */
export interface Character {
  /** The character's name as displayed in the game */
  name: string;
  /** Short backstory of the character */
  backstory: string;
  /** The actions this character can perform */
  actions: Action[];
  /** The program selected as the character's major */
  major: SchoolProgram | null;
  /** The program selected as the character's minor */
  minor: SchoolProgram | null;

  /** Sound effects for different possible character states. */
  stateSoundEffects: {
    /** Sound effects to randomly choose from when hurt */
    hurt: SoundEffect[];
    /** Sound effects to randomly choose from on character entry to stage */
    enter: SoundEffect[];
    win: SoundEffect[];
    lose: SoundEffect[];
  };

  /** Animations for different possible character states. */
  stateAnimations: {
    // Self-explanatory animations
    idle: AnimationFrame[];
    walk: AnimationFrame[];
    dash: AnimationFrame[];
    jump: AnimationFrame[];
    crouch: AnimationFrame[];
    block: AnimationFrame[];
    grappled: AnimationFrame[];
    // TODO: have multiple hurt animations based on crouching, jumping, etc.?
    hurt: AnimationFrame[];
    win: AnimationFrame[];
    lose: AnimationFrame[];
  };
}
