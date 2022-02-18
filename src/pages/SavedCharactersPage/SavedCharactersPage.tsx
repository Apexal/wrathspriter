import { Link } from "react-router-dom";

export function SavedCharactersPage() {
  return (
    <section id="saved-characters-page" className="section page">
      <div className="container">
        <h1 className="title">Saved Characters</h1>

        <Link to="/" className="button">
          Home
        </Link>
      </div>
    </section>
  );
}
