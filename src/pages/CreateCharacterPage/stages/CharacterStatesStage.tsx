import { useContext, useRef, useState } from "react";
import { CharacterContext } from "../../../state";

import states, { CharacterState } from "../../../constants/states";
import { AnimatedSprite } from "../../../components/AnimatedSprite/AnimatedSprite";
import { SoundEffect } from "../../../interfaces";
import { fileToBase64Url } from "../../../utils/download";
import { processAudio, processImage } from "../../../services/api";
import { defaultFrame } from "../../../constants";

import "./CharacterStatesStage.scss";

/** Editor for users to add, edit, and clear animation frames for a particular state. */
function CharacterStateAnimationEditor({ state }: { state: CharacterState }) {
  const { character, setCharacter } = useContext(CharacterContext);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  /** Clears the state's animation frames. */
  const handleClearAnimation = () => {
    setCharacter({
      ...character,
      stateAnimations: {
        ...character.stateAnimations,
        [state.id]: [],
      },
    });
  };

  /** Grabs the image file, sends it to the server to process, and then adds it in a new frame to the state animation. */
  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = (
    ev
  ) => {
    if (ev.target.files?.length) {
      const file = ev.target.files[0];
      fileToBase64Url(file).then((b64Url) => {
        const b64 = b64Url.slice(b64Url.indexOf("base64,") + 7); // Remove URL prefix
        setIsProcessing(true);
        processImage(b64)
          .then((processB64) => {
            setCharacter({
              ...character,
              stateAnimations: {
                ...character.stateAnimations,
                [state.id]: [
                  ...character.stateAnimations[state.id],
                  {
                    ...defaultFrame,
                    base64EncodedImage: processB64,
                  },
                ],
              },
            });
          })
          .finally(() => {
            setIsProcessing(false);
          });
      });
    }
  };

  return (
    <div className="animation-editor">
      <h3 className="subtitle is-capitalized">Animation</h3>
      {character.stateAnimations[state.id].length > 0 && (
        <div className="is-flex">
          <AnimatedSprite
            isPlaying={!isProcessing}
            width={150}
            height={150}
            animation={character.stateAnimations[state.id]}
          />
          <div className="frames">
            {character.stateAnimations[state.id].map((frame, index) => (
              <div key={index} className="frame-preview">
                <img
                  src={"data:image/png;base64," + frame.base64EncodedImage}
                  alt=""
                  width={50}
                  height={50}
                />
                <p className="m-0 has-text-centered">{frame.durationInS}s</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isProcessing ? (
        <span>Processing image...</span>
      ) : (
        <div className="buttons">
          <input
            type="file"
            id="imageFile"
            capture="user"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button
            className="button is-small"
            onClick={handleClearAnimation}
            disabled={isProcessing}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

/** Editor for users to record and clear sound effects for a particular state. */
function CharacterStateSfxEditor({ state }: { state: CharacterState }) {
  const { character, setCharacter } = useContext(CharacterContext);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!(state.id in character.stateSoundEffects)) {
    return null;
  }

  const handleSfxUpload: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.files?.length) {
      const file = ev.target.files[0];
      const sfxName = prompt("What's the name of the sound effect?");
      if (!sfxName || sfxName.trim().length === 0) {
        return;
      }

      fileToBase64Url(file).then((b64MP3Url) => {
        const b64 = b64MP3Url.replace("data:audio/mpeg;base64,", "");

        setIsProcessing(true);
        processAudio(b64)
          .then((processB64) => {
            setCharacter({
              ...character,
              stateSoundEffects: {
                ...character.stateSoundEffects,
                [state.id]: [
                  {
                    name: sfxName.trim(),
                    base64EncodedAudio: processB64,
                  },
                ],
              },
            });
          })
          .finally(() => {
            setIsProcessing(false);
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
        <div>
          <audio
            key={index}
            title={soundEffect.name ?? ""}
            src={"data:audio/mpeg;base64," + soundEffect.base64EncodedAudio}
            controls
          ></audio>
        </div>
      ))}

      {isProcessing ? (
        <span>Processing audio...</span>
      ) : (
        <div className="buttons">
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/mpeg"
            capture
            onChange={handleSfxUpload}
          />
          <button
            className="button is-small"
            onClick={handleClearSfx}
            disabled={isProcessing}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

/** A self-contained editor for a particular character state. Includes SFX editor and animation editor. */
function CharacterStateBox({ state }: { state: CharacterState }) {
  const { character } = useContext(CharacterContext);

  const isDone =
    character.stateAnimations[state.id].length > 0 &&
    (state.id in character.stateSoundEffects
      ? // @ts-expect-error
        character.stateSoundEffects[state.id].length > 0
      : true);

  return (
    <div className="box mb-5">
      <div className="columns">
        <div className="column is-narrow is-size-2 is-vcentered">
          {isDone ? <span>✔️</span> : <span>❌</span>}
        </div>
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

/** Stage where users record sound effects and upload animation frames for the different character states. */
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
