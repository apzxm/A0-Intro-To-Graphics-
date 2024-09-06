import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {A0InputSceneController} from "./controllers/A0InputSceneController";
import {A0TransformedSceneController} from "./controllers/A0TransformedSceneController";
import React, {useEffect, useState} from "react";
import {AppState} from "./AppState";
import {Layout} from "./style";
import {VisualizationComponent} from "./components/VisualizationComponent";
import {Mat2GUIComponent} from "./components/Mat2GUIComponent";
// import {Mat3GUIComponent} from "./components/Mat3GUIComponent";
import {A0TransformedSceneControllerAffine} from "./controllers/affine/A0TransformedSceneControllerAffine";
import {A0InputSceneControllerAffine} from "./controllers/affine/A0InputSceneControllerAffine";
import {AppConfig, TransformationType} from "./AppConfig";

// create and initialize app state
const appState = new AppState();

let appName = "Assignment 0: Visualizing 2D Linear Transforms";
let BlueArrowText = ""

switch (AppConfig.TransformType){
    case TransformationType.Linear:
        appState.createMainRenderWindow(A0InputSceneController);
        appState.createSecondRenderWindow(A0TransformedSceneController)
        BlueArrowText = "There is also a blue vector that you can control. The left canvas will show the blue vector before transformation by M, and the right canvas will show it after."
        break;
    // case TransformationType.Affine:
    //     appName = "Assignment 0b: Visualizing 2D *Affine* Transforms";
    //     appState.createMainRenderWindow(A0InputSceneControllerAffine);
    //     appState.createSecondRenderWindow(A0TransformedSceneControllerAffine)
    //     BlueArrowText = "The blue vector controls the third column of our affine matrix, which represents translation."
    //     break;
    default:
        appState.createMainRenderWindow(A0InputSceneController);
        appState.createSecondRenderWindow(A0TransformedSceneController)
        break;
}




const initConfirmation = appState.confirmInitialized();


function App() {
    useEffect(() => {
        initConfirmation.then(()=> {
                console.log("Scene Initialized.");
            }
        );
    }, []);


    function getGUI(){
        switch (AppConfig.TransformType){
            case TransformationType.Linear:
                return (
                    <Mat2GUIComponent appState={appState}>
                    </Mat2GUIComponent>
                )
            // case TransformationType.Affine:
            //     return (
            //         <Mat3GUIComponent appState={appState}>
            //         </Mat3GUIComponent>
            //     )
            default:
                return (
                    <Mat2GUIComponent appState={appState}>
                    </Mat2GUIComponent>
                )
        }
    }




    return (
        <div>
            <Layout>
                <div className={"container-fluid"} id={"transformationviewer-main"}>
                    <h2>{appName}</h2>
                    <p>Below is an example of what a completed Assignment 0 looks like.</p>
                    <p>You will see two windows: the left window represents a 2D scene, and the right represents what we would get if we transformed every point in that scene by some matrix M.
                    We can control the matrix M in three ways. The first is by modifying its entries directly in the grid of boxes below. The second is by editing individual entries with their corresponding sliders. And the third is by directly setting column vectors in the canvas. To do this, click in one of the two rendered canvases while holding down the "x" or "y" key on your keyboard. The "x" key will control the first column of the matrix, and the "y" key will control the second column.</p>

                    <p>The red vector represents the unit x vector *after* the transformation, and the green vector represents the unit y vector after transformation. {BlueArrowText}</p>
                    <div className={"row visualization-row"}>
                        <div className={"col-5 visualization-component-container"}>
                            <VisualizationComponent renderWindow={appState.mainRenderWindow} name={"Input Scene"}>
                            </VisualizationComponent>
                        </div>

                        <div className={"col-5 visualization-component-container"}>
                            <VisualizationComponent renderWindow={appState.secondRenderWindow} name={"Transformed Scene"}>
                            </VisualizationComponent>
                        </div>

                    </div>
                    <div className={"row"}>
                        {getGUI()}
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default App;
