import Dexie, { Table } from "dexie";
import { Character } from "../interfaces/character";

interface Props {
    character: Character;
}

export class DexieDatabase extends Dexie {

    characters!: Table<Props>

    constructor() {
        super("characterDatabase");
        this.version(1).stores({
            characters: "++id, character"
        });
    }
}

export const db = new DexieDatabase();

export function AddCharacterForm(props: Props) {
    if (!db.isOpen()) db.open();
    async function addCharacter() {
        try {
            const id = await db.characters.add(props);
            console.log(id);
        } catch (error) {
            console.log(error);
        }
    }

    addCharacter();
}