import { useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { emptyCharacter } from "../../constants";
import { Character } from "../../interfaces";
import { CharacterContext, CharacterContextType } from "../../state";
import { downloadCharacter } from "../../utils/download";

const stages = ["", "programs", "states", "actions", "review"];

export function CreateCharacterPage() {
  const location = useLocation();

  const routeIndex = stages.indexOf(
    location.pathname.replace("/create", "").replace("/", "")
  );

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
      <progress
        className="progress is-success"
        value={routeIndex + 1}
        max={stages.length}
      />

      <Outlet />

      <section className="section">
        <div className="container">
          {/* <pre>
            <code>
              {routeIndex} | {JSON.stringify(location)}
            </code>
          </pre> */}
          <div className="buttons">
            {routeIndex - 1 >= 0 && (
              <Link to={stages[routeIndex - 1]} className="button is-warning">
                Back
              </Link>
            )}
            {routeIndex + 1 < stages.length && (
              <Link to={stages[routeIndex + 1]} className="button is-primary">
                Next
              </Link>
            )}
            <button
              className="button is-info"
              onClick={() => downloadCharacter(character)}
            >
              Download
            </button>
          </div>
        </div>
      </section>
    </CharacterContext.Provider>
  );
}
