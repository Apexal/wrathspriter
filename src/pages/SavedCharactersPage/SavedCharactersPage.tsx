import { Link } from "react-router-dom";
import { CharacterPreview } from "./components/CharacterPreview/CharacterPreviews";
import HelpButton from "../../components/HelpButton";

import testCharacter from "../../constants/character.json";
import { Character } from "../../interfaces";
import { GetAllCharacters } from "../../utils/db";

import { useState } from "react"

/**
 * Page that lists all saved characters from the user's browser.
 */
export function SavedCharactersPage() {

  const [savedCharacters, setSavedCharacters] = useState<Character[]>();
  const [run, setRun] = useState(0);

  async function GetSavedCharacters() {
    setRun(1);
    setSavedCharacters(await GetAllCharacters());
  }

  if (run == 0) GetSavedCharacters();

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

        <div className="columns is-multiline">
          {savedCharacters?.map((character) => (
            <div className = "column is-3">
              <CharacterPreview character = { character as Character } />
            </div>
          ))}
           <div className="column is-3">
            <CharacterPreview character={testCharacter as Character} />
          </div>
          <div className="column is-3">
            <CharacterPreview character={testCharacter as Character} />
          </div>
          <div className="column is-3">
            <CharacterPreview character={testCharacter as Character} />
          </div>
      </div>

        <hr />
        <Link to="/" className="button">
          Home
        </Link>
      </div>
    </section>
  );
}
