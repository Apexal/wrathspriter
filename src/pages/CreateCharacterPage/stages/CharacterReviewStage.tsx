import { useContext } from "react";
import { Link } from "react-router-dom";
import { AnimatedSprite } from "../../../components/AnimatedSprite/AnimatedSprite";
import { CharacterContext } from "../../../state";
import { ProgramCard } from "./CharacterProgramsStage";

export function CharacterReviewStage() {
  const { character } = useContext(CharacterContext);

  return (
    <div className="stage" id="character-review-stage">
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Review {character.name}</p>
          <p className="subtitle">
            Make sure your character details, major/minor, animations, and
            sounds are right!
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container" id="details">
          <h1 className="title">Character Details</h1>
          <h2 className="subtitle">
            <Link to="/create">Edit</Link>
          </h2>

          <div className="columns">
            <div className="column">
              <strong>Character Name</strong>
              <p>{character.name}</p>
            </div>
            <div className="column">
              <strong>Character Backstory</strong>
              <div className="content">
                <blockquote>
                  <p>"{character.backstory}"</p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="programs">
        <div className="container">
          <h1 className="title">Character School Programs</h1>
          <h2 className="subtitle">
            <Link to="/create/programs">Edit</Link>
          </h2>

          <div className="columns">
            <div className="column">
              {character.major && (
                <ProgramCard program={character.major} character={character} />
              )}
            </div>
            <div className="column">
              {character.minor &&
                character.major?.id !== character.minor.id && (
                  <ProgramCard
                    program={character.minor}
                    character={character}
                  />
                )}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h1 className="title">Character States</h1>
          <h2 className="subtitle">
            <Link to="/create/states">Edit</Link>
          </h2>

          <div className="columns is-multiline">
            {Object.entries(character.stateAnimations).map(
              ([state, animation]) => (
                <div key={state} className="column is-2">
                  {animation.length > 0 ? (
                    <AnimatedSprite
                      animation={animation}
                      height={150}
                      width={150}
                      isPlaying={true}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150x150.png?text=Missing"
                      alt="Missing animation"
                    />
                  )}
                  {state in character.stateSoundEffects &&
                    // @ts-ignore
                    character.stateSoundEffects[state].map((soundEffect) => (
                      <span
                        key={soundEffect.name}
                        style={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                        className="has-text-link"
                      >
                        🔊{soundEffect.name}
                      </span>
                      // <audio
                      //   title={soundEffect.name ?? ""}
                      //   src={
                      //     "data:audio/mpeg;base64," +
                      //     soundEffect.base64EncodedAudio
                      //   }
                      //   controls
                      // ></audio>
                    ))}
                  <p className="is-uppercase has-text-centered">
                    <strong>{state}</strong>
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="section" id="actions">
        <div className="container">
          <h1 className="title">Character Actions</h1>
          <h2 className="subtitle">
            <Link to="/create/actions">Edit</Link>
          </h2>

          <p className="has-text-grey">Coming soon...</p>
        </div>
      </section>
    </div>
  );
}
