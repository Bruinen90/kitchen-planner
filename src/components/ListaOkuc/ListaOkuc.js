import React, { Component } from 'react';
import {connect} from 'react-redux';

class ListaOkuc extends Component {
    render() {
        const elementyNiskiejSzuflady = [
            {
                name: "bok",
                fullname: "Bok szuflady",
                count: 2,
                productCode: "BL*IN*JB*378M5002*L + BL*IN*JB*378M5002*P",
                price: 25.18,
            },
            {
                name: "prowadnica",
                fullname: "Komplet prowadnic (30kg)",
                count: 1,
                productCode: "BL*IN*578.5001B*KPL",
                price: 60.45,
            },
            {
                name: "mocowaniePlecow",
                fullname: "Komplet uchwytów do ścianki tylnej",
                count: 1,
                productCode: "BL*IN*JB*Z30M000S*KPL",
                price: 5.18,
            },
            {
                name: "mocowanieFrontu",
                fullname: "Mocowanie frontu szuflady",
                count: 2,
                productCode: "BL*IN*ZSF.35A2",
                price: 1.52,
            },
        ];

        const listaOkuc = this.props.okucia.map(okucie => {
            if(okucie.type !== "drawer") {
                return(
                    <div className="row" key={okucie.name}>
                        <div className="col">{okucie.fullname}</div>
                        <div className="col">{okucie.count}szt</div>
                        <div className="col">{okucie.productCode}</div>
                        <div className="col">{okucie.price * okucie.count}zł</div>
                    </div>
                )
            } else {
                let drawerPrice = 0;
                const drawerDetails = elementyNiskiejSzuflady.map(element => {
                    drawerPrice = Math.round((drawerPrice + element.price * element.count)*10)/10;
                    return(
                        <div className="row" key={element.name}>
                            <div className="col">{element.fullname}</div>
                            <div className="col">{element.count}szt</div>
                            <div className="col">{element.productCode}</div>
                            <div className="col">{element.price * element.count}zł</div>
                        </div>
                    )
                })
                return (
                    [
                        <div className="row" key={okucie.name}>
                            <div className="col">{okucie.fullname}</div>
                            <div className="col">{okucie.count}szt</div>
                            <div className="col">{okucie.productCode}</div>
                            <div className="col">{drawerPrice}zł</div>
                        </div>,
                        drawerDetails
                    ]

                )
            }
        });

        return(
            <div className="output">
                <h1 className="innerHeaders">Lista okuć do zamówienia</h1>
                <div className="formatki">
                    <div className="parent">
                        <div className="typeHeader">Okucia meblowe</div>
                            {listaOkuc}
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        okucia: state.okucia,
    }
}

export default connect(mapStateToProps)(ListaOkuc);
