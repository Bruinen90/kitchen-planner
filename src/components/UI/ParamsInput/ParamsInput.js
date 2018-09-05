import React from 'react';
const ParamsInput = (props) => {
    let showedError = "";
    if(props.typedValue < props.minValue || props.typedValue > props.maxValue) {
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
            />
            {props.showErrors ?
                <div className="errorMessage">{showedError}</div> : ""}
        </div>
    )
}

export default ParamsInput;
