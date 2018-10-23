import React, { Component } from 'react';
import Auxx from '../../Auxx';
import './ListaSzafek.css';

class ListaSzafek extends Component {
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
                default:
                    fullCabinetType = "Zmywarka";
            }
            return (
                <Auxx key={cabinet.cabinetId}>
                <div>
                    {cabinet.cabinetId}.
                </div>
                <div>
                    {fullCabinetType}
                </div>
                <div>
                    {cabinet.cabinetWidth} mm
                </div>
                <div>
                    ico
                </div>
                </Auxx>
            )
        })
        return (
          <div className={"listaWrapper " + this.props.hide}>
              <div className="naglowekListySzafek">
              </div>
              <div className="naglowekListySzafek">
                Rodzaj szafki
              </div>
              <div className="strzalkiSzerokosc naglowekListySzafek">
                <ion-icon name="arrow-round-back"></ion-icon><ion-icon name="arrow-round-forward"></ion-icon>
              </div>
              <div className="naglowekListySzafek">
              </div>

              {listaSzafek}
          </div>
        );
    }
}
export default ListaSzafek;
