import React from 'react';

const WysokoscSzuflady = (props) => (
        <input
            type="number"
            value={props.iloscSzuflad > 1 ? props.wysokosc : null}
            onChange = {props.zmianaWysokosci}
            onFocus = {props.aktywnaSzuflada}
            onBlur=  {props.nieaktywnaSzuflada}
            placeholder="Szuflada (mm)"
        />
);
export default WysokoscSzuflady;
