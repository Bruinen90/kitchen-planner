import React from 'react';

import {Link} from 'react-router-dom';

const MenuItems = (props) => (
    <React.Fragment>
        <div className="menuItem" onClick={props.clickMenuItem}>Pierwsze kroki</div>
        <div className="menuItem" onClick={props.clickMenuItem}>Zamawianie płyt i okuć meblowych</div>
        <div className="menuItem" onClick={props.clickMenuItem}>FAQ</div>
        <div className="menuItem" onClick={props.clickMenuItem}>Kontakt</div>
        <Link to="/projekt/parametry-kuchni" className="newProjectButton" onClick={props.clickMenuItem}>
            {props.inProgress ? "Edytuj" : "Nowy"} Projekt
        </Link>
    </React.Fragment>
);
export default MenuItems;
