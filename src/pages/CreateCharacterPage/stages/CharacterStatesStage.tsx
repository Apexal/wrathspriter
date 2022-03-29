import { useContext, useRef } from "react";
import { CharacterContext } from "../../../state";

import states, { CharacterState } from "../../../constants/states";
import { AnimatedSprite } from "../../../components/AnimatedSprite/AnimatedSprite";
import { SoundEffect } from "../../../interfaces";
import { fileToBase64Url } from "../../../utils/download";
import { processAudio } from "../../../services/api";

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
  const audioInputRef = useRef<HTMLInputElement>(null);

  if (!(state.id in character.stateSoundEffects)) {
    return null;
  }

  const handleSfxUpload: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.files?.length) {
      const file = ev.target.files[0];
      fileToBase64Url(file).then((b64MP3Url) => {
        const b64 = b64MP3Url.replace("data:audio/mpeg;base64,", "");

        processAudio(b64).then((processB64) => {
          setCharacter({
            ...character,
            stateSoundEffects: {
              ...character.stateSoundEffects,
              [state.id]: [
                {
                  name: "Uploaded",
                  base64EncodedAudio: processB64,
                },
              ],
            },
          });
        });
      });
    }
  };

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
    if (audioInputRef.current) {
      audioInputRef.current.value = "";
    }
  };

  return (
    <div>
      <h3 className="subtitle is-capitalized">Sound Effects</h3>
      {sfx.map((soundEffect: SoundEffect, index: number) => (
        <audio
          key={index}
          src={"data:audio/mpeg;base64," + soundEffect.base64EncodedAudio}
          controls
        ></audio>
      ))}

      <div className="file">
        <label className="file-label">
          <input
            className="file-input"
            ref={audioInputRef}
            type="file"
            accept="audio/mpeg"
            capture
            onChange={handleSfxUpload}
          />
          <span className="file-cta">
            <span className="file-label">Choose a file…</span>
          </span>
        </label>
      </div>

      <div className="buttons">
        {/* <button className="button is-small is-primary">Record New</button> */}
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
