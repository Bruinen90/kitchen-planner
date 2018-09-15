import React, {Component} from 'react';
import FormularzSzuflad from './FormularzSzuflad/FormularzSzuflad';
import FormularzDrzwi from './FormularzDrzwi/FormularzDrzwi';
import FormularzSprzetu from './FormularzSprzetow/FormularzSprzetow';
import './FormularzNowejSzafki.css';

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
            case("tooWideCabinet"):
                if(this.props.kitchenCabinetsValid) {
                    errorsArray = "Kuchnia została prawidłowo wypełniona szafkami. Przejdź dalej, aby zobaczyć wyniki planowania";
                } else {
                    errorsArray = "Suma szerokości szafek będzie większa od szerokości kuchni pomniejszonej o minimalny zalecany luz 5mm. Zmniejsz szerokość szafek.";
                }
                break;
            default:
        }

        return (
            <div className="nowaSzafkaFormularz">
            <div className="formularzNowejSzafki"><b>Wybierz rodzaj szafki:</b><br/>
                <label>
                <input
                    type="radio"
                    name="typySzafek"
                    value="jedneDrzwi"
                    onChange={this.props.changeType}
                    required
                    checked={this.props.cabinetType === "jedneDrzwi"}
                />
                Szafka z drzwiczkami
                </label>
                <br />
                <label>
                <input
                type="radio"
                    name="typySzafek"
                    value="szufladaDrzwi"
                    onChange={this.props.changeType}
                    required
                    checked={this.props.cabinetType === "szufladaDrzwi"}
                />
                Szafka z niską szufladą i drzwiczkami
                </label>
                <br />
                <label>
                <input
                    type="radio"
                    name="typySzafek"
                    value="szuflady"
                    onChange={this.props.changeType}
                    required
                    checked={this.props.cabinetType === "szuflady"}
                />
                Szafka z szufladami
                </label>
                <br />
                <label>
                <input
                    type="radio"
                    name="typySzafek"
                    value="zmywarka"
                    onChange={this.props.changeType}
                    required
                    checked={this.props.cabinetType === "zmywarka"}
                />
                Zmywarka
                </label>
                <br />

                <FormularzSzuflad
                    wysokoscSzuflady={this.props.wysokoscSzuflady}
                    changeDrawerCount = {this.props.changeDrawerCount}
                    ilosc={this.props.ilosc}
                />
                <FormularzDrzwi
                />
                <FormularzSprzetu
                    visible={this.props.cabinetType === "jedneDrzwi"}
                    pelnaNazwaSzafki="Szafka ze zlewozmywakiem"
                    clicked={()=>this.props.toggleDevice("kitchenSink")}
                    checked={this.props.kitchenSink}
                    ifDisabled={this.props.hob}
                />
                <FormularzSprzetu
                    visible={this.props.cabinetType !== "zmywarka" && this.props.cabinetType !== ""}
                    pelnaNazwaSzafki="Szafka z płytą grzewczą"
                    clicked={()=>this.props.toggleDevice("hob")}
                    ifDisabled={this.props.kitchenSink}
                />
                <br />
            </div>
            Szerokość szafki (mm):
                <input
                    className="cabinetWidthInput"
                    type="number"
                    min="300"
                    max="900"
                    onChange={this.props.changeWidth}
                    value={this.props.szerokoscSzafki}
                />
                <input
                    type="button"
                    value="Dopasuj"
                    onClick={this.props.onClickFillWidth}
                    className="fillWidthButton"
                    disabled={!this.props.canFillCabinetWidth}
                />
                <br />
                {!this.props.editInProgress ?
                <div className="wrapper">
                <input
                    className="confirmCabinetButton green"
                    type="button"
                    disabled={!this.props.canAddCabinet}
                    value="Dodaj szafkę"
                    onClick={this.props.canAddCabinet? this.props.clickDodaj : null}
                />
                </div>
                 :
                <input
                    className="confirmCabinetButton blue"
                    type="button"
                    disabled={!this.props.canAddCabinet}
                    value="Zapisz zmiany"
                    onClick={this.props.onClickSaveCabinet}
                />}
                <div className={this.props.kitchenCabinetsValid ? "kitchenDone" : "szafkaNieprawidlowa"} style={this.props.canAddCabinet ? {opacity: "0"} : null}>
                    {errorsArray}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        canAddCabinet: !state.cabinetError,
        szerokoscSzafki: state.cabinetWidth,
        errorType: state.cabinetError,
        cabinetType: state.cabinetType,
        editInProgress: state.editInProgress,
        canFillCabinetWidth:
            (!state.editInProgress && state.leftSpace < 901 && state.leftSpace > 299)
            ||
            (state.editInProgress && state.leftSpace + state.editedCabinetWidth < 901)
        ,
        kitchenCabinetsValid: state.kitchenCabinetsValid,
        kitchenSink: state.kitchenSink,
        hob: state.hob,
    }
}

const mapDispatchToProps = dispatch => {
    return {
            onCabinetFormUpdate: () => dispatch({type: actionTypes.CHECK_CABINET}),
            onHoverAddCabinet: () => dispatch({type: actionTypes.HOVER_ADD_CABINET}),
            onClickSaveCabinet: () => dispatch({type: actionTypes.SAVE_CABINET}),
            onClickFillWidth: ()=> dispatch({type: actionTypes.FILL_CABINET_WIDTH}),
            toggleDevice: (deviceName) => dispatch({type: actionTypes.TOGGLE_DEVICE, deviceName: deviceName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularzNowejSzafki);
