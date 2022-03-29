import { Character } from "../interfaces";

export type CharacterState = {
  id: keyof Character["stateAnimations"] | keyof Character["stateSoundEffects"];
  description: string;
};

const states: CharacterState[] = [
  {
    id: "enter",
    description: "Your character entering the stage at the start of the round.",
  },
  {
    id: "win",
    description: "",
  },
  {
    id: "lose",
    description: "",
  },
  {
    id: "idle",
    description: "Your character standing still between actions.",
  },
  {
    id: "walk",
    description: "Your character crouching.",
  },
  {
    id: "jump",
    description: "Your character crouching.",
  },
  {
    id: "crouch",
    description: "Your character crouching.",
  },
  {
    id: "block",
    description: "Your character crouching.",
  },
  {
    id: "hurt",
    description: "Your character reacting to getting hit.",
  },
];

export default states;
