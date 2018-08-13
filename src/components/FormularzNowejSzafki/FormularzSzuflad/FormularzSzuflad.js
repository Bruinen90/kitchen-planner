import React from 'react';
import PoleSzuflady from './PoleSzuflady/PoleSzuflady';

const FormularzSzuflad = (props) => {
    return(
        <p className="formularzSzuflad">
            Wysokość szuflad:
            <PoleSzuflady
                wysokosc={props.wysokoscSzuflady}
            />
        </p>
    );
}
export default FormularzSzuflad;
