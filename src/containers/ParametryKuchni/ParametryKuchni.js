import React, { Component } from 'react';

import './ParametryKuchni.css';
import ParamsInput from '../../components/UI/ParamsInput/ParamsInput';
import * as actionTypes from '../../store/actions/actionTypes'

import {connect} from 'react-redux';

class ParametryKuchni extends Component {
  render() {
      const formInputsArray = [
          {
              description: "Szerokość kuchni",
              type: "kitchenWidth",
          },
          {
              description: "Wysokość kuchni",
              type: "kitchenHeight",
          },
          {
              description: "Głębokość szafek",
              type: "cabinetDepth",
          },
          {
              description: "Wysokość szafek",
              type: "cabinetHeight",
          },
          {
              description: "Szczelina pomiędzy blatem, a górnym frontem: ",
              type: "spaceDrawersToTop",
          },
          {
              description: "Szczelina pomiędzy frontami szuflad: ",
              type: "spaceBetweenDrawers"
          },
      ]

      const formInputs = formInputsArray.map(input => {
          return (
              <ParamsInput
                  paramDescription={input.description}
                  changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, input.type)}
                  value={this.props[input.type]}
              />
          )
      })
    return (
      <div>
        <h2 className="header">Podstawowe parametry kuchni<span className="redDot">.</span></h2>
        <div className="paramsContainer">
            <div className="paramsForm">
                {formInputs}
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
