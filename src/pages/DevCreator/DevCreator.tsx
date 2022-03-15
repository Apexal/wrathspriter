import { Action } from "history";
import { encode } from "querystring";
import React, { useState } from "react";
import HelpButton from "../../components/HelpButton";
import { emptyCharacter } from "../../constants";
import { SoundEffect } from "../../interfaces/action";
import { Character } from "../../interfaces/character";
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
    let major: Programs = Programs.None;
    let minor: Programs = Programs.None;

    let character: Character = emptyCharacter;

    function createCharacter(event: React.SyntheticEvent) {
        event.preventDefault();

        let actions: Action[] = [];

        character.name = name;
        character.major = {
            id: Programs[major],
            name: Programs[major],
            backstory: "",
            actionTemplates: emptyCharacter.actions
        }

        const jsonCharacter: string = JSON.stringify(character);

        console.log(jsonCharacter);

        let a = document.createElement('a');
        let blob = new Blob([jsonCharacter], {'type': "text/json"});
        a.href = window.URL.createObjectURL(blob);
        a.download = character.name + ".wrath";
        a.click();
    }

    function setMajor(event: React.ChangeEvent<HTMLSelectElement>) {
        // Convert from string to enum
        let id: number = -1;
        if (event.target.selectedOptions[0] != undefined)
            id = Number(event.target.selectedOptions[0].dataset.id);

        // Update the major field
        major = id as Programs;
    }

    function setMinor(event: React.ChangeEvent<HTMLSelectElement>) {
        let id: number = -1;
        if (event.target.selectedOptions[0] != undefined)
            id = Number(event.target.selectedOptions[0].dataset.id);

        // Update the minor field
        minor = id as Programs;
    }

    function setSounds(event: React.ChangeEvent<HTMLInputElement>, area: SoundEffect[]) {
        if (event.target.files == null) return;

        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].type != "audio/mpeg") { showUploadFail(); continue; }
            else {
                // Read the file
                let name = event.target.files[i].name;

                let reader: FileReader = new FileReader();
                reader.addEventListener("load", () => {

                    if (!(reader.result instanceof ArrayBuffer)) return;
                    let base64: string = arrayBufferToBase64(reader.result);

                    area.push({
                        name: name,
                        base64EncodedAudio: base64
                    });
                })
                reader.readAsArrayBuffer(event.target.files[i]);
            }
        }

        console.log(character);
    }

    // Converts an array buffer into base64
    function arrayBufferToBase64(buffer: ArrayBuffer) {
        return btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    }

    function showUploadFail() {
        console.log("the upload failed");
    }

    return (
        <section id="dev-creator-page" className="sectionPage">
            <HelpButton heading="Test Characters">
                <p>This page is for creating characters to test out Wrathspriter's saving/exporting formats as well as locations.</p>
                <br />
                <p>Currently, characters are saved with IndexedDB, which should allow for easy access with ample space to save content.</p>
                <br />
                <p>Characters are saved as a JSON entry in IndexedDB, following the format from character.ts</p>
                <br />
                <a className="button is-responsive" href="https://https://github.com/Apexal/wrathspriter/issues/24" target="_blank" rel="noreferrer" >
                    GitHub Issue
                </a>
            </HelpButton>
            <header className="container has-text-centered">
                <h1 className="is-uppercase is-size-1 has-text-weight-bold">Development Character Creator</h1>
                <h2 className="is-size-5">
                    Can you keep this page a secret?
                </h2>
                <form onSubmit={(e) => { createCharacter(e); }}>
                    <div className="field">
                        <div className="control">
                            <input className="input" type="name" placeholder="Name" onChange={(e) => { setName(e.target.value); }}></input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <div className="select">
                                <select onChange={(e) => { setMajor(e); }}>
                                    <option selected data-id="-1">Major</option>
                                    <option data-id="0">Computer Science</option>
                                    <option data-id="1">Mathematics</option>
                                    <option data-id="2">English</option>
                                    <option data-id="3">Management</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <div className="select">
                                <select onChange={(e) => { setMinor(e); }}>
                                    <option selected data-id="-1">Major</option>
                                    <option data-id="0">Computer Science</option>
                                    <option data-id="1">Mathematics</option>
                                    <option data-id="2">English</option>
                                    <option data-id="3">Management</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="file has-name is-right">
                        <label className="file-label">
                            <input onChange = { (e) => { setSounds(e, character.stateSoundEffects.hurt); } } className="file-input" type="file" name="hurt sound" accept = "audio/mpeg" multiple/>
                                <span className="file-name">
                                    Hurt Sound
                                </span>
                                <span className="file-cta">
                                    <span className="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                        </label>
                    </div>
                    <div className="file has-name is-right">
                        <label className="file-label">
                            <input onChange = { (e) => { setSounds(e, character.stateSoundEffects.enter); } } className="file-input" type="file" name="enter sound" accept = "audio/mpeg" multiple/>
                                <span className="file-name">
                                    Enter Sound
                                </span>
                                <span className="file-cta">
                                    <span className="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                        </label>
                    </div>
                    <div className="file has-name is-right">
                        <label className="file-label">
                            <input onChange = { (e) => { setSounds(e, character.stateSoundEffects.win); } } className="file-input" type="file" name="win sound" accept = "audio/mpeg" multiple/>
                                <span className="file-name">
                                    Win Sound
                                </span>
                                <span className="file-cta">
                                    <span className="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                        </label>
                    </div>
                    <div className="file has-name is-right">
                        <label className="file-label">
                            <input onChange = { (e) => { setSounds(e, character.stateSoundEffects.lose); } } className="file-input" type="file" name="lose sound" accept = "audio/mpeg" multiple/>
                                <span className="file-name">
                                    Lose Sound
                                </span>
                                <span className="file-cta">
                                    <span className="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                        </label>
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                        <p className="control">
                            <button className="button is-primary" type="submit" >
                                Submit
                            </button>
                        </p>
                    </div>
                </form>
            </header>
        </section>
    )
}