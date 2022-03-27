import { Dispatch, SetStateAction, createContext } from "react";
import { emptyCharacter } from "../constants";
import { Character } from "../interfaces";

export type CharacterContextType = {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
};
const characterContextDefault: CharacterContextType = {
  character: emptyCharacter,
  setCharacter: (newCharacter) => {},
};
export const CharacterContext = createContext<CharacterContextType>(
  characterContextDefault
);
CharacterContext.displayName = "CharacterContext";
