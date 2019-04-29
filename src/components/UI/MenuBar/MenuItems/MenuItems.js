import React from 'react';
import './MenuItems.css'

import {Link} from 'react-router-dom';

const MenuItems = (props) => {
    const links = [
        {
            target: "pierwsze-kroki",
            description: "Pierwsze kroki",
        },
        {
            target: "zamawianie",
            description: "Zamawianie płyt i okuć meblowych",
        },
        {
            target: "faq",
            description: "FAQ",
        },
        {
            target: "kontakt",
            description: "Kontakt",
        },
        {
            target: "projekt/parametry-kuchni",
            description: "Nowy projekt",
            button: true,
        },
    ];
    const linksOutput = links.map(link => {
        return(
            <Link
                to={'/'+link.target}
                className={link.button ? "newProjectButton" : "menuItem" }
                key={link.target}
            >
                {link.description}
            </Link>
        )
    })
    return(
    <React.Fragment>
        {linksOutput}
    </React.Fragment>
)};
export default MenuItems;
