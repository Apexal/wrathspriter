import { Action } from ".";

/** Represents a school program like CS, EE, Math, etc. that can be chosen as either a major or minor. */
export interface SchoolProgram {
  /** Unique identifier for programs, like 'cs', 'itws', etc. */
  id: string;
  /** Displayed name for the program, like 'Computer Science' */
  name: string;
  /** Backstory for how the program fits into the overall lore */
  backstory: string;
  /** Actions that this program provides */
  actionTemplates: Action[];
}
