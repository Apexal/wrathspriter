import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSprite } from "../../../../../components/AnimatedSprite/AnimatedSprite";
import { Character } from "../../../../../interfaces";
import { sendCharacterToServer } from "../../../../services/api";
import { DeleteCharacter } from "../../../../utils/db";
import { downloadCharacter } from "../../../../utils/download";

type CharacterPreviewPropTypes = {
  dbId: number;
  character: Character;
  animationName?: keyof Character["stateAnimations"];
};

type CharacterCodeModalPropTypes = {
  characterId: string;
  character: Character;
  close: () => void;
};
export function CharacterCodeModal({
  characterId,
  character,
  close,
}: CharacterCodeModalPropTypes) {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          {character.name} is ready to fight! Simply enter in code{" "}
          <code>{characterId}</code> into Wrathskeller within the next 5
          minutes!
        </div>
      </div>
      <button
        onClick={close}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
}

/**
 * Small box that displays character name and a random animation on hover.
 * Should be used to give a quick preview of a character.
 **/
export function CharacterPreview({
  dbId,
  character,
  animationName,
}: CharacterPreviewPropTypes) {
  const [characterId, setCharacterId] = useState<string | null>(null);

  /** Attempt to send character to Wrathserver. */
  const handleUseCharacter = async () => {
    try {
      const storedCharacter = await sendCharacterToServer(character);
      if (storedCharacter.id) {
        setCharacterId(storedCharacter.id);
      } else {
        throw Error();
      }
    } catch (err) {
      alert("Something went wrong! Here's the character download instead.");
      downloadCharacter(character);
    }
  };

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${character.name}?`)) {
      DeleteCharacter(dbId)
        .then(() => {
          console.log("Deleted character");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  if (!animationName) {
    for (const state in character.stateAnimations) {
      // @ts-ignore
      if (character.stateAnimations[state].length) {
        // @ts-ignore
        animationName = state;
        break;
      }
    }
  }

  return (
    <div className="character-preview has-text-centered box">
      {characterId && (
        <CharacterCodeModal
          character={character}
          characterId={characterId}
          close={() => setCharacterId(null)}
        />
      )}

      <h6 className="title is-size-4 mb-2 character-name">{character.name}</h6>
      <figure className="image is-square m-auto my-2 character-animations">
        <AnimatedSprite
          width={100}
          height={100}
          isPlaying={true}
          animation={character.stateAnimations[animationName ?? "walk"]}
        />
      </figure>
      <div className="character-details">
        <ul>
          {character.major && (
            <li>
              <em>{character.major.name}</em> Major
            </li>
          )}
          {character.minor && (
            <li>
              <em>{character.minor.name}</em> Minor
            </li>
          )}
        </ul>
      </div>
      <div className="character-actions mt-3">
        <div className="buttons">
          <button
            className="button is-flex-grow-1 is-small is-primary is-outlined"
            onClick={handleUseCharacter}
          >
            Use
          </button>
          <Link
            to="/create/review"
            state={{ dbId }}
            className="button is-small is-warning is-outlined"
          >
            Edit
          </Link>
          <button
            className="button is-small is-danger is-outlined"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
