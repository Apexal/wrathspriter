import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSprite } from "../../../../components/AnimatedSprite/AnimatedSprite";
import { Character } from "../../../../interfaces";
import { sendCharacterToServer } from "../../../../services/api";

type CharacterPreviewPropTypes = {
  dbId?: number;
  character: Character;
  animationName?: keyof Character["stateAnimations"];
};

/**
 * Small box that displays character name and a random animation on hover.
 * Should be used to give a quick preview of a character.
 **/
export function CharacterPreview({
  dbId,
  character,
  animationName = "walk",
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
      alert("Something went wrong! Please try again later...");
    }
  };

  return (
    <div className="character-preview has-text-centered box">
      {characterId && (
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
            onClick={() => setCharacterId(null)}
            className="modal-close is-large"
            aria-label="close"
          ></button>
        </div>
      )}

      <h6 className="title is-size-4 mb-2 character-name">{character.name}</h6>
      <figure className="image is-square m-auto my-2 character-animations">
        <AnimatedSprite
          width={100}
          height={100}
          isPlaying={true}
          animation={character.stateAnimations[animationName]}
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
            to="/create"
            state={{ dbId }}
            className="button is-small is-warning is-outlined"
          >
            Edit
          </Link>
          <button className="button is-small is-danger is-outlined" disabled>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
