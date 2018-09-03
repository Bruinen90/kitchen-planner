import React from 'react';
import {Link} from 'react-router-dom';

const SaveAndContinueButton = (props) => (
    <Link onClick={props.onClick} to={props.href}>
        <div className="saveAndContinueLink">Zapisz i przejdź dalej</div>
    </Link>
);
export default SaveAndContinueButton;
