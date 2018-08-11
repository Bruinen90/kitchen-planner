import React from 'react';
import PoleSzuflady from './PoleSzuflady/PoleSzuflady';

const FormularzSzuflad = (props) => {
    return(
        <div class="formularzSzuflad">
            Wysokość szuflad:
            <PoleSzuflady
                wysokosc={props.wysokoscSzuflady}
            />
        </div>
    );
}
export default FormularzSzuflad;
