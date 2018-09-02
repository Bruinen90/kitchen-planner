import React, { Component } from 'react';

import './ParametryKuchni.css';
import ParamsInput from '../../components/UI/ParamsInput/ParamsInput';
import * as actionTypes from '../../store/actions/actionTypes'

import {connect} from 'react-redux';

class ParametryKuchni extends Component {
  render() {
    return (
      <div>
        <h2 className="header">Podstawowe parametry kuchni</h2>
        <div className="paramsContainer">
            <div className="paramsForm">
                <ParamsInput
                    paramDescription="Szerokość kuchni: "
                    changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, "kitchenWidth")}
                />
                <ParamsInput
                    paramDescription="Wysokość kuchni: "
                    changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, "kitchenHeight")}
                />
                <ParamsInput
                    paramDescription="Głębokość szafek kuchennych: "
                    changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, "cabinetDepth")}
                />
                <ParamsInput
                    paramDescription="Wysokość szafek kuchennych: "
                    changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, "cabinetHeight")}
                />
                <ParamsInput
                    paramDescription="Szczelina pomiędzy blatem, a górnym frontem: "
                    changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, "spaceDrawersToTop")}
                />
                <ParamsInput
                    paramDescription="Szczelina pomiędzy frontami szuflad: "
                    changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, "spaceBetweenDrawers")}
                />
                <ParamsInput
                    paramDescription="Szczelina pomiędzy frontami szafek: "
                    changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, "spaceBetweenCabinets")}
                />
            </div>
            <div className="paramVisualization">
                Miejsce na wizualizacje wskazanego parametru
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        kitchenWidth: state.kitchenWidth,
        kitchenHeight: state.kitchenHeight,
        cabinetDepth: state.cabinetDepth,
        cabinetHeight: state.cabinetHeight,
        spaceDrawersToTop: state.spaceDrawersToTop,
        spaceBetweenDrawers: state.spaceBetweenDrawers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeKitchenParam: (paramValue, paramName) =>
            dispatch({type: actionTypes.CHANGE_KITCHEN_PARAM, paramValue: paramValue, paramName: paramName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParametryKuchni);
