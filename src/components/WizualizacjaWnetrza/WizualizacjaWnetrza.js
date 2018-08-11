import React from 'react';

const WizualizacjaWnetrze = (props) => {
    const drowersArray = [];
    if (props.rodzaj === "szuflady") {
        for (let i=0; i<props.ilosc; i++) {
            drowersArray.push(<div className="szuflada"></div>);
        }
    }

    if (props.rodzaj === "szufladaDrzwi") {
            drowersArray.push(<div className="szuflada malaSzuflada"></div>);
            drowersArray.push(<div className="szuflada"></div>);
    }

    if (props.rodzaj === "jedneDrzwi") {
            drowersArray.push(<div className="szuflada"></div>);
    }

    return(
        drowersArray
        // <div className="szuflada"></div>
    )
}

export default WizualizacjaWnetrze;
