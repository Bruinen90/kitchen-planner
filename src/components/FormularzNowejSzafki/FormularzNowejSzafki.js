import React, {Component} from 'react';
import FormularzSzuflad from './FormularzSzuflad/FormularzSzuflad';

import * as actionTypes from '../../store/actions/actionTypes';

import {connect} from 'react-redux';

class FormularzNowejSzafki extends Component {
    componentDidUpdate () {
        this.props.onCabinetFormUpdate();
    }

    render () {
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
                    min="200"
                    max="900"
                    onChange={this.props.changeWidth}
                    value={this.props.szerokoscSzafki}
                />
                <br />
                <input
                    type="button"
                    disabled={!this.props.canAddCabinet}
                    value="Dodaj szafkę"
                    onClick={this.props.canAddCabinet? this.props.clickDodaj : null}
                />
                <div className={this.props.canAddCabinet ? "szafkaPrawidlowa" : "szafkaNieprawidlowa" }>
                    Wybierz rodzaj szafki oraz podaj prawidłowe wysokości frontów
                </div>

            </form>
        )
    }

}

const mapStateToProps = state => {
    return {
        canAddCabinet: state.cabinetValid,
        szerokoscSzafki: state.cabinets[0].szerokosc,

    }
}

const mapDispatchToProps = dispatch => {
    return {
            onCabinetFormUpdate: () => dispatch({type: actionTypes.CHECK_CABINET}),
            onHoverAddCabinet: () => dispatch({type: actionTypes.HOVER_ADD_CABINET}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularzNowejSzafki);
