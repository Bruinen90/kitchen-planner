import React from 'react';
import './ParamInput.css';

const ParamsInput = (props) => {
    let showedError = "";
    if(!props.valid) {
      showedError = props.error;
    }
    return(
        <div className="paramInput">
        {props.paramDescription}
            <input
                type="number"
                onChange={props.changeInputValue}
                onFocus={props.focusParamInput}
                value={props.value}
                autoFocus={props.autofocus}
                placeholder={props.placeholder}
            />
            {props.showErrors ?
                <div className="invalidValue">{showedError}</div> : ""}
        </div>
    )
}

export default ParamsInput;
