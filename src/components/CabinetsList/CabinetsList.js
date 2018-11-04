import React, { Component } from 'react';
import './CabinetsList.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

class CabinetsList extends Component {
    render() {
        const listaSzafek = this.props.cabinets.map(cabinet => {
            let fullCabinetType = ""
            switch (cabinet.cabinetType) {
                case "jedneDrzwi":
                    fullCabinetType = "Szafka z drzwiami"
                    break;
                case "szufladaDrzwi":
                    fullCabinetType = "Szafka z drzwiami i szufladą"
                    break;
                case "szuflady":
                    fullCabinetType = "Szafka z szufladami"
                    break;
                default:
                    fullCabinetType = "Zmywarka";
            }
            return (
                <React.Fragment key={cabinet.cabinetId}>
                <div>
                    {cabinet.cabinetId}.
                </div>
                <div>
                    {fullCabinetType}
                </div>
                <div>
                    {cabinet.cabinetWidth} mm
                </div>
                <div className="ikonaEdycjiSzafki" onClick={()=>this.props.onClickEditCabinet(cabinet.cabinetId)}>
                    <ion-icon name="create"></ion-icon>
                </div>
                <div className="ikonaUsuwaniaSzafki" onClick={()=>this.props.onClickDeleteCabinet(cabinet.cabinetId)}>
                    <ion-icon name="close"></ion-icon>
                </div>
                </React.Fragment>
            )
        })
        const showList = {
            bottom: this.props.show ? "70px" : "-900px",
        }
        return (
          <div className="listaWrapper " style={showList}>
              <div className="naglowekListySzafek">
              </div>
              <div className="naglowekListySzafek">
                Lista szafek
              </div>
              <div className="strzalkiSzerokosc naglowekListySzafek">
                <ion-icon name="arrow-round-back"></ion-icon><ion-icon name="arrow-round-forward"></ion-icon>
              </div>
              <div className="naglowekListySzafek">
              </div>
              <div className="naglowekListySzafek ikonaNaglowka" onClick={this.props.clickHide}>
                  <ion-icon name="arrow-dropdown"></ion-icon>
              </div>
              {listaSzafek}
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickEditCabinet: (cabinetId) =>
            dispatch({type: actionTypes.EDIT_CABINET, cabinetId: cabinetId}),
        onClickDeleteCabinet: (cabinetId) =>
            dispatch({type: actionTypes.DELETE_CABINET, cabinetId: cabinetId}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CabinetsList);
