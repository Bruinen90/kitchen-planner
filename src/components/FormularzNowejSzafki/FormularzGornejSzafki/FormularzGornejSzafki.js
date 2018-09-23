import React from 'react';
import FormularzDrzwi from '../FormularzDrzwi/FormularzDrzwi';

const FormularzGornejSzafki = (props) => (
    <div className="wrapper">
        <b>Parametry szafki górnej</b><br/>
        <FormularzDrzwi
            upperCabinets={true}
        />
    </div>
);
export default FormularzGornejSzafki;
