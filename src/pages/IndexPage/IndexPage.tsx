import { Link } from "react-router-dom";
import HelpButton from "../../components/HelpButton";

import logo from "../../assets/img/light_punch_pose_frame_0.png";

import "./IndexPage.scss";

/**
 * The homepage displayed to all users. Allows them to either
 * create a new character or view their existing characters.
 */
export function IndexPage() {
  return (
    <section id="index-page" className="section page">
      <HelpButton
        heading="Welcome to Wrathspriter!"
        className="is-pulled-right"
      >
        <p>
          This is the companion app for creating characters for{" "}
          <a
            href="https://www.github.com/Apexal/Wrathskeller"
            target="_blank"
            rel="noreferrer"
          >
            Wrathskeller
          </a>
          !
        </p>
        <br />
        <p>
          You'll choose a name, major, and minor and then take some fighting
          pose pictures before sending your creation off into the game!
        </p>
        <br />
        <p>
          Already made a character? Don't worry! Just navigate to the "Saved"
          screen to edit an existing character or send it off again.
        </p>
      </HelpButton>
      <div className="container has-text-centered">
        <header>
          <h1 className="is-uppercase is-size-1">Wrathspriter</h1>
          <h2 className="is-size-5 is-uppercase">
            the ultimate platform for wrathskeller customizability™
          </h2>
        </header>
        <main>
          <figure className="image display-image m-auto my-5">
            <img src={logo} alt="Dancing animation" />
          </figure>
          <div className="is-flex is-flex-direction-column is-align-items-center action-buttons">
            <Link to="/create" className="button is-flex-grow-0 mt-5">
              Create
            </Link>
            <Link to="/saved" className="button is-flex-grow-0 mt-5">
              Saved
            </Link>
          </div>
        </main>
      </div>
    </section>
  );
}
