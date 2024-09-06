import {A0SceneModel} from "../A0SceneModel";
import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {AppState} from "../AppState";
import Slider from '@mui/material/Slider';
import {Matrix2x2EntryComponent} from "./ReactInteractiveMatrix";
import {Mat3, V2} from "../../anigraph";

type GUIComponentProps = {
    appState:AppState;
    children?: React.ReactNode;
}




export function Mat2GUIComponent(props: GUIComponentProps) {
    const [, setState] = useState(uuidv4());
    let axesModel = getAxisModel();

    useEffect(() => {
        (async () => {
            props.appState.addComponentUpdateListener(() => {
                setState(uuidv4());
            })
        })();
    }, [props.appState]);

    function getAxisModel() {
        return (props.appState.sceneModel as A0SceneModel).axesModel;
    }

    const setMatrix = (m:Mat3)=>{
        axesModel.xUnit = V2(m.m00, m.m10);
        axesModel.yUnit = V2(m.m01, m.m11);
        props.appState.updateComponents();
    }

    function GUI() {
        if (!axesModel) {
            return ("Undefined");
        } else {
            let matrix = new Mat3(
                axesModel.xUnit.x, axesModel.yUnit.x, 0.0,
                axesModel.xUnit.y, axesModel.yUnit.y, 0.0,
                0.0, 0.0, 1.0,
            )
            return (
                <React.Fragment>
                    <div className={"row"}>
                        <h2>2x2 Matrix:</h2>
                    </div>
                    <Matrix2x2EntryComponent matrix={matrix} setMatrix={setMatrix}>
                    </Matrix2x2EntryComponent>
                </React.Fragment>
            )
        }
    }

    const cardstyle = {
        display: "flex",
        padding: "5px",
        height: "100%"
    }
    return (
        <div className={`col-8`}>
            <div className={"card"} style={cardstyle}>
                {GUI()}
                {props.children}
            </div>
        </div>
    )
}
