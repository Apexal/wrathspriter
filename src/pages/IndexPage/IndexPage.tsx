import "./IndexPage.scss";

/**
 * The homepage displayed to all users. Allows them to either
 * create a new character or view their existing characters.
 */
export function IndexPage() {
  return (
    <section id="index-page" className="section page">
      <div className="container has-text-centered">
        <header>
          <h1 className="is-uppercase is-size-1">Wrathspriter</h1>
          <h2 className="is-size-5 is-uppercase">
            the ultimate platform for wrathskeller customizability™
          </h2>
        </header>

        <main>
          <figure className="image display-image my-5">
            <img
              src="https://media3.giphy.com/media/1xb8n8qWt2RNtShhWT/giphy.gif?cid=ecf05e473uv5y1rizuesg8h5q9r1dk2pdt3caryqkk3h9l9u&rid=giphy.gif&ct=s"
              alt="Dancing animation"
            />
          </figure>
          <div className="is-flex is-flex-direction-column is-align-items-center action-buttons">
            <button className="button is-flex-grow-0 mt-5">Create</button>
            <button className="button is-flex-grow-0 mt-5">Saved</button>
          </div>
        </main>
      </div>
    </section>
  );
}
