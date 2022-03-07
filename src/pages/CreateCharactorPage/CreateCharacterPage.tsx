import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { emptyCharacter } from "../../constants";
import { Character } from "../../interfaces";

export type CharacterContextType = {
  character: Character;
};
const CharacterContext = createContext<CharacterContextType>(emptyCharacter);
CharacterContext.displayName = "CharacterContext";

export function CreateCharacterPage() {
  return (
    <CharacterContext.Provider value={emptyCharacter}>
      <Outlet />
    </CharacterContext.Provider>
  );
}
