import React from 'react';

const SizeInput = (props) => {
    return(
        <div>
            <input
            type="text"
            placeholder="Podaj szerokość kuchni w milimetrach, np. 2861"
            className="sizeInput"
            onKeyPress={props.enterSize}
            />
        </div>
    )
}

export default SizeInput;
