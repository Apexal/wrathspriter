import { useEffect, useMemo, useState } from "react";

import { emptyCharacter } from "@/constants";
import { Character } from "@/interfaces";
import { CharacterStagesContext, CharacterStagesContextType } from "@/state";
import HelpButton from "@/components/HelpButton";
import { AddCharacterForm, db, UpdateCharacter } from "@/utils/db";
import { downloadCharacter } from "@/utils/download";
import clsx from "clsx";
import { sendCharacterToServer } from "@/services/api";
import { CharacterCodeModal } from "@/components/CharacterPreviews";
import Link from "next/link";
import { useRouter } from "next/router";

const stages = ["details", "programs", "states", "actions", "review"];

export default function CreateCharacterPage() {
  const router = useRouter();

  console.log(router.query);

  const routeIndex = stages.indexOf(router.query.stage as string);

  const [characterId, setCharacterId] = useState<string | null>(null);
  const [isSendingCharacter, setIsSendingCharacter] = useState<boolean>(false);

  const [canNavigateNext, setCanNavigateNext] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [dbId, setDbId] = useState<number | null>(null);
  const [character, setCharacter] = useState<Character>(emptyCharacter);
  const characterStagesContextValue = useMemo<CharacterStagesContextType>(
    () => ({
      character,
      setCharacter,
      setCanNavigateNext,
    }),
    [character, setCharacter]
  );

  useEffect(() => {
    const dbId = router.query.dbId as string | undefined;

    if (dbId) {
      console.log("here");

      db.characters.get(dbId).then((characterWrapper) => {
        console.log(characterWrapper);

        if (characterWrapper?.character) {
          setDbId(+dbId);
          setCharacter(characterWrapper.character);
        }
      });
    }
  }, [router]);

  const stageComponent = null;

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
    <CharacterStagesContext.Provider value={characterStagesContextValue}>
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

      {stageComponent}

      <section className="section">
        <div className="container">
          <div className="buttons">
            <Link
              href={routeIndex - 1 >= 0 ? stages[routeIndex - 1] : "/"}
              className="button"
              onClick={routeIndex - 1 > 0 ? save : undefined}
            >
              <span className="icon">⬅️</span>
            </Link>
            {routeIndex + 1 < stages.length &&
              (canNavigateNext ? (
                <Link
                  href={stages[routeIndex + 1]}
                  className="button"
                  onClick={save}
                >
                  <span className="icon">➡️</span>
                </Link>
              ) : (
                <button className="button" disabled>
                  <span className="icon">➡️</span>
                </button>
              ))}
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
                <Link className="button" href="/">
                  Home
                </Link>
              </>
            )}
          </div>
          <hr />
          <progress
            className="progress is-success"
            value={routeIndex + 1}
            max={stages.length}
          />
        </div>
      </section>
    </CharacterStagesContext.Provider>
  );
}
