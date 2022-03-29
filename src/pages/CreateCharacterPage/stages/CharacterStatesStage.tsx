import { useContext, useRef, useState } from "react";
import { CharacterContext } from "../../../state";

import states, { CharacterState } from "../../../constants/states";
import { AnimatedSprite } from "../../../components/AnimatedSprite/AnimatedSprite";
import { SoundEffect } from "../../../interfaces";
import { fileToBase64Url } from "../../../utils/download";
import { processAudio, processImage } from "../../../services/api";
import { defaultFrame } from "../../../constants";

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
      <div>
        <h3 className="subtitle is-capitalized">Animation</h3>
        {character.stateAnimations[state.id].length > 0 && (
          <AnimatedSprite
            isPlaying={true}
            width={150}
            height={150}
            animation={character.stateAnimations[state.id]}
          />
        )}
      </div>

      <div className="buttons">
        {isProcessing ? (
          <span>Processing image...</span>
        ) : (
          <input
            type="file"
            id="imageFile"
            capture="user"
            accept="image/*"
            onChange={handleImageUpload}
          />
        )}

        <button
          className="button is-small"
          onClick={handleClearAnimation}
          disabled={isProcessing}
        >
          Clear
        </button>
      </div>
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
                    name: "Uploaded",
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
        <audio
          key={index}
          src={"data:audio/mpeg;base64," + soundEffect.base64EncodedAudio}
          controls
        ></audio>
      ))}

      {isProcessing ? (
        <span>Processing audio...</span>
      ) : (
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
              <span className="file-label">Upload/Record</span>
            </span>
          </label>
        </div>
      )}

      <div className="buttons">
        {/* <button className="button is-small is-primary">Record New</button> */}
        <button
          className="button is-small"
          onClick={handleClearSfx}
          disabled={isProcessing}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

/** A self-contained editor for a particular character state. Includes SFX editor and animation editor. */
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
