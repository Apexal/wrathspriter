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
    description: "Your character winning a round and celebrating.",
  },
  {
    id: "lose",
    description: "Your character losing a round and getting knocked out.",
  },
  {
    id: "idle",
    description: "Your character standing still between actions.",
  },
  {
    id: "walk",
    description: "Your character walking.",
  },
  {
    id: "jump",
    description: "Your character jumping.",
  },
  {
    id: "crouch",
    description: "Your character crouching.",
  },
  {
    id: "block",
    description: "Your character blocking attacks.",
  },
  {
    id: "hurt",
    description: "Your character reacting to getting hit.",
  },
];

export default states;
