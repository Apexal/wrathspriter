import { useContext } from "react";
import { CharacterContext } from "../../../state";

import states, { CharacterState } from "../../../constants/states";

function CharacterStateBox({ state }: { state: CharacterState }) {
  const { character } = useContext(CharacterContext);

  return (
    <div className="box">
      <h2 className="title is-capitalized">{state.id}</h2>
      <h3 className="subtitle">{state.description}</h3>
    </div>
  );
}

export function CharacterStatesStage() {
  const { character } = useContext(CharacterContext);

  return (
    <section id="character-states-stage" className="section stage">
      <div className="container">
        <h1 className="title">
          {character.name}'s State Animations and Sounds
        </h1>

        <div className="states">
          {states.map((state) => (
            <CharacterStateBox key={state.id} state={state} />
          ))}
        </div>
      </div>
    </section>
  );
}
