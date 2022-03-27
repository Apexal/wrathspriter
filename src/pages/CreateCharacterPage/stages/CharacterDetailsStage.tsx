import { useContext } from "react";
import { CharacterContext } from "../../../state";
import { downloadCharacter } from "../../../utils/download";

export function CharacterDetailsStage() {
  const characterCtx = useContext(CharacterContext);

  return (
    <section id="character-details-stage" className="section stage">
      <div className="container">
        <h1 className="title">Character Details</h1>

        <div className="field">
          <label htmlFor="character-name" className="label">
            Character Name
          </label>
          <div className="control">
            <input
              id="character-name"
              type="text"
              className="input"
              placeholder=""
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="character-backstory" className="label">
            Character Backstory
          </label>
          <div className="control">
            <textarea id="character-backstory" className="textarea"></textarea>
          </div>
        </div>

        <div className="buttons">
          <button className="button is-warning">Back</button>
          <button className="button is-primary">Next</button>
          <button
            className="button is-danger"
            onClick={() => downloadCharacter(characterCtx.character)}
          >
            Download
          </button>
        </div>
      </div>
    </section>
  );
}
