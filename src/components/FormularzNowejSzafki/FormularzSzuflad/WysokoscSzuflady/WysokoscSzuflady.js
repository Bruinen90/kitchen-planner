import React from 'react';
const WysokoscSzuflady = (props) => (
    <div>
        <input
            type="number"
            value={props.wysokosc}
            onChange = {props.zmianaWysokosci}
            placeholder={props.iloscSzuflad > 1 ? "Szuflada numer "+props.numerSzuflady : null}
        />
    </div>
);
export default WysokoscSzuflady;
