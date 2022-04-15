import { Character, Action } from "../interfaces";

export function determineCharacterActions(character: Character): Action[] {
  const majorActions =
    character.major?.actionTemplates.filter(
      (act) => act.type === "special" || act.type === "heavy_special"
    ) ?? [];
  const minorActions =
    character.minor?.actionTemplates.filter(
      (act) => act.type === "light_punch" || act.type === "light_kick"
    ) ?? [];

  return majorActions.concat(minorActions);
}
