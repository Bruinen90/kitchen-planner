import React from 'react';

import {Link, NavLink} from 'react-router-dom';

import './MenuBar.css';

const MenuBar = (props) => {
    return(
        <div className="menuBar">
            <NavLink to="/" className="header menuLogo">Kitchen planner<span className="redDot">.</span></NavLink>
            <div className="menuItem" onClick={props.jakKorzystac}>Pierwsze kroki</div>
            <div className="menuItem">Zamawianie płyt i okuć meblowych</div>
            <div className="menuItem">FAQ</div>
            <div className="menuItem">Kontakt</div>
            <Link to="/projekt/parametry-kuchni" className="newProjectButton">
                {props.inProgress ? "Edytuj" : "Nowy"} Projekt
            </Link>
        </div>
    )
};

export default MenuBar;
