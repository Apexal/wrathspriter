import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import { emptyCharacter } from "../../constants";
import { Character } from "../../interfaces";
import { CharacterContext, CharacterContextType } from "../../state";
import { downloadCharacter } from "../../utils/download";

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
      <section className="section">
        <div className="container">
          <div className="buttons">
            <button
              className="button is-info"
              onClick={() => downloadCharacter(character)}
            >
              Download
            </button>
          </div>
        </div>
      </section>
      <hr />
    </CharacterContext.Provider>
  );
}
