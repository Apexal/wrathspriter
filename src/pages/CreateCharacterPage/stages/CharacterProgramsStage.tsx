import { useContext } from "react";
import { schoolPrograms } from "../../../constants";
import { CharacterContext } from "../../../state";

export function CharacterProgramsStage() {
  const { character, setCharacter } = useContext(CharacterContext);

  return (
    <section id="character-programs-stage" className="section stage">
      <div className="container">
        <h1 className="title">Select {character.name}'s Major and Minor</h1>

        <div className="columns is-multiline">
          {schoolPrograms.map((program) => (
            <div key={program.id} className="column is-half">
              <div id={program.id} className="card">
                <div className="card-header">
                  <p className="card-header-title">{program.name}</p>
                </div>
                <div className="card-content">
                  <div className="columns">
                    <div className="column">
                      <figure className="image is-square">
                        <img
                          src="https://via.placeholder.com/500"
                          alt="Placeholder"
                        />
                      </figure>
                    </div>
                    <div className="column">
                      <div className="content">
                        <strong>Backstory</strong>
                        <blockquote>
                          <p>{program.backstory}</p>
                        </blockquote>

                        <strong>Pros</strong>
                        <p></p>
                        <strong>Cons</strong>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="button card-footer-item"
                    onClick={() =>
                      setCharacter({
                        ...character,
                        major: program,
                      })
                    }
                  >
                    Use as Major
                  </button>
                  <button
                    className="button card-footer-item"
                    onClick={() =>
                      setCharacter({
                        ...character,
                        minor: program,
                      })
                    }
                  >
                    Use as Minor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
