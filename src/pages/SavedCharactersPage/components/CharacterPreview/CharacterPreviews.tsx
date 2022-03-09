import { AnimatedSprite } from "../../../../components/AnimatedSprite/AnimatedSprite";
import { Character } from "../../../../interfaces";

type CharacterPreviewPropTypes = {
  character: Character;
  animationName?: keyof Character["stateAnimations"];
};

/**
 * Small box that displays character name and a random animation on hover.
 * Should be used to give a quick preview of a character.
 **/
export function CharacterPreview({
  character,
  animationName = "walk",
}: CharacterPreviewPropTypes) {
  return (
    <div className="character-preview has-text-centered box">
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
            disabled
          >
            Use
          </button>
          <button className="button is-small is-warning is-outlined" disabled>
            Edit
          </button>
          <button className="button is-small is-danger is-outlined" disabled>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
