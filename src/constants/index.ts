import { Character, SchoolProgram } from "../interfaces";

export const emptyCharacter: Character = {
  name: "Character",
  backstory: "",
  moveset: [],
  major: null,
  minor: null,
  hurtSoundEffects: [],
  enterSoundEffects: [],
  blockAnimation: [],
  crouchAnimation: [],
  dashAnimation: [],
  grappledAnimation: [],
  hurtAnimation: [],
  idleAnimation: [],
  loseAnimation: [],
  previewAnimation: [],
  walkAnimation: [],
  winAnimation: [],
};

export const schoolPrograms: SchoolProgram[] = [
  {
    id: "cs",
    backstory: "",
    name: " Computer Science",
    majorMoveTemplates: [],
    minorMoveTemplates: [],
    sampleMoveset: [],
  },
];
