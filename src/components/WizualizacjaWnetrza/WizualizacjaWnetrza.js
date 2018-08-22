import React, {Component} from 'react';

import {connect} from 'react-redux';

class WizualizacjaWnetrze extends Component {
    render() {

        let drowersArray = [];
        if (this.props.rodzaj === "szuflady") {
            this.props.drawersHeights.map((wysokosc,id) => {
                let aktywnaSzuflada = "";
                if (this.props.activeDrawer === id) {
                    aktywnaSzuflada = "aktywnaSzuflada"
                }
                    drowersArray.push(
                        <div
                            className={"szuflada" + " " + aktywnaSzuflada}
                            key={id}
                            style={{"height": wysokosc+"px"}}
                            >
                            {id+1}
                            {wysokosc ?
                                <div className="aktualnaWysokosc">
                                    <span style={{"fontSize": "12px"}}>Wysokość frontu:</span>
                                    <br/>{wysokosc+"mm"}
                                </div> : null}
                        </div>);
            })
        }

        if (this.props.rodzaj === "szufladaDrzwi") {
            let aktywnaSzuflada = "";
            if (this.props.activeDrawer !== null) {
                aktywnaSzuflada = "aktywnaSzuflada"
            }
                drowersArray.push(<div
                                    className={"szuflada malaSzuflada" + " " + aktywnaSzuflada}
                                    style={{"height": this.props.drawersHeights[0]+"px"}}>Szuflada</div>);
                drowersArray.push(<div className="szuflada">Drzwi</div>);
        }

        if (this.props.rodzaj === "jedneDrzwi") {
                drowersArray.push(<div className="szuflada"></div>);
        }
            return(
                drowersArray
        )
    }
}

const mapStateToProps = state => {
    return {
        drawersHeights: state.drawersHeights,
        activeDrawer: state.activeDrawer,
    }
}

export default connect(mapStateToProps)(WizualizacjaWnetrze);
