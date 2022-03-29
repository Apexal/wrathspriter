import clsx from "clsx";
import { useState } from "react";

const modifiers = [
  "primary",
  "success",
  "info",
  "danger",
  "warning",
  "link",
  "dark",
  "light",
];

export function ThemePage() {
  const [modifier, setModifier] = useState("primary");

  return (
    <>
      {modifiers.map((modifier) => (
        <button
          key={modifier}
          onClick={() => setModifier(modifier)}
          className={"button is-" + modifier}
        >
          View {modifier} theme
        </button>
      ))}

      <section className={clsx("hero", "is-" + modifier)}>
        <div className="hero-body">
          <p className="title">WRATHSKELLER</p>
          <p className="subtitle">An RCOS Project</p>
        </div>
      </section>
      <section className="section is-text">
        <h1 className="title is-text">Page Title</h1>
        <h2 className="subtitle">Ooh cool subtitle...</h2>

        <div className="notification is-info">
          Uh oh, something broke! Just kidding, this is for testing 👀
        </div>

        <div className="buttons">
          <button className={clsx("button", "is-warning")}>Continue</button>
          <button className="button is-danger">Back</button>
          <button className="button">Back</button>
        </div>
      </section>
    </>
  );
}
