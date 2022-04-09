import { Character } from "../interfaces";
import { PoseAngle } from "../interfaces/pose";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://127.0.0.1:8000";

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

export async function processImage(imageB64: string, pose?: PoseAngle[]) {
  const response = await fetch(API_BASE_URL + "/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pose,
      base64EncodedImage: imageB64,
    }),
  });

  const data = await response.json();
  return data.base64EncodedImage;
}

export async function sendCharacterToServer(
  character: Character
): Promise<Character> {
  const response = await fetch(API_BASE_URL + "/characters/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  });

  const data = await response.json();
  return data as Character;
}
