import { useContext, useRef, useState } from "react";
import { CharacterContext } from "../../../state";

import states, { CharacterState } from "../../../constants/states";
import { AnimatedSprite } from "../../../components/AnimatedSprite/AnimatedSprite";
import { AnimationFrame, SoundEffect } from "../../../interfaces";
import { fileToBase64Url } from "../../../utils/download";
import { processAudio, processImage } from "../../../services/api";
import { defaultFrame } from "../../../constants";

import "./CharacterStatesStage.scss";
import clsx from "clsx";

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
          .catch((err) => {
            alert(
              "There was an error uploading and/or processing the image. Please try again later!"
            );
            console.error(err);
          })
          .finally(() => {
            setIsProcessing(false);
          });
      });
    }
  };

  const handleFrameDurationClick = (
    frameIndex: number,
    frame: AnimationFrame
  ) => {
    if (isProcessing) {
      return;
    }

    const newDuration = prompt(
      `How many seconds should this frame play for? Must be between 0 and 5. (current: ${frame.durationInS}s)`
    );
    if (!newDuration) {
      return;
    }
    const newDurationFloat = parseFloat(newDuration);
    if (
      isNaN(newDurationFloat) ||
      newDurationFloat <= 0 ||
      newDurationFloat > 5
    ) {
      return;
    }

    const newCharacter = {
      ...character,
    };

    newCharacter.stateAnimations[state.id][frameIndex].durationInS =
      newDurationFloat;

    setCharacter(newCharacter);
  };

  const frames = character.stateAnimations[state.id];

  return (
    <div className="box animation-editor">
      <h3 className="subtitle is-capitalized">Animation 🎞️</h3>
      {frames.length > 0 && (
        <div className="is-flex">
          <AnimatedSprite
            isPlaying={!isProcessing}
            width={150}
            height={150}
            animation={frames}
          />
          <div className="frames">
            {frames.map((frame, index) => (
              <div key={index} className="frame-preview">
                <img
                  src={"data:image/png;base64," + frame.base64EncodedImage}
                  alt=""
                  width={50}
                  height={50}
                />
                <p
                  onClick={() => handleFrameDurationClick(index, frame)}
                  className="m-0 has-text-centered"
                >
                  {frame.durationInS}s
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isProcessing ? (
        <span>Processing image...</span>
      ) : (
        <div className="buttons">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {frames.length > 0 && (
            <button
              className="button is-small"
              onClick={handleClearAnimation}
              disabled={isProcessing}
            >
              Clear
            </button>
          )}
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

      let sfxName =
        prompt(
          `What's the name of the sound effect? (default: ${file.name.replace(
            ".mp3",
            ""
          )})`
        ) ?? file.name.replace(".mp3", "");

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
          .catch((err) => {
            alert(
              "There was an error uploading and/or processing the audio. Please try again later!"
            );
            console.error(err);
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
    <div className="box">
      <h3 className="subtitle is-capitalized">Sound Effects 🎙️</h3>
      {sfx.map((soundEffect: SoundEffect, index: number) => (
        <div key={index}>
          <audio
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
            capture="user"
            onChange={handleSfxUpload}
          />
          {sfx.length > 0 && (
            <button
              className="button is-small"
              onClick={handleClearSfx}
              disabled={isProcessing}
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** A self-contained editor for a particular character state. Includes SFX editor and animation editor. */
function CharacterStateBox({ state }: { state: CharacterState }) {
  return (
    <div>
      <div className="columns">
        <div className="column is-3">
          <h2 className="title is-capitalized">{state.id}</h2>
          <h3 className="subtitle">{state.description}</h3>
          {state.exampleAnimation && (
            <AnimatedSprite
              width={100}
              height={100}
              animation={state.exampleAnimation}
            />
          )}
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

  const [currentState, setCurrentState] = useState<CharacterState>(states[0]);

  const isDone = (state: CharacterState) =>
    character.stateAnimations[state.id].length > 0 &&
    (state.id in character.stateSoundEffects
      ? // @ts-expect-error
        character.stateSoundEffects[state.id].length > 0
      : true);

  return (
    <section id="character-states-stage" className="section stage">
      <div className="container">
        <h1 className="title">
          {character.name}'s State Animations and Sounds
        </h1>
        <h2 className="subtitle">
          Your character will find itself in many different states. Each needs
          pictures to form the animations, and some even need sound effects!
        </h2>

        <div className="buttons states">
          {states.map((state) => (
            <button
              key={state.id}
              title={
                isDone(state)
                  ? "This state has the minimum sound effects and pictures."
                  : "You need to take pictures and/or record audio!"
              }
              className={clsx(
                "button is-capitalized",
                isDone(state) && "is-success",
                state.id === currentState.id && "is-active"
              )}
              onClick={() => setCurrentState(state)}
            >
              <span>{state.id}</span>
            </button>
          ))}
        </div>

        <hr />

        <CharacterStateBox state={currentState} />
      </div>
    </section>
  );
}
