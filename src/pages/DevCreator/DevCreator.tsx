import HelpButton from "../../components/HelpButton";

export function DevCreator() {
    return(
        <section id="dev-creator-page" className = "sectionPage">
            <HelpButton heading = "Test Characters">
                <p>This page is for creating characters to test out Wrathspriter's saving/exporting formats as well as locations.</p>
                <br/>
                <p>Currently, characters are saved with IndexedDB, which should allow for easy access with ample space to save content.</p>
                <br/>
                <p>Characters are saved as a JSON entry in IndexedDB, following the format from character.ts</p>
                <br/>
                <a className = "button is-responsive" href = "https://https://github.com/Apexal/wrathspriter/issues/24" target="_blank" rel="noreferrer" >
                    GitHub Issue
                </a>
            </HelpButton>
            <header className = "container has-text-centered">
                <h1 className = "is-uppercase is-size-1 has-text-weight-bold">Development Character Creator</h1>
                <h2 className = "is-size-5">
                    Can you keep this page a secret?
                </h2>
                <div className = "field">
                    <p className = "control">
                        <input className = "input" type = "name" placeholder = "Name"></input>
                    </p>
                </div>
                <div className = "control">
                    <div className = "select">
                        <select>
                            <option selected>Major</option>
                            <option>Computer Science</option>
                            <option>Mathematics</option>
                            <option>English</option>
                            <option>Architecture</option>
                            <option>Management</option>
                            <option>Chemistry</option>
                            <option>Physics</option>
                            <option>Philosophy</option>
                        </select>
                    </div>
                </div>
                <div className = "control">
                    <div className = "select">
                        <select>
                            <option selected>Minor</option>
                            <option>Computer Science</option>
                            <option>Mathematics</option>
                            <option>English</option>
                            <option>Architecture</option>
                            <option>Management</option>
                            <option>Chemistry</option>
                            <option>Physics</option>
                            <option>Philosophy</option>
                        </select>
                    </div>
                </div>
            </header>
        </section>
    )
}