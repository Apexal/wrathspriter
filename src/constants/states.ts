import { Character } from "../interfaces";

export type CharacterState = {
  id: keyof Character["stateAnimations"] | keyof Character["stateSoundEffects"];
  description: string;
};

const states: CharacterState[] = [
  {
    id: "idle",
    description: "Your character standing still between actions.",
  },
  {
    id: "crouch",
    description: "Your character crouching.",
  },
  {
    id: "enter",
    description: "Your character entering the stage at the start of the round.",
  },
];

export default states;
