import React, { useState } from "react";
import HelpButton from "../../components/HelpButton";
import { SchoolProgram } from "../../interfaces/program";

enum Programs {
    None = -1,
    ComputerScience = 0,
    Mathematics = 1,
    English = 2,
    Management = 3,
}


export function DevCreator() {

    const [name, setName] = useState("");
    let major : Programs = Programs.None;
    let minor : Programs = Programs.None;

    let minorInDanger

    function createCharacter(event : React.SyntheticEvent) {
        event.preventDefault();

        
    }

    function setMajor(event: React.ChangeEvent<HTMLSelectElement>) {
        // Convert from string to enum
        let id : number = -1;
        if (event.target.selectedOptions[0] != undefined)
            id = Number(event.target.selectedOptions[0].dataset.id);
        
        // Update the major field
        major = id as Programs;
    }

    function setMinor(event: React.ChangeEvent<HTMLSelectElement>) {
        let id : number = -1;
        if (event.target.selectedOptions[0] != undefined)
            id = Number(event.target.selectedOptions[0].dataset.id);

        // Update the minor field
        minor = id as Programs;
    }

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
                <form onSubmit = { (e) => { createCharacter(e); } }>
                    <div className = "field">
                        <div className = "control">
                            <input className = "input" type = "name" placeholder = "Name" onChange = {(e) => { setName(e.target.value); }}></input>
                        </div>
                    </div>
                    <div className = "field">
                        <div className = "control">
                            <div className = "select">
                                <select onChange = { (e) => { setMajor(e); } }>
                                    <option selected data-id = "-1">Major</option>
                                    <option data-id = "0">Computer Science</option>
                                    <option data-id = "1">Mathematics</option>
                                    <option data-id = "2">English</option>
                                    <option data-id = "3">Management</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className = "field">
                        <div className = "control">
                            <div className = "select">
                                <select onChange = { (e) => { setMinor(e); } }>
                                    <option selected data-id = "-1">Major</option>
                                    <option data-id = "0">Computer Science</option>
                                    <option data-id = "1">Mathematics</option>
                                    <option data-id = "2">English</option>
                                    <option data-id = "3">Management</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className = "field is-grouped is-grouped-centered">
                        <p className = "control">
                            <button className = "button is-primary" type = "submit" >
                                Submit
                            </button>
                        </p>
                    </div>
                </form>
            </header>
        </section>
    )
}