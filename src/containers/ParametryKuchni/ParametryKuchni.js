import React, { Component } from 'react';

import './ParametryKuchni.css';
import SaveAndContinueButton from '../../components/UI/SaveAndContinueButton/SaveAndContinueButton';
import ParamsInput from '../../components/UI/ParamsInput/ParamsInput';
import * as actionTypes from '../../store/actions/actionTypes';

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
          {
              description: "Szczelina pomiędzy szafkami: ",
              type: "spaceBetweenCabinets"
          },
      ]

      const formInputs = formInputsArray.map(input => {
          return (
              <ParamsInput
                  paramDescription={input.description}
                  changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, input.type)}
                  value={this.props[input.type]}
                  key={input.type}
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
        <SaveAndContinueButton href='/projekt/kreator-szafki' />
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
        spaceBetweenCabinets: state.spaceBetweenCabinets,
        validParams: state.validParams,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeKitchenParam: (paramValue, paramName) =>
            dispatch({type: actionTypes.CHANGE_KITCHEN_PARAM, paramValue: paramValue, paramName: paramName}),
        onClickSaveAndContinue: ()=> dispatch({type: actionTypes.SAVE_PARAMS})

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParametryKuchni);
