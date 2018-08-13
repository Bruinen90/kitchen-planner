import React from 'react';
import FormularzSzuflad from './FormularzSzuflad/FormularzSzuflad';

const FormularzNowejSzafki = (props) => {
    return (
        <form className="nowaSzafkaFormularz">
        <div className="formularzNowejSzafki"><b>Wybierz rodzaj szafki:</b><br/>
            <input
                type="radio"
                name="typySzafek"
                value="jedneDrzwi"
                onChange={props.changeType}
                required
            />
            Szafka z pojedynczymi drzwiczkami
            <br />
            <input
            type="radio"
                name="typySzafek"
                value="szufladaDrzwi"
                onClick={props.changeType}
                required
            />
            Szafka z niską szufladą i drzwiczkami
            <br />
            <input
                type="radio"
                name="typySzafek"
                value="szuflady"
                onChange={props.changeType}
                required
            />
            Szafka z szufladami. Liczba szuflad:
            <input
                type="number"
                min="2"
                max="4"
                onChange={props.changeDrawerCount}
                value={props.ilosc}
                required
            />
            <FormularzSzuflad
                wysokoscSzuflady={props.wysokoscSzuflady}
            />
            <br />
        </div>
        Szerokość szafki (mm): <input type="text" required onChange={props.changeWidth}/><br />
        <input type="button" value="Dodaj szafkę" onClick={props.clickDodaj}/>


        </form>
    )
}

export default FormularzNowejSzafki;