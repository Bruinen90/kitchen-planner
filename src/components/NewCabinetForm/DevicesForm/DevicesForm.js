import React from 'react';
import './DevicesForm.css';

const DevicesForm = (props) => {
    let hide = ""
    if(!props.visible) {
        hide = "hideInput"
    }
    return(
        <div className={hide}>
            <label className={props.ifDisabled ? "nieaktywny checkboxLabel" : "checkboxLabel"}>
            <div className="checkboxSwitch">
                <input
                    type="checkbox"
                    checked={props.checked}
                    onChange={props.clicked}
                    disabled={props.ifDisabled}
                />
                <span className="slider"></span></div>
                {props.pelnaNazwaSzafki}
            </label>
        </div>
    );
}
export default DevicesForm;
