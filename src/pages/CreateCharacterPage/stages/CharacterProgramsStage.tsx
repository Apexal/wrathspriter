import { schoolPrograms } from "../../../constants";

export function CharacterProgramsStage() {
  return (
    <section id="character-programs-stage" className="section stage">
      <div className="container">
        <h1 className="title">Select Major and Minor</h1>

        <div className="columns is-multiline">
          {schoolPrograms.map((program) => (
            <div key={program.id} className="column is-half">
              <div id={program.id} className="card">
                <div className="card-header">
                  <p className="card-header-title">{program.name}</p>
                </div>
                <div className="card-content">
                  <div className="columns">
                    <div className="column">
                      <figure className="image is-square">
                        <img
                          src="https://via.placeholder.com/500"
                          alt="Placeholder"
                        />
                      </figure>
                    </div>
                    <div className="column">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus facere mollitia officiis corrupti suscipit a
                        pariatur ipsa. Ipsum eveniet incidunt animi labore optio
                        non, mollitia et, voluptatum commodi nesciunt
                        voluptatibus.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <a className="card-footer-item">Use as Major</a>
                  <a className="card-footer-item">Use as Minor</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
