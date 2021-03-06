import { useContext, useEffect } from "react";
import { CharacterStagesContext } from "../../../state";

export function CharacterActionsStage() {
  const { character, setCanNavigateNext } = useContext(CharacterStagesContext);

  useEffect(() => {
    setCanNavigateNext(true);
  }, [setCanNavigateNext]);

  return (
    <section className="section stage" id="character-actions-stage">
      <div className="container">
        <h1 className="title">
          {character.name}'s Action Animations and Sounds
        </h1>
        <h2 className="subtitle">
          Your character can perform different actions to defeat its opponent!
          Each needs pictures and sound effects!
        </h2>

        <p className="has-text-grey">Coming soon...</p>
      </div>
    </section>
  );
}
