import React, {useEffect, useState} from "react";

export type MatrixEntryValueInputProps = {
    value:number;
    onNumberChange:(newValue:number)=>void;
}
export function MatrixEntryValueInput(props:MatrixEntryValueInputProps){
    const [entryVal, setEntryVal] = useState("0");

    useEffect(() => {
        setEntryVal(String(props.value));
    },[props.value]);

    function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEntryVal(e.target.value);
    }

    const handleKeyDown = (event:React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.onNumberChange(parseFloat(entryVal) as number);
        }
    };

    return (
        <input
            value={entryVal} // ...force the input's value to match the state variable...
            onChange={onValueChange} // ... and update the state variable on any edits!
            onKeyDown={handleKeyDown}
        />
    )
}

