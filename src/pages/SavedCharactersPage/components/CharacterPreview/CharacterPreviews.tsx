import { Character } from "../../../../interfaces";

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
    <div className="character-preview">
      <h6 className="character-name">{character.name}</h6>
      <div className="box character-animation">
        {/* Preview animations here on hover */}
      </div>
    </div>
  );
}
