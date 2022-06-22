import Link from "next/link";
import { CharacterPreview } from "@/components/CharacterPreviews";
import HelpButton from "@/components/HelpButton";

import { db } from "@/utils/db";
import { useLiveQuery } from "dexie-react-hooks";

/**
 * Page that lists all saved characters from the user's browser.
 */
export default function SavedCharactersPage() {
  const savedCharacters = []; //useLiveQuery(() => db.characters.toArray());

  return (
    <section id="saved-characters-page" className="section page">
      <HelpButton heading="Saved Characters Page" className="is-pulled-right">
        <p>
          This page will display the characters you have created so far, and
          allow you to edit them, remove them, or send them to Wrathskeller to
          play.
        </p>
      </HelpButton>

      <div className="container">
        <h1 className="title">Saved Characters</h1>

        {savedCharacters && savedCharacters.length > 0 ? (
          <div className="columns is-multiline">
            {savedCharacters.map((characterWrapper) => (
              <div key={characterWrapper.id} className="column is-3">
                <CharacterPreview
                  dbId={characterWrapper.id!}
                  character={characterWrapper.character}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="has-text-grey">Go make some characters first!</p>
        )}

        <hr />
        <Link href="/">
          <button className="button">Home</button>
        </Link>
      </div>
    </section>
  );
}
