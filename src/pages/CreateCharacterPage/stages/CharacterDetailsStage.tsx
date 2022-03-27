import { useContext } from "react";
import { CharacterContext } from "../../../state";

export function CharacterDetailsStage() {
  const { character, setCharacter } = useContext(CharacterContext);

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
              value={character.name}
              onChange={(e) =>
                setCharacter({
                  ...character,
                  name: e.currentTarget.value,
                })
              }
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="character-backstory" className="label">
            Character Backstory
          </label>
          <div className="control">
            <textarea
              id="character-backstory"
              className="textarea"
              value={character.backstory}
              onChange={(e) =>
                setCharacter({
                  ...character,
                  backstory: e.currentTarget.value,
                })
              }
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  );
}
