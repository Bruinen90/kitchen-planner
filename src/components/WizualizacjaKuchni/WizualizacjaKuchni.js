import React, { Component } from 'react';
import {connect} from 'react-redux';
import WizualizacjaWnetrza from '../WizualizacjaWnetrza/WizualizacjaWnetrza';
import * as actionTypes from '../../store/actions/actionTypes';
import './WizualizacjaKuchni.css';

class WizualizacjaKuchni extends Component {
    render() {
        let roomSize = {
            width: this.props.kitchenWidth,
            height: this.props.kitchenHeight,
        }
        const kitchenVisual = this.props.cabinets.map(cabinet => {
            let szafkaWymiary = {
                width: cabinet.cabinetWidth/this.props.scale + "px",
                height: this.props.wysokoscSzafek/this.props.scale + "px",
            }
            let showIfHovered = {};
            let overlayOpacity = {};
            if(cabinet.cabinetId === this.props.hoveredCabinet) {
                showIfHovered = {opacity: "1"};
                overlayOpacity = {opacity: "0.7"};
            }

            return (
                    <div
                        key={cabinet.cabinetId}
                        className="cabinetWrapper"
                        onMouseOver={()=>this.props.onHoverCabinet(cabinet.cabinetId)}
                        onMouseOut={()=>this.props.onHoverCabinet(false)}
                    >
                        <div className="ramySzafki maleRamy" style={szafkaWymiary}>
                            <div className="buttons" style={showIfHovered}>
                                <button
                                    className="green"
                                    onClick={()=>this.props.onClickEditCabinet(cabinet.cabinetId)}
                                >
                                    Edytuj
                                </button>
                                <button
                                    className="red"
                                    onClick={()=>this.props.onClickDeleteCabinet(cabinet.cabinetId)}
                                >
                                    Usuń
                                </button>
                            </div>
                            <WizualizacjaWnetrza
                                rodzaj={cabinet.cabinetType}
                                ilosc={cabinet.drawersHeights.length}
                                drawersHeights={cabinet.drawersHeights}
                                szczelina={this.props.szczelina}
                                activeDrawer={null}
                                rozmiar="small"
                                skala={this.props.scale}
                            />
                            <div className="cabinetOverlay" style={overlayOpacity}></div>
                        </div>
                        <div className="nogaSzafki malaNoga">
                          <div></div>
                        </div>
                        <div className="nogaSzafki malaNoga" style={{float: "right"}}>
                            <div></div>
                        </div>

                    </div>
            )
        })

      return (
          <div className="roomBorders rzadSzafek" style={roomSize}>
          {kitchenVisual}
          </div>
      );
  }
}
const mapStateToProps = state => {
    return {
        kitchenWidth: state.kitchenWidth,
        kitchenHeight: state.kitchenHeight,
        cabinets: state.cabinets,
        scale: state.scale,
        wysokoscSzafek: state.cabinetHeight,
        hoveredCabinet: state.hoveredCabinet,
        szczelina: state.spaceBetweenDrawers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onHoverCabinet: (cabinetId) => dispatch({type: actionTypes.HOVER_CABINET_ON_VISUALIZATION, cabinetId: cabinetId}),
        onClickEditCabinet: (cabinetId) => dispatch({type: actionTypes.EDIT_CABINET, cabinetId: cabinetId}),
        onClickDeleteCabinet: (cabinetId) => dispatch({type: actionTypes.DELETE_CABINET, cabinetId: cabinetId}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WizualizacjaKuchni);
