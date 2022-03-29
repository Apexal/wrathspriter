import { CharacterPreview } from "../SavedCharactersPage/components/CharacterPreview/CharacterPreviews";
import { DevCreator } from "./DevCreator";
import { Character } from "../../interfaces/character";
import { DevProps } from "./DevCreator";


type DevPreviewPropTypes = {
    props: DevProps;
    animationName?: keyof Character["stateAnimations"];
}

export function DevPreview({props, animationName = "walk"}: DevPreviewPropTypes) {

    if (props.character.stateAnimations[animationName].length == 0) return (
        <p>nothing to show</p>
    );

    return (
        <CharacterPreview character = {props.character} animationName = {animationName}/>
    )
}