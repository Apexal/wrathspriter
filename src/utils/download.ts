import { Character } from "../interfaces";

export function fileToBase64Url(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
}

function downloadToFile(content: BlobPart, filename: string, contentType: any) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
}

/**
 * Prompts the user to download a character as a .wrath file in JSON format.
 * Filename matches the `name` property of the character.
 */
export function downloadCharacter(character: Character) {
  downloadToFile(
    JSON.stringify(character),
    character.name + ".wrath",
    "application/json"
  );
}
