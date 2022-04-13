import { NormalizedLandmarkList } from "@mediapipe/pose";
import clsx from "clsx";
import { useRef, useState, useEffect } from "react";
import { useCountdown } from "../../utils/hooks";
import { checkIsFullyInFrame } from "../../utils/posing";
import { PoseCameraRef, PoseCamera } from "../PoseCamera/PoseCamera";

type PoseCameraModalPropTypes = {
  isOpen: boolean;
  close: () => void;
  isProcessing: boolean;
  handleProcessImage: (
    b64: string,
    poseLandmarks?: NormalizedLandmarkList | undefined
  ) => Promise<void>;
};

export function PoseCameraModal({
  isOpen,
  close,
  isProcessing,
  handleProcessImage,
}: PoseCameraModalPropTypes) {
  const poseCameraRef = useRef<PoseCameraRef | null>(null);
  const [isFullyInFrame, setIsFullyInFrame] = useState<boolean>(false);
  const [isWaitingToScreenshot, setIsWaitingToScreenshot] =
    useState<boolean>(false);

  const takeScreenshot = () => {
    if (!poseCameraRef.current?.actualPose) return;

    if (!checkIsFullyInFrame(poseCameraRef.current.actualPose)) {
      window.alert("Your whole body was not in the frame!");
      return;
    }

    const b64Url = poseCameraRef.current?.captureScreenshot();
    if (!b64Url) return;

    const b64 = b64Url.slice(b64Url.indexOf("base64,") + 7); // Remove URL prefix

    handleProcessImage(b64, poseCameraRef.current?.actualPose ?? undefined);

    startCountdown();
  };

  const [isCountingDown, secondsLeft, startCountdown, endCountdown] =
    useCountdown(5, takeScreenshot);

  useEffect(() => {
    if (isProcessing) {
      endCountdown();
    } else if (isWaitingToScreenshot && isFullyInFrame) {
      startCountdown();
    } else if (isWaitingToScreenshot && !isFullyInFrame) {
      endCountdown();
    } else if (isCountingDown && !isFullyInFrame) {
      endCountdown();
    }
  }, [
    endCountdown,
    isCountingDown,
    isFullyInFrame,
    isWaitingToScreenshot,
    startCountdown,
    isProcessing,
  ]);

  const handleClose = () => {
    setIsWaitingToScreenshot(false);
    endCountdown();
    close();
  };

  let columnBody: JSX.Element | null = null;

  if (isProcessing) {
    columnBody = (
      <div>
        <p>Processing image!</p>
        <progress className="progress is-success" />
      </div>
    );
  } else if (isCountingDown) {
    columnBody = (
      <div>
        <span className="is-size-1">{secondsLeft}</span>
        <progress
          max={5}
          value={secondsLeft}
          className="progress is-small is-primary"
        />
      </div>
    );
  } else if (isWaitingToScreenshot) {
    columnBody = (
      <div>
        <p className="is-size-4">Get fully into the frame!</p>
        <progress className="progress is-primary" />
      </div>
    );
  } else {
    columnBody = (
      <div>
        <p className="is-size-4 mb-5">
          Click to start countdown, then quick get into position!
        </p>
        <button
          className="button is-primary is-large"
          onClick={() => setIsWaitingToScreenshot(true)}
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className={clsx("modal", isOpen && "is-active")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Time to Pose!</p>
        </header>
        <section className="modal-card-body">
          <div className="columns is-vcentered">
            <div className="column is-narrow">
              <PoseCamera
                ref={poseCameraRef}
                isSkeletonDrawn={true}
                handleFullyInFrameChange={setIsFullyInFrame}
              />
            </div>
            <div className="column has-text-centered">{columnBody}</div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={handleClose}>
            Done
          </button>
        </footer>
      </div>
    </div>
  );
}
