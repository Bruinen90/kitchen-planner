import React from 'react';
import { Link } from 'react-router-dom';

import lightbulb from '../../img/lightbulb.svg';

const WIP = (props) => {
    return(
        <div className="WIP__container">
            <h2 className="WIP__header">
                Przepraszamy, <br /> strona w budowie
            </h2>
            <div className="WIP__lightbulbCont">
                <img src={lightbulb} alt="" className="WIP__lightbulb"/>
            </div>
            <div>
                <Link to="projekt/parametry-kuchni" className="WIP__link">Przejdź do kreatora</Link>
            </div>
        </div>
    );
};

export default WIP;
