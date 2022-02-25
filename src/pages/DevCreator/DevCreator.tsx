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
                    Github Issue
                </a>
            </HelpButton>
            <header className = "container has-text-centered">
                <h1 className = "is-uppercase is-size-1">Development Character Creator</h1>
            </header>
        </section>
    )
}