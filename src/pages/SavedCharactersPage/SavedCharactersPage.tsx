import { Link } from "react-router-dom";
import { CharacterPreview } from "./components/CharacterPreview/CharacterPreviews";
import HelpButton from "../../components/HelpButton";

import { Character } from "../../interfaces";
import { GetAllCharacters } from "../../utils/db";

import { useEffect, useState } from "react";

/**
 * Page that lists all saved characters from the user's browser.
 */
export function SavedCharactersPage() {
  const [savedCharacters, setSavedCharacters] = useState<{
    [id: number]: Character;
  }>({});

  useEffect(() => {
    GetAllCharacters().then(setSavedCharacters);
  }, []);

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

        {Object.keys(savedCharacters).length > 0 ? (
          <div className="columns is-multiline">
            {Object.entries(savedCharacters).map(([id, character]) => (
              <div key={id} className="column is-3">
                <CharacterPreview dbId={+id} character={character} />
              </div>
            ))}
          </div>
        ) : (
          <p className="has-text-grey">Go make some characters first!</p>
        )}

        <hr />
        <Link to="/" className="button">
          Home
        </Link>
      </div>
    </section>
  );
}
