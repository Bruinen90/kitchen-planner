import React from 'react';

import {NavLink} from 'react-router-dom';

import './MenuBar.css';

const MenuBar = (props) => {
    return(
        <div className="menuBar">
            <NavLink to="/" className="header menuLogo">Kitchen planner<span className="redDot">.</span></NavLink>
            <div className="menuItem" onClick={props.jakKorzystac}>Pierwsze kroki</div>
            <div className="menuItem">Zamawianie płyt i okuć meblowych</div>
            <div className="menuItem">FAQ</div>
            <div className="menuItem">Kontakt</div>
            <NavLink to="/kreator" className="newProjectButton">
                {props.inProgress ? "Edytuj" : "Nowy"} Projekt
            </NavLink>
        </div>
    )
};

export default MenuBar;
