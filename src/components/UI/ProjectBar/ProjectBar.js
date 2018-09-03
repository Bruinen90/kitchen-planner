import React from 'react';

import './ProjectBar.css';

import {NavLink} from 'react-router-dom';

const ProjectBar = (props) => (
    <div className="projectBar">
        <NavLink to="/projekt/parametry-kuchni" activeClassName="activeProjectStage"><div>Parametry kuchni</div></NavLink>
        <NavLink to="/projekt/kreator-szafki" activeClassName="activeProjectStage"><div>Kreator szafek</div></NavLink>
        <NavLink to="/projekt/lista-zakupow" activeClassName="activeProjectStage" disabled><div>Lista zakupów</div></NavLink>
    </div>
);
export default ProjectBar;
