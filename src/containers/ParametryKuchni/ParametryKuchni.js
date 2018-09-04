import React, { Component } from 'react';

import './ParametryKuchni.css';
import SaveAndContinueButton from '../../components/UI/SaveAndContinueButton/SaveAndContinueButton';
import ParamsInput from '../../components/UI/ParamsInput/ParamsInput';
import * as actionTypes from '../../store/actions/actionTypes';

import {connect} from 'react-redux';

import kitchenWidth from '../../img/schematy/kitchenWidth.png';
// import kitchenHeight from '../../img/schematy/kitchenHeight.gif';
import cabinetDepth from '../../img/schematy/cabinetDepth.gif';
import cabinetHeight from '../../img/schematy/cabinetHeight.gif';
import spaceDrawersToTop from '../../img/schematy/spaceDrawersToTop.gif';
import spaceBetweenDrawers from '../../img/schematy/spaceBetweenDrawers.gif';
import spaceBetweenCabinets from '../../img/schematy/spaceBetweenCabinets.gif';

class ParametryKuchni extends Component {
  render() {
      const formInputsArray = [
          {
              description: "Szerokość kuchni",
              type: "kitchenWidth",
          },
          // {
          //     description: "Wysokość kuchni",
          //     type: "kitchenHeight",
          // },
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
      ];

      const formInputs = formInputsArray.map(input => {
          return (
              <ParamsInput
                  paramDescription={input.description}
                  changeInputValue={(event) => this.props.onChangeKitchenParam(event.target.value, input.type)}
                  focusParamInput={()=>this.props.onFocusParamInput(input.type)}
                  value={this.props[input.type]}
                  key={input.type}
                  autofocus={input.type==="kitchenWidth"}
              />
          )
      });

      let visualizationImage = "";

      switch (this.props.focusedParamInput) {
        case "cabinetDepth":
            visualizationImage = cabinetDepth;
            break;
        case "spaceBetweenDrawers":
            visualizationImage = spaceBetweenDrawers
            break;
        case "kitchenWidth":
            visualizationImage = kitchenWidth;
            break;
        // case "kitchenHeight":
        //     visualizationImage = kitchenHeight;
        //     break;
        case "cabinetHeight":
            visualizationImage = cabinetHeight;
            break;
        case "spaceDrawersToTop":
            visualizationImage = spaceDrawersToTop;
            break;
        case "spaceBetweenDrawers":
            visualizationImage = spaceBetweenDrawers;
            break;
        case "spaceBetweenCabinets":
            visualizationImage = spaceBetweenCabinets;
            break;




      }

    return (
      <div>
        <h2 className="header">Podstawowe parametry kuchni<span className="redDot">.</span></h2>
        <div className="paramsContainer">
            <div className="paramsForm">
                <h3>Podaj wymiary w milimetrach</h3>
                {formInputs}
            </div>
            <div className="paramVisualization">
                <img src={visualizationImage} className="visualizationImage" />
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
        focusedParamInput: state.focusedParamInput,
        validParams: state.validParams,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeKitchenParam: (paramValue, paramName) =>
            dispatch({type: actionTypes.CHANGE_KITCHEN_PARAM, paramValue: paramValue, paramName: paramName}),
        onClickSaveAndContinue: ()=> dispatch({type: actionTypes.SAVE_PARAMS}),
        onFocusParamInput: (paramName)=> dispatch({type: actionTypes.FOCUS_INPUT, paramName: paramName}),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParametryKuchni);
