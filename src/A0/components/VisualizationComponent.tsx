import {TransformVisSceneController} from "../controllers/TransformVisSceneController";
import React from "react";
import {AGLRenderWindow, ASceneController, AThreeJSContextComponent} from "../../anigraph";
import {AppState} from "../AppState";

type VisualizationComponentProps = {
    renderWindow:AGLRenderWindow;
    name:string;
    children?: React.ReactNode;
}

export function VisualizationComponent(props: VisualizationComponentProps) {
    return (
            <div className={"card"}>
                <h3 className={"card-header"}>
                    {props.name}
                </h3>
                <div className={"card-body"}>
                    <AThreeJSContextComponent renderWindow={props.renderWindow}/>
                </div>
                <div className={"card-body scene-description"}>
                    {props.children}
                </div>
            </div>
    )
}
