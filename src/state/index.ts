import { Dispatch, SetStateAction, createContext } from "react";
import { emptyCharacter } from "../constants";
import { Character } from "../interfaces";

export type CharacterStagesContextType = {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
};
const characterStagesContextDefault: CharacterStagesContextType = {
  character: emptyCharacter,
  setCharacter: (newCharacter) => {},
};
export const CharacterStagesContext = createContext<CharacterStagesContextType>(
  characterStagesContextDefault
);
CharacterStagesContext.displayName = "CharacterStagesContext";
