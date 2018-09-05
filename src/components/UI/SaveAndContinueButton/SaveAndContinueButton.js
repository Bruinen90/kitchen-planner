import React from 'react';
import {Link} from 'react-router-dom';

const SaveAndContinueButton = (props) => (
    props.active ?
        <Link onClick={props.resetErrors} to={props.href}>
            <div className="saveAndContinueLink">Zapisz i przejdź dalej</div>
        </Link>
        :
        <div onClick={props.showErrors} className="saveAndContinueLink blocked">Zapisz i przejdź dalej</div>


);
export default SaveAndContinueButton;
