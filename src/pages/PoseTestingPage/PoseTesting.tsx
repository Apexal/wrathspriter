import { useRef } from "react";
import {
  PoseCamera,
  PoseCameraRef,
} from "../../components/PoseCamera/PoseCamera";
import { schoolPrograms } from "../../constants";

export function PoseTestingPage() {
  const poseCameraRef = useRef<PoseCameraRef | null>(null);

  const handleCapture = () => {
    if (poseCameraRef.current?.captureScreenshot) {
      const screenshot = poseCameraRef.current?.captureScreenshot();
      console.log(screenshot);
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
        <button className="button" onClick={handleCapture}>
          Capture
        </button>
      </div>
    </div>
  );
}
