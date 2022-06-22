import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatedSprite } from "../../../../components/AnimatedSprite/AnimatedSprite";
import states, { CharacterState } from "../../../constants/states";
import { SoundEffect } from "../../../../interfaces";
import { CharacterStagesContext } from "../../../state";
import { ProgramCard } from "./CharacterProgramsStage";

const completeTag = <span className="tag is-success">COMPLETE</span>;
const incompleteTag = <span className="tag is-danger">INCOMPLETE</span>;

function SoundEffectPlayer({ soundEffect }: { soundEffect: SoundEffect }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <>
      <audio
        className="is-hidden"
        src={"data:audio/mpeg;base64," + soundEffect.base64EncodedAudio}
        ref={audioRef}
      />
      <span
        key={soundEffect.name}
        style={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        className="has-text-link is-clickable"
        onClick={() => audioRef.current?.play()}
      >
        🔊{soundEffect.name}
      </span>
    </>
  );
}

export function CharacterReviewStage() {
  const { character } = useContext(CharacterStagesContext);

  const isDetailsComplete =
    character.name.length > 0 && character.backstory.length > 0;

  const isProgramsComplete = character.major && character.minor;

  const isStatesComplete = states.every(
    (state: CharacterState) =>
      character.stateAnimations[state.id].length > 0 &&
      (state.id in character.stateSoundEffects
        ? // @ts-expect-error
          character.stateSoundEffects[state.id].length > 0
        : true)
  );

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
          <h1 className="title">
            Character Details {isDetailsComplete ? completeTag : incompleteTag}
          </h1>
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
                  <p>
                    {character.backstory.length > 0
                      ? character.backstory
                      : "None given..."}
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="programs">
        <div className="container">
          <h1 className="title">
            Character School Programs{" "}
            {isProgramsComplete ? completeTag : incompleteTag}
          </h1>
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
          <h1 className="title">
            Character States {isStatesComplete ? completeTag : incompleteTag}
          </h1>
          <h2 className="subtitle">
            <Link to="/create/states">Edit</Link>
          </h2>

          <div className="columns is-multiline">
            {Object.entries(character.stateAnimations).map(
              ([state, animation]) => (
                <div key={state} className="column is-2 has-text-centered">
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
                      <SoundEffectPlayer soundEffect={soundEffect} />
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
          <h1 className="title">Character Actions {incompleteTag}</h1>
          <h2 className="subtitle">
            <Link to="/create/actions">Edit</Link>
          </h2>

          <p className="has-text-grey">Coming soon...</p>
        </div>
      </section>
    </div>
  );
}
