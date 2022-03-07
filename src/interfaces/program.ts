import { Move } from ".";

/** Represents a school program like CS, EE, Math, etc. that can be chosen as either a major or minor. */
export interface SchoolProgram {
  /** Unique identifier for programs, like 'cs', 'itws', etc. */
  id: string;
  /** Displayed name for the program, like 'Computer Science' */
  name: string;
  /** Backstory for how the program fits into the overall lore */
  backstory: string;
  /** Example set of specific moves to previews to users when they are choosing a major and minor */
  sampleMoveset: Move[];
  /** Moves that are used when the program is chosen as a character's major */
  majorMoveTemplates: Move[];
  /** Moves that are used when the program is chosen as a character's minor */
  minorMoveTemplates: Move[];
}
