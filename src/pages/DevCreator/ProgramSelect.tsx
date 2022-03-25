import React from "react";
import { SchoolProgram } from "../../interfaces";
import { Programs, DevProps } from "./DevCreator";
import { emptyCharacter } from "../../constants";


export function ProgramSelect(props: {fieldName: string, props: DevProps, onChange : number}) {
    
    let programList = [];

    function setValue(event: React.ChangeEvent<HTMLSelectElement>) {
        // Convert from string to enum
        let id: number = -1;
        if (event.target.selectedOptions[0] != undefined)
            id = Number(event.target.selectedOptions[0].dataset.id);
            
            let newProgram : SchoolProgram = {
                id: Programs[id as Programs],
                name: Programs[id as Programs],
                backstory: "generated by the development character creator",
                actionTemplates: emptyCharacter.actions
            }

        if (props.onChange == 0) 
            props.props.character.major = newProgram;
        else
            props.props.character.minor = newProgram;

    }

    programList.push(
        <option data-id = "-1">{props.fieldName}</option>
    )

    for (let i = 0; i < 4; i++) {
        programList.push(
            <option data-id={i}>{Programs[i as Programs]}</option>
        );
    }

    return (
        <div className="field">
            <div className="control">
                <div className="select">
                    <select defaultValue={0} onChange = {(e) => setValue(e) }>
                        {programList}
                   </select>
                </div>
            </div>
        </div>
    );
}