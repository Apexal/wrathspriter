import { useContext } from "react";
import { CharacterContext } from "../../../state";

import states, { CharacterState } from "../../../constants/states";
import { AnimatedSprite } from "../../../components/AnimatedSprite/AnimatedSprite";
import { SoundEffect } from "../../../interfaces";

function CharacterStateAnimationEditor({ state }: { state: CharacterState }) {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleClearAnimation = () => {
    setCharacter({
      ...character,
      stateAnimations: {
        ...character.stateAnimations,
        [state.id]: [],
      },
    });
  };

  return (
    <div className="animation-editor">
      <div>
        <h3 className="subtitle is-capitalized">Animation</h3>
        {character.stateAnimations[state.id].length === 0 ? (
          <span>Add frames!</span>
        ) : (
          <AnimatedSprite
            width={150}
            height={150}
            animation={character.stateAnimations[state.id]}
          />
        )}
      </div>
      <div className="buttons">
        <button className="button is-primary is-small">Add Frame</button>
        <button className="button is-small" onClick={handleClearAnimation}>
          Clear
        </button>
      </div>
    </div>
  );
}

function CharacterStateSfxEditor({ state }: { state: CharacterState }) {
  const { character, setCharacter } = useContext(CharacterContext);

  if (!(state.id in character.stateSoundEffects)) {
    return null;
  }
  // @ts-expect-error
  const sfx = character.stateSoundEffects[state.id];

  const handleClearSfx = () => {
    setCharacter({
      ...character,
      stateSoundEffects: {
        ...character.stateSoundEffects,
        [state.id]: [],
      },
    });
  };

  return (
    <div>
      <h3 className="subtitle is-capitalized">Sound Effects</h3>
      {sfx.map((soundEffect: SoundEffect) => (
        <audio
          src={"data:audio/mp3;base64," + soundEffect.base64EncodedAudio}
          controls
        ></audio>
      ))}

      <div className="buttons">
        <button className="button is-small is-primary">Record New</button>
        <button className="button is-small" onClick={handleClearSfx}>
          Clear
        </button>
      </div>
    </div>
  );
}

function CharacterStateBox({ state }: { state: CharacterState }) {
  return (
    <div className="box">
      <div className="columns">
        <div className="column">
          <h2 className="title is-capitalized">{state.id}</h2>
          <h3 className="subtitle">{state.description}</h3>
        </div>
        <div className="column">
          <CharacterStateSfxEditor state={state} />
        </div>
        <div className="column">
          <CharacterStateAnimationEditor state={state} />
        </div>
      </div>
    </div>
  );
}

export function CharacterStatesStage() {
  const { character } = useContext(CharacterContext);

  return (
    <section id="character-states-stage" className="section stage">
      <div className="container">
        <h1 className="title">
          {character.name}'s State Animations and Sounds
        </h1>

        <div className="states">
          {states.map((state) => (
            <CharacterStateBox key={state.id} state={state} />
          ))}
        </div>
      </div>
    </section>
  );
}
