import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { emptyCharacter } from "../../constants";
import { Character } from "../../interfaces";

export type CharacterContextType = {
  character: Character;
};
const characterContextDefault = {
  character: emptyCharacter,
};
export const CharacterContext = createContext<CharacterContextType>(
  characterContextDefault
);
CharacterContext.displayName = "CharacterContext";

export function CreateCharacterPage() {
  return (
    <CharacterContext.Provider value={characterContextDefault}>
      <Outlet />
    </CharacterContext.Provider>
  );
}
