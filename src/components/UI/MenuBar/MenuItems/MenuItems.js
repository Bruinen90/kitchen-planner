import React from 'react';
import Auxx from '../../../../Auxx';

import {Link} from 'react-router-dom';

const MenuItems = (props) => (
    <Auxx>
        <div className="menuItem" onClick={props.clickMenuItem}>Pierwsze kroki</div>
        <div className="menuItem" onClick={props.clickMenuItem}>Zamawianie płyt i okuć meblowych</div>
        <div className="menuItem" onClick={props.clickMenuItem}>FAQ</div>
        <div className="menuItem" onClick={props.clickMenuItem}>Kontakt</div>
        <Link to="/projekt/parametry-kuchni" className="newProjectButton" onClick={props.clickMenuItem}>
            {props.inProgress ? "Edytuj" : "Nowy"} Projekt
        </Link>
    </Auxx>
);
export default MenuItems;
