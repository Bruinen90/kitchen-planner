import React from 'react';
import './FormularzSprzetow.css';

const FormularzSprzetu = (props) => {
    let hide = ""
    if(!props.visible) {
        hide = "hideInput"
    }
    return(
        <div className={hide}>
            <label className={props.ifDisabled ? "nieaktywny" : null}>
                <input
                    type="checkbox"
                    checked={props.checked}
                    onChange={props.clicked}
                    disabled={props.ifDisabled}
                />
                {props.pelnaNazwaSzafki}
            </label>
        </div>
    );
}
export default FormularzSprzetu;
