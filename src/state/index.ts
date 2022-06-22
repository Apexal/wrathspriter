import { Dispatch, SetStateAction, createContext } from "react";
import { emptyCharacter } from "@/constants";
import { Character } from "@/interfaces";

export type CharacterStagesContextType = {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
  setCanNavigateNext: (val: boolean) => void;
};
const characterStagesContextDefault: CharacterStagesContextType = {
  character: emptyCharacter,
  setCharacter: (newCharacter) => {},
  setCanNavigateNext: () => {},
};
export const CharacterStagesContext = createContext<CharacterStagesContextType>(
  characterStagesContextDefault
);
CharacterStagesContext.displayName = "CharacterStagesContext";
