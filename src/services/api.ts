import { NormalizedLandmarkList } from "@mediapipe/pose";
import { Character } from "../interfaces";

/** The base url of the desired Wrathserver instance. */
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://127.0.0.1:8000";

/** Sends base64 encoded MP3 or OGG audio to Wrathserver to be cleaned up. Returns the base64 formatted cleaned up audio in MP3 format. */
export async function processAudio(
  audioB64: string,
  mimetype: "audio/mpeg" | "audio/ogg" = "audio/mpeg"
) {
  const response = await fetch(API_BASE_URL + `/audio?mimetype=${mimetype}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64EncodedAudio: audioB64,
    }),
  });

  const data = await response.json();
  return data.base64EncodedAudio;
}

/** Sends base64 encoded PNG to be formatted by Wrathserver. Returns base64 formatted image. */
export async function processImage(
  imageB64: string,
  normalizedPoseLandmarks?: NormalizedLandmarkList
): Promise<string> {
  const response = await fetch(API_BASE_URL + "/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      normalizedPoseLandmarks,
      base64EncodedImage: imageB64,
    }),
  });

  const data = await response.json();
  return data.base64EncodedImage;
}

/** Sends character JSON to Wrathserver to be stored for a short time. Returns the stored character which includes the character code.  */
export async function sendCharacterToServer(
  character: Character
): Promise<Character> {
  const response = await fetch(API_BASE_URL + "/characters/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...character,
      actions: [], // Temporarily don't send actions as they aren't properly populated yet
    }),
  });

  const data = await response.json();
  return data as Character;
}
