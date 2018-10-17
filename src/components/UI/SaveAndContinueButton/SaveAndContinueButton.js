import React from 'react';
import {Link} from 'react-router-dom';
import './SaveAndContinueButton.css';

const SaveAndContinueButton = (props) => (
    props.back && window.innerWidth<951 ?
    <Link to={props.href}>
        <div className="goBackButton">
            <ion-icon name="arrow-round-back">
            </ion-icon>
        </div>
    </Link>
    :
    props.active ?
        <Link onClick={props.resetErrors} to={props.href}>
            <div className="saveAndContinueLink animation-pulse">{window.innerWidth>950?
                "Zapisz i przejdź dalej" :
                <ion-icon name="arrow-round-forward">
                </ion-icon>}
            </div>
        </Link>
        :
        <div onClick={props.showErrors} className="saveAndContinueLink blocked">
            {window.innerWidth>950?
                "Zapisz i przejdź dalej" :
                <ion-icon name="arrow-round-forward">
                </ion-icon>}
        </div>


);
export default SaveAndContinueButton;
