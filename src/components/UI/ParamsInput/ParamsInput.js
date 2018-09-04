import React from 'react';
const ParamsInput = (props) => (
    <div className="paramInput">
    {props.paramDescription}
        <input
            type="number"
            onChange={props.changeInputValue}
            onFocus={props.focusParamInput}
            value={props.value}
            autoFocus={props.autofocus}
        />
    </div>
);
export default ParamsInput;
