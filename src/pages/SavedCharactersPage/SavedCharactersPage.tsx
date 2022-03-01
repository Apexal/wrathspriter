import { Link } from "react-router-dom";
import { CharacterPreview } from "./components/CharacterPreview/CharacterPreviews";

import { testCharacter } from "../../constants";

/**
 * Page that lists all saved characters from the user's browser.
 */
export function SavedCharactersPage() {
  return (
    <section id="saved-characters-page" className="section page">
      <div className="container">
        <h1 className="title">Saved Characters</h1>

        <div className="columns is-multiline">
          <div className="column is-3">
            <CharacterPreview character={testCharacter} />
          </div>
          <div className="column is-3">
            <CharacterPreview character={testCharacter} />
          </div>
          <div className="column is-3">
            <CharacterPreview character={testCharacter} />
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
