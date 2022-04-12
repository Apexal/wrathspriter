import { useRef, useState } from "react";
import { CountdownButton } from "../../components/CountdownButton/CountdownButton";
import {
  PoseCamera,
  PoseCameraRef,
} from "../../components/PoseCamera/PoseCamera";
import { schoolPrograms } from "../../constants";

export function PoseTestingPage() {
  const poseCameraRef = useRef<PoseCameraRef | null>(null);
  const [screenshots, setScreenshots] = useState<string[]>([]);

  const handleCapture = () => {
    if (poseCameraRef.current?.captureScreenshot) {
      const screenshot = poseCameraRef.current?.captureScreenshot();
      console.log(screenshot);
      if (screenshot) {
        setScreenshots([...screenshots, screenshot]);
      }
    }
  };

  return (
    <div className="section pose-testing-page">
      <div className="container">
        <PoseCamera
          ref={poseCameraRef}
          pose={schoolPrograms[0].actionTemplates[0].animation[0].pose}
          isSkeletonDrawn={true}
        />
        <CountdownButton seconds={2} onExecute={handleCapture}>
          Capture
        </CountdownButton>

        <div>
          {screenshots.map((screenshot, i) => (
            <img src={screenshot} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
