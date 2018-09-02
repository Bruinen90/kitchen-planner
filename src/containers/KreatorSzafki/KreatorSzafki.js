import React, { Component } from 'react';

import WizualizacjaWnetrza from '../../components/WizualizacjaWnetrza/WizualizacjaWnetrza';
import FormularzNowejSzafki from '../../components/FormularzNowejSzafki/FormularzNowejSzafki';
import WizualizacjaKuchni from '../../components/WizualizacjaKuchni/WizualizacjaKuchni';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

class KreatorSzafki extends Component {
  render() {
      let wizualizacjaWymiary = {
          width: this.props.cabinetWidth/2 + "px",
          height: this.props.wysokoscSzafek/2 + "px",
      }
    return (
        <div className="contentWrapper">
            <div className="kreatorNowejSzafki">
                <FormularzNowejSzafki
                    changeType = {(event) => this.props.onChangeCabinetType(event)}
                    changeWidth = {(event) => this.props.onChangeCabinetWidth(event)}
                    changeDrawerCount = {(event) => this.props.onChangeDrawerCount(event)}
                    ilosc = {this.props.iloscSzuflad}
                    clickDodaj = {this.props.onAddCabinet}
                    canAddCabinet = {this.props.canAddCabinet}
                />
                <div className="wizualizacjaSzafki">
                    <div className="ramySzafki" style={wizualizacjaWymiary}>
                        <WizualizacjaWnetrza
                            rodzaj={this.props.cabinetType}
                            ilosc={this.props.drawersHeights.length}
                            drawersHeights={this.props.drawersHeights}
                            activeDrawer={this.props.activeDrawer}
                            szczelina={this.props.szczelina}
                        />
                    </div>
                    <div className="nogaSzafki">
                        <div></div>
                    </div>
                    <div className="nogaSzafki" style={{float: "right"}}>
                        <div></div>
                    </div>
                </div>
            </div>
            <WizualizacjaKuchni />

        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        cabinets: state.cabinets,
        sizeW: state.kitchenWidth,
        sizeH: state.kitchenHeight,
        scale: state.scale,
        szczelina: state.spaceBetweenDrawers,
        wysokoscSzafek: state.cabinetHeight,
        iloscSzafek: state.cabinetsCount,
        formatki: state.formatki,
        drawersHeights: state.drawersHeights,
        activeDrawer: state.activeDrawer,
        iloscSzuflad: state.drawersHeights.length,
        canAddCabinet: state.cabinetValid,
        cabinetWidth: state.cabinetWidth,
        cabinetType: state.cabinetType,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeCabinetType: (event) => dispatch({type: actionTypes.CHANGE_CABINET_TYPE, event: event}),
        onChangeDrawerCount: (event) => dispatch({type: actionTypes.CHANGE_DRAWER_COUNT, event: event}),
        onChangeCabinetWidth: (event) => dispatch({type: actionTypes.CHANGE_CABINET_WIDTH, event: event}),
        onAddCabinet: () => dispatch({type: actionTypes.ADD_CABINET}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KreatorSzafki);