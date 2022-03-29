const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function processAudio(audioB64: string) {
  const response = await fetch(API_BASE_URL + "/audio", {
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

export async function processImage(imageB64: string) {
  const response = await fetch(API_BASE_URL + "/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64EncodedImage: imageB64,
    }),
  });

  const data = await response.json();
  return data.base64EncodedImage;
}
