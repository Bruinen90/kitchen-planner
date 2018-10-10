import React, {Component} from 'react';
import './WizualizacjaWnetrza.css';
import {connect} from 'react-redux';
import dishwasherIcon from '../../img/sprzety/dishwasher_icon.png';

class WizualizacjaWnetrze extends Component {
    render() {
        let editInProgress = this.props.editInProgress ? "editInProgress" : "";

        const wysokoscPrzeliczeniowa = (wysokosc) => (wysokosc+this.props.szczelina);
        let drowersArray = [];
        let doorsArray=[];
        if (this.props.rodzaj === "szuflady") {
            this.props.drawersHeights.map((wysokosc,id) => {
                let aktywnaSzuflada = "";
                if (this.props.activeDrawer === id) {
                    aktywnaSzuflada = "aktywnaSzuflada"
                }
                drowersArray.push(
                        <div
                            className={"szuflada " + aktywnaSzuflada + editInProgress}
                            key={id}
                            style={{"height": wysokoscPrzeliczeniowa(wysokosc)+"px"}}
                        >
                        {this.props.scale > 4 ? null : id+1 }
                        {wysokosc ?
                            <div className="aktualnaWysokosc">
                                    {this.props.scale > 2 ? null :
                                        <span style={{"fontSize": "12px"}}>Wysokość frontu:<br/></span>}
                                {wysokosc+"mm"}
                            </div> : null}
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
            if (this.props.activeDrawer === 0) {
                aktywnaSzuflada = "aktywnaSzuflada";
            }
                drowersArray.push(<div
                                    className={
                                        "szuflada malaSzuflada " +
                                        aktywnaSzuflada + " " +
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

        if (this.props.rodzaj === "zmywarka") {
            doorsArray.push(
                <div className={"drzwi " + editInProgress} key="drzwi1">
                    <img src={dishwasherIcon} className="dishwasherIcon" alt="Zmywarka"/>
                </div>);
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
                        (this.props.cabinetHeight-
                        this.props.drawersHeights[0]-
                        this.props.spaceDrawersToTop)/(this.props.shelfsCount+1);
                    shelfHeight = shelfHeight/this.props.scale;
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
