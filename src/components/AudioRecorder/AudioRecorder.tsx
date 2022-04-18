import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { fileToBase64Url } from "../../utils/download";

type AudioRecorderPropTypes = {
  disabled?: boolean;
  handleRecordingDone: (b64Url: string) => void;
};

/** Audio recorder that records from the user's microphone in OGG format. */
export function AudioRecorder(props: AudioRecorderPropTypes) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);

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

  /** Toggle the audio recorder. */
  const handleToggleRecord = () => {
    if (!mediaRecorder) return;

    if (mediaRecorder.state !== "recording") {
      mediaRecorder.start();
      setIsRecording(true);
    } else {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={handleToggleRecord}
      className={clsx(
        "audio-recorder button is-small",
        isRecording && "is-danger"
      )}
      disabled={props.disabled}
    >
      <span className="icon">🎙️</span>
      {isRecording ? <span>Stop Recording</span> : <span>Record</span>}
    </button>
  );
}
