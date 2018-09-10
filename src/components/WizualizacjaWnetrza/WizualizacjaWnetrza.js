import React, {Component} from 'react';

import './WizualizacjaWnetrza.css';

import {connect} from 'react-redux';

class WizualizacjaWnetrze extends Component {
    render() {
        let wizualizacjaWymiary = {
            width: this.props.cabinetWidth/2 + "px",
            height: this.props.cabinetHeight/2 + "px",
        }

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
        let doorsArray=[];
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

        let wysokoscSzuflady = this.props.drawersHeights[0];
        let wysokoscDrzwi =
            this.props.cabinetHeight -
            wysokoscSzuflady -
            this.props.spaceDrawersToTop -
            this.props.spaceBetweenDrawers;

        if (this.props.rodzaj === "szufladaDrzwi") {
            let aktywnaSzuflada = "";
            if (this.props.activeDrawer !== null) {
                aktywnaSzuflada = "aktywnaSzuflada";
            }
                drowersArray.push(<div
                                    className={
                                        "szuflada malaSzuflada " +
                                        aktywnaSzuflada + " " +
                                        this.props.rozmiar + " " +
                                        editInProgress
                                    }
                                    style={{"height": wysokoscPrzeliczeniowa(wysokoscSzuflady) +"px"}}
                                    key="szuflada"
                                    ></div>);
                doorsArray.push(<div
                                    className={"drzwi " + editInProgress}
                                    key="drzwi1"
                                    style={{height: wysokoscPrzeliczeniowa(wysokoscDrzwi) +"px"}}
                                    ></div>);
                if(this.props.ifDoubleDoors) {
                    doorsArray.push(<div
                                        className={"drzwi " + editInProgress}
                                        key="drzwi2"
                                        style={{height: wysokoscPrzeliczeniowa(wysokoscDrzwi) +"px"}}
                                        ></div>);
                }
        }

        if (this.props.rodzaj === "jedneDrzwi") {
            doorsArray.push(<div className={"drzwi " + editInProgress} key="drzwi1"></div>);
            if(this.props.ifDoubleDoors) {
                doorsArray.push(<div className={"drzwi " + editInProgress} key="drzwi2"></div>);
            }

        }
        const shelfsEmptyArray = Array(this.props.shelfsCount).fill(null);
        let shelfsArray = [];
        if(this.props.shelfsCount > 0) {
            shelfsArray = shelfsEmptyArray.map((_, id) => {
                if(this.props.rodzaj === "jedneDrzwi") {
                    const shelfHeight = 100/(this.props.shelfsCount+1);
                    return(
                        <div className="shelf" style={{height: shelfHeight*(id+1)+"%"}}></div>
                    )
                }
                if(this.props.rodzaj === "szufladaDrzwi") {
                    let shelfHeight =
                        ((this.props.cabinetHeight-
                        this.props.drawersHeights[0]-
                        this.props.spaceDrawersToTop)/(this.props.shelfsCount+1))/2;
                    if(this.props.skala) {
                        shelfHeight = shelfHeight*2/this.props.skala;
                    }
                    return(
                        <div className="shelf" style={{height: shelfHeight*(id+1)+"px"}}></div>
                    )
                }

            })
        }


            return(
                this.props.ifDoubleDoors && this.props.rodzaj !== "szuflady" ?
                [drowersArray,
                <div className="doubleDoorsWrapper" style={{"height": wysokoscPrzeliczeniowa(wysokoscDrzwi) +"px"}}>
                {doorsArray}
                </div>,
                shelfsArray] :
                [drowersArray, doorsArray, shelfsArray]
        )
    }
}

const mapStateToProps = state => {
    return {
        cabinetHeight: state.cabinetHeight,
        cabinetWidth: state.cabinetWidth,
        spaceDrawersToTop: state.spaceDrawersToTop,
        spaceBetweenDrawers: state.spaceBetweenDrawers,
    }
}

export default connect(mapStateToProps)(WizualizacjaWnetrze);
