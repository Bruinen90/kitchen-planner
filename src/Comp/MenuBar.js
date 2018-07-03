import React from 'react';

const MenuBar = (props) => {
    return(
        <div className="menuBar">
            <div className="menuItem" onClick={props.jakKorzystac}>Jak korzystać</div>
            <div className="menuItem">Zamawianie formatek (płyt)</div>
            <div className="menuItem">FAQ</div>
            <div className="menuItem">Kontakt</div>

        </div>
    )
};

export default MenuBar;
