import { useEffect, useRef, useState } from "react";
import { fileToBase64Url } from "../../utils/download";

type AudioRecorderPropTypes = {
  handleRecordingDone: (b64Url: string) => void;
};

/** Audio recorder that records from the user's microphone in OGG format. */
export function AudioRecorder(props: AudioRecorderPropTypes) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  /** Stores audio data chunks */
  const chunksRef = useRef<BlobPart[]>([]);

  /** On first render, attempt to grab the user's mic. */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(setMediaStream)
      .catch((err) => {
        alert("Something went wrong trying to connect to your microphone.");
        console.error(err);
      });
  }, []);

  /** Whenever the user's mic is grabbed, setup the recorder. */
  useEffect(() => {
    if (mediaStream) {
      const recorder = new MediaRecorder(mediaStream);

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
        console.log("data");
      };

      /** Once stopped, call the callback passed through props with the data URL. */
      recorder.onstop = () => {
        // Note that only a few formats are allowed, not including MP3 >:(
        const blob = new Blob(chunksRef.current, {
          type: "audio/ogg; codecs=opus",
        });
        chunksRef.current = [];
        fileToBase64Url(blob).then(props.handleRecordingDone);
      };

      setMediaRecorder(recorder);
    }
  }, [mediaStream, props.handleRecordingDone]);

  const handleStart = () => {
    mediaRecorder?.start();
    console.log("Started recording");
  };

  const handleStop = () => {
    mediaRecorder?.stop();
    console.log("Stopped recording");
  };

  return (
    <div className="audio-recorder">
      <div className="buttons">
        <button onClick={handleStart} className="button">
          Record
        </button>
        <button onClick={handleStop} className="button">
          Stop
        </button>
      </div>
    </div>
  );
}
