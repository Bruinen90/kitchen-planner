import React from 'react';

const WysokoscSzuflady = (props) => (
        <input
            type="number"
            value={props.wysokosc}
            onChange = {props.zmianaWysokosci}
            onFocus = {props.aktywnaSzuflada}
            onBlur=  {props.nieaktywnaSzuflada}
            placeholder="Szuflada (mm)"
            className="poleFormularzaSzuflad poleWysokosc"
            disabled={props.zablokowana}
        />
);
export default WysokoscSzuflady;
