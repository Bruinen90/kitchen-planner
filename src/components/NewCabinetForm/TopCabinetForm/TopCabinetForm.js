import React from 'react';
import DoorsAndShelfsForm from '../DoorsAndShelfsForm/DoorsAndShelfsForm';

const TopCabinetForm = (props) => (
    <div className="wrapper">
        <b>Parametry szafki górnej</b><br/>
        <DoorsAndShelfsForm
            upperCabinets={true}
        />
    </div>
);
export default TopCabinetForm;
