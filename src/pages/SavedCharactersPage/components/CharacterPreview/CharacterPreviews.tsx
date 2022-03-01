import { Character } from "../../../../interfaces";

import "./CharacterPreviews.scss";

type CharacterPreviewPropTypes = {
  character: Character;
  // TODO: allow props to specify animation to show on hover
};

/**
 * Small box that displays character name and a random animation on hover.
 * Should be used to give a quick preview of a character.
 **/
export function CharacterPreview({ character }: CharacterPreviewPropTypes) {
  return (
    <div className="character-preview has-text-centered box">
      <h6 className="title is-size-4 m-0 character-name">{character.name}</h6>
      {/* Preview animations here on hover */}
      <figure className="image is-square my-2 character-animations">
        <img
          src="https://bulma.io/images/placeholders/128x128.png"
          alt="A randomly selected sample animation of the character"
        />
      </figure>
      <div className="character-details">
        <ul>
          <li>
            <em>{character.major.name}</em> Major
          </li>
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
