import { Character, SchoolProgram } from "../interfaces";

export const emptyCharacter: Character = {
  name: "Character",
  backstory: "",
  actions: [],
  major: null,
  minor: null,
  stateSoundEffects: {
    hurt: [],
    enter: [],
    win: [],
    lose: [],
  },
  stateAnimations: {
    enter: [],
    idle: [],
    walk: [],
    dash: [],
    jump: [],
    crouch: [],
    block: [],
    grappled: [],
    hurt: [],
    win: [],
    lose: [],
  },
};

export const schoolPrograms: SchoolProgram[] = [
  {
    id: "cs",
    backstory:
      "Something something something something something something something something ",
    name: "Computer Science",
    actionTemplates: [],
  },
];
