import clsx from "clsx";
import { useContext } from "react";
import { schoolPrograms } from "../../../constants";
import { Character, SchoolProgram } from "../../../interfaces";
import { CharacterContext } from "../../../state";

type ProgramCardPropTypes = {
  program: SchoolProgram;
  character?: Character;
  setCharacter?: React.Dispatch<React.SetStateAction<Character>>;
};
export function ProgramCard({
  program,
  character,
  setCharacter,
}: ProgramCardPropTypes) {
  return (
    <div
      key={program.id}
      id={program.id}
      className={clsx(
        "card",
        "mb-5",
        character?.major?.id === program.id && "card-major-selected",
        character?.minor?.id === program.id && "card-minor-selected"
      )}
    >
      <div className="card-header">
        <p className="card-header-title">{program.name}</p>
        <div className="selected-text-container">
          {character?.major?.id === program.id && (
            <p className="card-header-title selected-text major-selected-text tag is-primary">
              Major
            </p>
          )}
          {character?.minor?.id === program.id && (
            <p className="card-header-title selected-text minor-selected-text tag is-info">
              Minor
            </p>
          )}
        </div>
      </div>

      <div className="card-image">
        <figure className="image">
          <img src={program.coverImageURL ?? ""} alt="Cover for program" />
        </figure>
      </div>
      <div className="card-content">
        <div className="columns is-vcentered">
          <div className="column">
            <figure className="image is-128x128">
              <img
                src="https://media0.giphy.com/media/FopJy18z4t5hHlViZn/giphy.gif?cid=ecf05e478diube0770ny2jf9vye3fr4eefefgwvke6vk6ql3&rid=giphy.gif&ct=s"
                alt="Placeholder"
              />
            </figure>

            <div className="select">
              <select>
                {program.actionTemplates.map((template, index) => (
                  <option key={index} value={index}>
                    {template.name} ({template.type})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="column">
            <em>
              <p>"{program.backstory}"</p>
            </em>
          </div>
        </div>
      </div>
      {setCharacter && character && (
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
      )}
    </div>
  );
}

export function CharacterProgramsStage() {
  const { character, setCharacter } = useContext(CharacterContext);

  const majorActions =
    character.major?.actionTemplates.filter(
      (act) => act.type === "special" || act.type === "heavy_special"
    ) ?? [];
  const minorActions =
    character.minor?.actionTemplates.filter(
      (act) => act.type === "light_punch" || act.type === "light_kick"
    ) ?? [];
  const totalActions = majorActions.concat(minorActions);

  return (
    <section id="character-programs-stage" className="section stage">
      <div className="container">
        <h1 className="title">Select {character.name}'s Major and Minor</h1>
        <h2 className="subtitle">
          Your character's major and minor will determine the attacks it can
          make. Special moves come from your major. Light moves come from your
          minor.
        </h2>

        <div className="columns">
          <div className="column is-half">
            {schoolPrograms.map((program) => (
              <ProgramCard
                program={program}
                character={character}
                setCharacter={setCharacter}
              />
            ))}
          </div>
          <div className="column is-half">
            <div className="box is-sticky">
              <h1 className="is-size-4">Your Selected Programs & Moves</h1>
              {character.major ? (
                <div className="content">
                  <p>
                    {character.name} will be a{" "}
                    <strong>{character.major.name}</strong> major
                    {character.minor ? (
                      <span>
                        {" "}
                        and a <strong>{character.minor.name}</strong> minor
                      </span>
                    ) : (
                      "."
                    )}
                  </p>
                  <p>They will have the following actions:</p>
                  <ul>
                    {totalActions.map((actionTemplate) => (
                      <li key={actionTemplate.type}>
                        {actionTemplate.name} ({actionTemplate.type})
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="has-text-grey">
                  Select a <strong>major</strong> and (optionally) a{" "}
                  <strong>minor</strong>!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
