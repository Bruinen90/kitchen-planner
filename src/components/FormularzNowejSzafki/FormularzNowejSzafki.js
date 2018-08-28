import React, {Component} from 'react';
import FormularzSzuflad from './FormularzSzuflad/FormularzSzuflad';

import * as actionTypes from '../../store/actions/actionTypes';

import {connect} from 'react-redux';

class FormularzNowejSzafki extends Component {
    componentDidUpdate () {
        this.props.onCabinetFormUpdate();
    }

    render () {
        let errorsArray = null;
        switch(this.props.errorType) {
            case("noCabinetType"):
                errorsArray = "Wybierz rodzaj szafki";
                break;
            case("tooWide"):
                errorsArray = "Szafka jest za szeroka. Maksymalna szerokość szafki wynosi 900mm";
                break;
            case("tooNarrow"):
                errorsArray = "Szafka jest za wąska. Minimalna szerokość szafki wynosi 300mm";
                break;
            case("tooHeight"):
                errorsArray = "Suma wysokości frontów i szczelin jest większa niż wysokość szafki. Zmniejsz wysokość frontów";
                break;
            case("tooLow"):
                errorsArray = "Podane wysokości frontów nie wypełniają całkowicie wysokości szafki. Zwiększ wysokość frontów";
                break;
            case("tooHeightOneDrawer"):
                errorsArray = "Wysokość pozostałego frontu drzwi nie może być mniejsza niż 100mm";
                break;
            case("tooLowOneDrawer"):
                errorsArray = "Wysokość frontu szuflady nie może być mniejsza niż 100mm";
                break;
        }

        return (
            <form className="nowaSzafkaFormularz">
            <div className="formularzNowejSzafki"><b>Wybierz rodzaj szafki:</b><br/>
                <input
                    type="radio"
                    name="typySzafek"
                    value="jedneDrzwi"
                    onChange={this.props.changeType}
                    required
                />
                Szafka z pojedynczymi drzwiczkami
                <br />
                <input
                type="radio"
                    name="typySzafek"
                    value="szufladaDrzwi"
                    onClick={this.props.changeType}
                    required
                />
                Szafka z niską szufladą i drzwiczkami
                <br />
                <input
                    type="radio"
                    name="typySzafek"
                    value="szuflady"
                    onChange={this.props.changeType}
                    required
                />
                Szafka z szufladami
                <FormularzSzuflad
                    wysokoscSzuflady={this.props.wysokoscSzuflady}
                    changeDrawerCount = {this.props.changeDrawerCount}
                    ilosc={this.props.ilosc}
                />
                <br />
            </div>
            Szerokość szafki (mm):
                <input
                    type="number"
                    min="300"
                    max="900"
                    onChange={this.props.changeWidth}
                    value={this.props.szerokoscSzafki}
                />
                <br />
                <input
                    className="addCabinetButton"
                    type="button"
                    disabled={!this.props.canAddCabinet}
                    value="Dodaj szafkę"
                    onClick={this.props.canAddCabinet? this.props.clickDodaj : null}
                />
                <div className={this.props.canAddCabinet ? "szafkaPrawidlowa" : "szafkaNieprawidlowa" }>
                <b>Błąd</b><br/>
                    {errorsArray}
                </div>

            </form>
        )
    }

}

const mapStateToProps = state => {
    return {
        canAddCabinet: state.cabinetValid,
        szerokoscSzafki: state.cabinetWidth,
        errorType: state.cabinetError,

    }
}

const mapDispatchToProps = dispatch => {
    return {
            onCabinetFormUpdate: () => dispatch({type: actionTypes.CHECK_CABINET}),
            onHoverAddCabinet: () => dispatch({type: actionTypes.HOVER_ADD_CABINET}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularzNowejSzafki);
