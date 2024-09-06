import Slider from '@mui/material/Slider';
import React, {useEffect, useState} from "react";

function eventWrapper(f: (v: number) => void) {
    function wrapped(event: Event, newValue: number | number[]) {
        return f(newValue as number);
    }

    return wrapped;
}

const marks = [
    {
        value: -1,
        label: '-1',
    },
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
];

export type MatrixEntrySliderProps = {
    label?: string;
    value: number;
    onValueChange: (newValue: number) => void;
}

export function MatrixEntrySlider(props: MatrixEntrySliderProps) {
    return (
        <div className={'col-12 matrixentryslider'}>
            <div className={'row'}>
                {`${props.value}`}
            </div>
            <div className={'row'}>
                <Slider
                    value={props.value}
                    onChange={eventWrapper(props.onValueChange)}
                    marks={marks}
                    min={-3}
                    max={3}
                    step={0.001}
                />
            </div>
        </div>
    )
}
