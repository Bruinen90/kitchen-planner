import React, {Component} from 'react';
import './KitchenState.css';
import {connect} from 'react-redux'

class KitchenState extends Component {
    render() {
        let cabinetWarning = "";
        if(this.props.tooWideCabinet) {
            cabinetWarning = "kitchenPropLineWarning";
            if(this.props.kitchenCabinetsValid) {
                cabinetWarning = "kitchenPropsLineFull";
            }
        }
        return (
        <div className="kitchenStateWrapper">
            <div className={"kitchenPropLine " + " " + cabinetWarning}>
            <span className="kitchenPropDescription">Pozostała szerokość kuchni:</span>
                <span className="kitchenPropValue"> {this.props.leftSpace}</span>
            </div>
            <div className="kitchenPropLine">
            <span className="kitchenPropDescription">Szerokość kuchni:</span>
                <span className="kitchenPropValue"> {this.props.kitchenWidth}</span>
            </div>
            <div className="kitchenPropLine">
            <span className="kitchenPropDescription">Głębokość szafek:</span>
                <span className="kitchenPropValue"> {this.props.cabinetDepth}</span>
            </div>
            <div className="kitchenPropLine">
            <span className="kitchenPropDescription">Wysokość szafek:</span>
                <span className="kitchenPropValue"> {this.props.cabinetHeight}</span>
            </div>
            <div className="kitchenPropLine">
            <span className="kitchenPropDescription">Wysokość nóżek:</span>
                <span className="kitchenPropValue"> {this.props.legsHeight}</span>
            </div>
        </div>
    );
    }
}

const mapStateToProps = state => {
    return {
        kitchenWidth: state.kitchenWidth,
        cabinetDepth: state.cabinetDepth,
        cabinetHeight: state.cabinetHeight,
        legsHeight: state.legsHeight,
        leftSpace: state.leftSpace,
        tooWideCabinet: state.cabinetError === "tooWideCabinet",
        kitchenCabinetsValid: state.kitchenCabinetsValid,
    }
}

export default connect(mapStateToProps)(KitchenState);
