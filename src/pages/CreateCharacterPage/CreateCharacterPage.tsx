import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { emptyCharacter } from "../../constants";
import { Character } from "../../interfaces";
import { CharacterContext, CharacterContextType } from "../../state";
import HelpButton from "../../components/HelpButton";
import { AddCharacterForm, db, UpdateCharacter } from "../../utils/db";

const stages = ["", "programs", "states", "actions", "review"];

export function CreateCharacterPage() {
  const location = useLocation();

  const routeIndex = stages.indexOf(
    location.pathname.replace("/create", "").replace("/", "")
  );

  const [dbId, setDbId] = useState<number | null>(null);
  const [character, setCharacter] = useState<Character>(emptyCharacter);
  const characterContextValue = useMemo<CharacterContextType>(
    () => ({
      character,
      setCharacter,
    }),
    [character, setCharacter]
  );

  useEffect(() => {
    if (!location.state) return;
    const dbId = (location.state as { dbId?: number }).dbId;

    if (location.state && dbId) {
      db.characters.get(dbId).then((characterWrapper) => {
        if (characterWrapper?.character) {
          setDbId(dbId);
          setCharacter(characterWrapper.character);
        }
      });
    }
  }, [location.state]);

  const save = () => {
    if (dbId) {
      UpdateCharacter(dbId, character)
        .then(() => {
          console.log(`Updated character ${dbId}`);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      AddCharacterForm({
        character,
      })
        .then((dbId) => {
          setDbId(+dbId);
          console.log("Saved new character");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <CharacterContext.Provider value={characterContextValue}>
      <progress
        className="progress is-success"
        value={routeIndex + 1}
        max={stages.length}
      />

      <HelpButton
        heading="Create a Character"
        className="is-pulled-right content"
      >
        <p>
          Here's where the fun starts! Use this process to create a character of
          your own, complete with animations and sound effects.
        </p>
        <br />
        <p>Here's the breakdown:</p>
        <br />
        <ul>
          <li>Choose your character's name and write their backstory</li>
          <li>Select your character's major and minor</li>
          <li>Provide animations and sound effects for the basic poses</li>
          <li>Provide animations and sound effects for the action poses</li>
          <li>Review your character</li>
          <li>Send your character to the game!</li>
        </ul>
      </HelpButton>

      <Outlet />

      <section className="section">
        <div className="container">
          <div className="buttons">
            <Link
              to={routeIndex - 1 > 0 ? stages[routeIndex - 1] : "/"}
              className="button"
              onClick={routeIndex - 1 > 0 ? save : undefined}
            >
              Back
            </Link>
            {routeIndex + 1 < stages.length && (
              <Link
                to={stages[routeIndex + 1]}
                className="button is-primary"
                onClick={save}
              >
                Next
              </Link>
            )}
            {/* <button
              className="button is-info"
              onClick={() => downloadCharacter(character)}
            >
              Download
            </button> */}
            <button className="button is-danger" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </section>
    </CharacterContext.Provider>
  );
}
