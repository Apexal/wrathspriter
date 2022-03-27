import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import { emptyCharacter } from "../../constants";
import { Character } from "../../interfaces";
import { CharacterContext, CharacterContextType } from "../../state";

export function CreateCharacterPage() {
  const [character, setCharacter] = useState<Character>(emptyCharacter);
  const characterContextValue = useMemo<CharacterContextType>(
    () => ({
      character,
      setCharacter,
    }),
    [character, setCharacter]
  );

  return (
    <CharacterContext.Provider value={characterContextValue}>
      <Outlet />
    </CharacterContext.Provider>
  );
}
