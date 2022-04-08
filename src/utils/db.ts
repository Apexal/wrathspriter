import Dexie, { Table } from "dexie";
import { Character } from "../interfaces/character";

export interface DBProps {
  character: Character;
}

export class DexieDatabase extends Dexie {
  characters!: Table<DBProps>;

  constructor() {
    super("characterDatabase");
    this.version(1).stores({
      characters: "++id, character",
    });
  }
}

export const db = new DexieDatabase();

export function AddCharacterForm(props: DBProps) {
  if (!db.isOpen()) db.open();
  async function addCharacter() {
    try {
      await db.characters.add(props);
    } catch (error) {
      console.log(error);
    }
  }

  addCharacter();
}

export async function GetAllCharacters() {
  let characters: Character[] = [];

  // Gets all entries from the database and then makes sure it is a valid character
  // Error checking is done here instead of on-site
  async function getCharacters() {
    let dbprops = await db.characters.toArray();
    for (let i = 0; i < dbprops.length; i++) {
      if ((dbprops[i].character as Character) === undefined) continue;
      characters.push(dbprops[i].character);
    }
  }

  await getCharacters();

  console.log(characters);
  return characters;
}
