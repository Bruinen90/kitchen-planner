import React from 'react';

const FormularzNowejSzafki = (props) => {
    return (
        <form className="nowaSzafkaFormularz">
        <p>Wybierz rodzaj szafki:<br/>
            <input type="radio" name="typySzafek" value="jedneDrzwi" onChange={props.changeType} required/>Szafka z pojedynczymi drzwiczkami<br />
            <input type="radio" name="typySzafek" value="szufladaDrzwi" onClick={props.changeType} required/>Szafka z niską szufladą i drzwiczkami<br />
            <input type="radio" name="typySzafek" value="szuflady" onChange={props.changeType} required/>Szafka z szufladami. Liczba szuflad: <input type="number" min="2" max="4" onChange={props.changeDrawerCount} value={props.ilosc} required/><br />
        </p>
        Szerokość szafki (mm): <input type="text" required onChange={props.changeWidth}/><br />
        <input type="button" value="Dodaj szafkę" onClick={props.clickDodaj}/>
        {/* Liczba szuflad: <input type="text" placeholder="0 dla szafki z drzwiczkami"/><br />
        Liczba drzwi: <input type="text" placeholder="0 dla szafki z szufladami"/><br /> */}

        </form>
    )
}

export default FormularzNowejSzafki;
