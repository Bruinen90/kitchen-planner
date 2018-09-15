import React from 'react';
import './FormularzSprzetow.css';

const FormularzSprzetu = (props) => {
    let hide = ""
    if(!props.visible) {
        hide = "hideInput"
    }
    return(
        <div className={hide}>
            <label>
                <input
                    type="checkbox"
                />
                {props.pelnaNazwaSzafki}
            </label>
        </div>
    );
}
export default FormularzSprzetu;
