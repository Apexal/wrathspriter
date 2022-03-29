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
                          src="https://media0.giphy.com/media/FopJy18z4t5hHlViZn/giphy.gif?cid=ecf05e478diube0770ny2jf9vye3fr4eefefgwvke6vk6ql3&rid=giphy.gif&ct=s"
                          alt="Placeholder"
                        />
                      </figure>
                    </div>
                    <div className="column">
                      <strong>Actions</strong>
                      <br />
                      <div className="select">
                        <select>
                          {program.actionTemplates.map((template, index) => (
                            <option value={index}>
                              {template.name} ({template.type})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <strong>Backstory</strong>
                    <blockquote>
                      <p>{program.backstory}</p>
                    </blockquote>
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
                    Choose Major
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
                    Choose Minor
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
