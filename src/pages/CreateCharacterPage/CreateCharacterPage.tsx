import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { emptyCharacter } from "../../constants";
import { Character } from "../../interfaces";
import { CharacterContext, CharacterContextType } from "../../state";
import HelpButton from "../../components/HelpButton";
import { AddCharacterForm, db, UpdateCharacter } from "../../utils/db";
import { downloadCharacter } from "../../utils/download";
import clsx from "clsx";
import { sendCharacterToServer } from "../../services/api";
import { CharacterCodeModal } from "../SavedCharactersPage/components/CharacterPreview/CharacterPreviews";

const stages = ["", "programs", "states", "actions", "review"];

export function CreateCharacterPage() {
  const location = useLocation();

  const routeIndex = stages.indexOf(
    location.pathname.replace("/create", "").replace("/", "")
  );

  const [characterId, setCharacterId] = useState<string | null>(null);
  const [isSendingCharacter, setIsSendingCharacter] = useState<boolean>(false);

  const [isSaving, setIsSaving] = useState<boolean>(false);
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
    if (isSaving) return;

    setIsSaving(true);
    if (dbId) {
      UpdateCharacter(dbId, character)
        .then(() => {
          console.log(`Updated character ${dbId}`);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsSaving(false));
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
        })
        .finally(() => setIsSaving(false));
    }
  };

  /** Attempt to send character to Wrathserver. */
  const handleUseCharacter = async () => {
    setIsSendingCharacter(true);
    try {
      const storedCharacter = await sendCharacterToServer(character);
      if (storedCharacter.id) {
        setCharacterId(storedCharacter.id);
      } else {
        throw Error();
      }
    } catch (err) {
      alert(
        "Something went wrong! Instead, here's a download of the character."
      );
      downloadCharacter(character);
    }
    setIsSendingCharacter(false);
  };

  return (
    <CharacterContext.Provider value={characterContextValue}>
      <progress
        className="progress is-success"
        value={routeIndex + 1}
        max={stages.length}
      />

      {characterId && (
        <CharacterCodeModal
          characterId={characterId}
          character={character}
          close={() => setCharacterId(null)}
        />
      )}

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
              <span className="icon">⬅️</span>
            </Link>
            {routeIndex + 1 < stages.length && (
              <Link
                to={stages[routeIndex + 1]}
                className="button"
                onClick={save}
              >
                <span className="icon">➡️</span>
              </Link>
            )}
            {routeIndex !== stages.length - 1 && (
              <button
                className={clsx("button is-danger", isSaving && "is-loading")}
                onClick={save}
                disabled={isSaving}
              >
                <span className="icon">💾</span>
                <span>Save</span>
              </button>
            )}
            {routeIndex === stages.length - 1 && (
              <>
                <button
                  className={clsx(
                    "button is-warning",
                    isSendingCharacter && "is-loading"
                  )}
                  onClick={handleUseCharacter}
                  disabled={isSaving || isSendingCharacter}
                >
                  <span className="icon">🎮</span>
                  <span>Use</span>
                </button>
                <Link className="button" to="/">
                  Home
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </CharacterContext.Provider>
  );
}
