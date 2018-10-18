import React from 'react';
import MenuItems from './MenuItems/MenuItems';
import Auxx from '../../../Auxx';

import {Link} from 'react-router-dom';

import './MenuBar.css';

const MenuBar = (props) => {
    return(
        <Auxx>
            <div className="menuBar">
                <Link to="/" className="header menuLogo" onClick={props.hideMenu}>Kitchen planner<span className="redDot">.</span></Link>
                <div className="desktopMenuItems">
                <MenuItems
                    editInProgress = {props.editInProgress}
                />
                </div>
                <div className="mobileMenuToggler" onClick={props.clickMenu}>
                    Menu
                    <div className={props.showMobileMenu ? "change hamburgerIcon" : "hamburgerIcon"}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
            </div>
            <div className="mobileMenuWrapper" style={{top: props.showMobileMenu ? '0px' : '-500px'}}>
                <MenuItems
                    editInProgress = {props.editInProgress}
                    clickMenuItem = {props.hideMenu}
                />
            </div>
        </Auxx>
    )
};

export default MenuBar;
