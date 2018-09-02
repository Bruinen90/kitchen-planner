import React from 'react';
const ParamsInput = (props) => (
    <div className="paramInput">
    {props.paramDescription}
        <input
            type="number"
            onChange={props.changeInputValue}
        />
    </div>
);
export default ParamsInput;
