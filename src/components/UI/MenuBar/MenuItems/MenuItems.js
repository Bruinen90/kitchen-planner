import React from 'react';
import Auxx from '../../../../Auxx';

import {Link} from 'react-router-dom';

const MenuItems = (props) => (
    <Auxx>
        <div className="menuItem" onClick={props.jakKorzystac}>Pierwsze kroki</div>
        <div className="menuItem">Zamawianie płyt i okuć meblowych</div>
        <div className="menuItem">FAQ</div>
        <div className="menuItem">Kontakt</div>
        <Link to="/projekt/parametry-kuchni" className="newProjectButton">
            {props.inProgress ? "Edytuj" : "Nowy"} Projekt
        </Link>
    </Auxx>
);
export default MenuItems;
