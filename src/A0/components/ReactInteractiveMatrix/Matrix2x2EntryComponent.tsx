import React, {useEffect, useState} from "react";
import {Mat3, Matrix} from "../../../anigraph"
import {MatrixEntryValueInput} from "./MatrixEntryValueInput"
import {MatrixEntrySlider} from "./MatrixEntrySlider";
import styled from "styled-components"


const SliderLayout = styled.div`
  .matrixsliderbox{
    border-style: solid;
  }
`;


type MatrixEntryComponentProps = {
    matrix:Mat3
    setMatrix:(m:Mat3)=>void;
    children?: React.ReactNode;
}

export function Matrix2x2EntryComponent(props:MatrixEntryComponentProps){

    let matrix = props.matrix;
    function setMatrix(m:Mat3){
        props.setMatrix(new Mat3(
                m.m00,m.m01,0.0,
                m.m10,m.m11,0.0,
                0.0,0.0,1.0
            )
        );
    }


    function change00(v:number){
        let mat = matrix.clone();
        mat.m00=v;
        setMatrix(mat);
    }
    function change01(v:number){
        let mat = matrix.clone();
        mat.m01=v;
        setMatrix(mat);
    }
    function change10(v:number){
        let mat = matrix.clone();
        mat.m10=v;
        setMatrix(mat);
    }
    function change11(v:number){
        let mat = matrix.clone();
        mat.m11=v;
        setMatrix(mat);
    }

    const valueinputrow = {
        display: "flex"
    }
    const sliderrow = {
        display: "flex",
        width:"90%",
        margin: "auto"
    }

    return (
        <div className={"matrix-entry-component"}>
            <div className={"row"}>
                <div style={valueinputrow}>
                    <MatrixEntryValueInput
                        value={matrix.m00} // ...force the input's value to match the state variable...
                        onNumberChange={change00}
                    />
                    <MatrixEntryValueInput
                        value={matrix.m01} // ...force the input's value to match the state variable...
                        onNumberChange={change01}
                    />
                </div>
                <div style={valueinputrow}>
                    <MatrixEntryValueInput
                        value={matrix.m10} // ...force the input's value to match the state variable...
                        onNumberChange={change10}
                    />
                    <MatrixEntryValueInput
                        value={matrix.m11} // ...force the input's value to match the state variable...
                        onNumberChange={change11}
                    />
                </div>
            </div>
            <hr></hr>
            <div className={"matrix-sliders"}>
                <div className={"row"}>
                    <h4>Entry Sliders:</h4>
                </div>
                <SliderLayout>
                <div className={"row"} style={sliderrow}>
                    <div className={"col-6 matrixsliderbox"}>
                        <MatrixEntrySlider label={"m00"} value={matrix.m00} onValueChange={change00}></MatrixEntrySlider>
                    </div>
                    <div className={"col-6 matrixsliderbox"}>
                        <MatrixEntrySlider label={"m01"} value={matrix.m01} onValueChange={change01}></MatrixEntrySlider>
                    </div>
                </div>
                <div className={"row"} style={sliderrow}>
                    <div className={"col-6 matrixsliderbox"}>
                        <MatrixEntrySlider label={"m10"} value={matrix.m10} onValueChange={change10}></MatrixEntrySlider>
                    </div>
                    <div className={"col-6 matrixsliderbox"}>
                        <MatrixEntrySlider label={"m11"} value={matrix.m11} onValueChange={change11}></MatrixEntrySlider>
                    </div>
                </div>
                </SliderLayout>
            </div>
            {props.children}
        </div>
    );
}

