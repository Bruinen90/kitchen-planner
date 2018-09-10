import React, {Component} from 'react';

import './WizualizacjaWnetrza.css';

class WizualizacjaWnetrze extends Component {
    render() {
        let editInProgress = "";

        if(this.props.editInProgress) {
            editInProgress = "editInProgress"
        }

        const wysokoscPrzeliczeniowa = (wysokosc) => {
            if(this.props.rozmiar==="small") {
                return (wysokosc+this.props.szczelina)/this.props.skala
                }
            else {
                return (wysokosc+this.props.szczelina)
            };
        }
        let drowersArray = [];
        if (this.props.rodzaj === "szuflady") {
            this.props.drawersHeights.map((wysokosc,id) => {
                let aktywnaSzuflada = "";
                if (this.props.activeDrawer === id) {
                    aktywnaSzuflada = "aktywnaSzuflada"
                }
                drowersArray.push(
                    !this.props.rozmiar ?
                        <div
                            className={"szuflada " + aktywnaSzuflada}
                            key={id}
                            style={{"height": wysokoscPrzeliczeniowa(wysokosc)+"px"}}
                        >
                        {id+1}
                        {wysokosc ?
                            <div className="aktualnaWysokosc">
                                    <span style={{"fontSize": "12px"}}>Wysokość frontu:</span>
                                <br/>{wysokosc+"mm"}
                            </div> : null}
                        </div>
                        :
                        <div
                            className={"szuflada " + aktywnaSzuflada + " small " + editInProgress}
                            key={id}
                            style={{"height": wysokoscPrzeliczeniowa(wysokosc)+"px"}}
                        >
                        {wysokosc ? wysokosc+"mm" : null}
                        </div>

                        );
            })
        }

        if (this.props.rodzaj === "szufladaDrzwi") {
            let aktywnaSzuflada = "";
            if (this.props.activeDrawer !== null) {
                aktywnaSzuflada = "aktywnaSzuflada";
            }
            let wysokoscSzuflady = this.props.drawersHeights[0];
            if (this.props.rozmiar==="small") {
                wysokoscSzuflady = this.props.drawersHeights[0];
            }
                drowersArray.push(<div
                                    className={"szuflada malaSzuflada " + aktywnaSzuflada + " " + this.props.rozmiar + " " + editInProgress}
                                    style={{"height": wysokoscPrzeliczeniowa(wysokoscSzuflady) +"px"}}
                                    key="szuflada"
                                    >Szuflada</div>);
                drowersArray.push(<div className={"szuflada  " + aktywnaSzuflada + " " + editInProgress} key="drzwi">Drzwi</div>);
        }

        if (this.props.rodzaj === "jedneDrzwi") {
            drowersArray.push(<div className={"drzwi " + editInProgress} key="drzwiPojedyncze"></div>);
            if(this.props.ifDoubleDoors) {
                drowersArray.push(<div className={"drzwi " + editInProgress} key="drzwiPojedyncze"></div>);
            }

        }
            return(
                this.props.ifDoubleDoors ? <div className="doubleDoorsWrapper">
                {drowersArray}
                </div> :
                drowersArray
        )
    }
}

export default WizualizacjaWnetrze;
