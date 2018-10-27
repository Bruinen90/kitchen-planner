import React, { Component } from 'react';
import {connect} from 'react-redux';
import './ListaOkuc.css';
import * as actionTypes from '../../../store/actions/actionTypes';

class ListaOkuc extends Component {
    render() {
        let totalAccessoriesPrice = 0;
        const elementyNiskiejSzuflady = [
            {
                name: "bokL",
                fullname: "Bok szuflady lewy",
                count: 1,
                productCode: "378M5002*L",
                price: 25.18,
            },
            {
                name: "bokP",
                fullname: "Bok szuflady prawy",
                count: 1,
                productCode: "378M5002*P",
                price: 25.18,
            },
            {
                name: "prowadnica",
                fullname: "Komplet prowadnic (30kg)",
                count: 1,
                productCode: "578.5001B*KPL",
                price: 60.45,
            },
            {
                name: "mocowaniePlecow",
                fullname: "Komplet uchwytów do ścianki tylnej",
                count: 1,
                productCode: "Z30M000S*KPL",
                price: 5.18,
            },
            {
                name: "mocowanieFrontu",
                fullname: "Mocowanie frontu szuflady",
                count: 2,
                productCode: "ZSF.35A2",
                price: 1.52,
            },
            {
                name: "zaslepka",
                fullname: "Zaślepka z logo Blum",
                count: 2,
                productCode: "ZAA.532C",
                price: 0.41,
            },
        ];

        const elementyWysokiejSzuflady = [
            {
                name: "bokL",
                fullname: "Bok szuflady lewy",
                count: 1,
                productCode: "378M5002*L",
                price: 25.18,
            },
            {
                name: "bokP",
                fullname: "Bok szuflady prawy",
                count: 1,
                productCode: "378M5002*P",
                price: 25.18,
            },
            {
                name: "prowadnica",
                fullname: "Komplet prowadnic (65kg)",
                count: 1,
                productCode: "576.5001B*KPL",
                price: 79.88,
            },
            {
                name: "mocowaniePlecow",
                fullname: "Komplet uchwytów do ścianki tylnej",
                count: 1,
                productCode: "Z30D000S*KPL",
                price: 10.05,
            },
            {
                name: "reling",
                fullname: "Komplet relingów bocznych",
                count: 1,
                productCode: "ZRG.437*KPL",
                price: 23.01,
            },
            {
                name: "mocowanieFrontu",
                fullname: "Mocowanie frontu szuflady",
                count: 2,
                productCode: "ZSF.35A2",
                price: 1.52,
            },
            {
                name: "zaslepka",
                fullname: "Zaślepka z logo Blum",
                count: 2,
                productCode: "ZAA.532C",
                price: 0.41,
            },
        ];

        let drawerPrice = 0;
        const drawerHeader = (okucie, drawerPrice) => {
            return (
                <div
                    className="row drawerHeader"
                    key={okucie.name}
                >
                    <div className="col toggleButton" onClick={() => this.props.onClickToggleDetails(okucie.name)}>
                        {this.props[okucie.name] ? <div className="minus">-</div> : <div className="plus">+</div>}
                    </div>
                    <div className="col">
                        <a
                            target="_blank" title="Wyszukaj okucia w Google"
                            href={"http://www.google.com/search?q="+okucie.productCode}>
                                {okucie.fullname}
                        </a>
                    </div>
                    <div className="col narrow">{okucie.count} szt</div>
                    <div className="col narrow">{drawerPrice.toFixed(2)} zł</div>
                </div>
            );
        }

        const drawerDetails = (elementsArray, drawersCount) => {
            return(
                elementsArray.map(element => {
                    drawerPrice = Math.round((drawerPrice + element.price * element.count * drawersCount)*10)/10;
                    return(
                        <div className="row drawerDetails" key={element.name}>
                            <div className="col toggleButton"></div>
                            <div className="col">
                                <a
                                    target="_blank" title="Wyszukaj okucia w Google"
                                    href={"http://www.google.com/search?q="+element.productCode}>
                                        {element.fullname}
                                </a>
                            </div>
                            <div className="col narrow">{element.count * drawersCount} szt</div>
                            <div className="col narrow">{(element.price * element.count * drawersCount).toFixed(2)} zł</div>
                        </div>
                    )
                })
            )
        };

        const listaOkuc = this.props.okucia.map(okucie => {
            if(okucie.type !== "drawer" && okucie.count > 0) {
                totalAccessoriesPrice = totalAccessoriesPrice + (okucie.price * okucie.count);
                let legsHeight = "";
                if(okucie.name==="legs") {
                    legsHeight = this.props.legsHeight+" mm";
                }
                return(
                    <div className="row" key={okucie.name}>
                        <div className="col toggleButton"></div>
                        <div className="col">
                            <a
                                target="_blank" title="Wyszukaj okucia w Google"
                                href={"http://www.google.com/search?q="+okucie.productCode+" "+legsHeight}>
                                    {okucie.fullname+ " " + legsHeight}
                            </a>
                        </div>
                        <div className="col narrow">{okucie.count} szt</div>
                        <div className="col narrow">{(okucie.price * okucie.count).toFixed(2)} zł</div>
                    </div>
                )
            } else if(okucie.name === "lowDrawers" && okucie.count > 0) {
                drawerPrice = 0;
                const lowDrawersDetails = drawerDetails(elementyNiskiejSzuflady, okucie.count);
                totalAccessoriesPrice = totalAccessoriesPrice + drawerPrice;
                return (
                    [   drawerHeader(okucie, drawerPrice),
                        <div
                            className="drawersDetailsWrapper"
                            style={this.props.lowDrawers ? {maxHeight: "600px", overflow: "1"} : null}
                            key="drawersDetails"
                        >
                            {lowDrawersDetails}
                        </div>,
                    ]
                );
            } else if(okucie.name === "highDrawers" && okucie.count > 0) {
                drawerPrice = 0;
                const highDrawersDetails = drawerDetails(elementyWysokiejSzuflady, okucie.count);
                totalAccessoriesPrice = totalAccessoriesPrice + drawerPrice;
                return (
                    [
                        drawerHeader(okucie, drawerPrice),
                        <div
                            className="drawersDetailsWrapper"
                            style={this.props.highDrawers ? {maxHeight: "600px", overflow: "1"} : null}
                            key="drawersDetails"
                        >
                            {highDrawersDetails}
                        </div>,
                    ]
                );
            } else return null;
        });

        return(
            <div className="outputOkucia">
                <h1 className="innerHeaders">Lista okuć do zamówienia</h1>
                <div className="formatki">
                    <div className="parent">
                        <div className="typeHeader">Okucia meblowe</div>
                            {listaOkuc}
                        <div className="row sumaOkuc">
                        Suma: {totalAccessoriesPrice.toFixed(2)}zł
                        </div>
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        okucia: state.okucia,
        lowDrawers: state.showLowDrawersDetails,
        highDrawers: state.showHighDrawersDetails,
        legsHeight: state.legsHeight,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickToggleDetails: (drawersSize)=> dispatch({type: actionTypes.TOGGLE_DRAWERS_DETAILS, drawerSize: drawersSize})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaOkuc);
