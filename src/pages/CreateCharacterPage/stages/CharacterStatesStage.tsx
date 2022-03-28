import { useContext } from "react";
import { CharacterContext } from "../../../state";

import states, { CharacterState } from "../../../constants/states";
import { AnimatedSprite } from "../../../components/AnimatedSprite/AnimatedSprite";

function CharacterStateBox({ state }: { state: CharacterState }) {
  const { character } = useContext(CharacterContext);

  return (
    <div className="box">
      <div className="columns">
        <div className="column">
          <h2 className="title is-capitalized">{state.id}</h2>
          <h3 className="subtitle">{state.description}</h3>
        </div>
        <div className="column">
          <h3 className="subtitle is-capitalized">Sound Effects</h3>
        </div>
        <div className="column">
          <div className="animation-editor">
            <div>
              <h3 className="subtitle is-capitalized">Animation</h3>
              <AnimatedSprite
                width={150}
                height={150}
                animation={character.stateAnimations[state.id]}
              />
            </div>
            <button className="button is-primary is-small">Add Frame</button>
          </div>
        </div>
      </div>

      <div className="sound-effects"></div>
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
