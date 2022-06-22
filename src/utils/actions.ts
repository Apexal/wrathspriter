import { baseActions } from "@/constants/actions";
import { Character, Action } from "@/interfaces";

/** Given a character with major and (optionally) minor set, returns the action templates for the character. */
export function determineCharacterActions(character: Character): Action[] {
  const majorActions =
    character.major?.actionTemplates.filter(
      (act) => act.type === "heavy_special" || act.type === "super"
    ) ?? [];
  const minorActions =
    character.minor?.actionTemplates.filter((act) => act.type === "special") ??
    [];

  return [...baseActions, ...majorActions, ...minorActions];
}
