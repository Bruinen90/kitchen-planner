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
import legsHeight from '../../img/schematy/legsHeight.png';

class ParametryKuchni extends Component {
  render() {
      const formInputsArray = [
          {
              description: "Szerokość kuchni",
              type: "kitchenWidth",
              error: "Szerokość kuchni powinna wynosić od 400 do 9000mm",
              minValue: 400,
              maxValue: 9000,
          },
          // {
          //     description: "Wysokość kuchni",
          //     type: "kitchenHeight",
          // },
          {
              description: "Głębokość szafek",
              type: "cabinetDepth",
              error: "Głębokość szafek powinna wynosić od 200 do 600mm",
              minValue: 200,
              maxValue: 600,
          },
          {
              description: "Wysokość szafek dolnych",
              type: "cabinetHeight",
              error: "Wysokość szafek powinna wynosić od 500 do 900mm",
              minValue: 500,
              maxValue: 900,
          },
          {
              description: "Szczelina pomiędzy blatem, a górnym frontem: ",
              type: "spaceDrawersToTop",
              error: "Szczelina powinna mieć od 1 do 50mm",
              minValue: 1,
              maxValue: 50,
          },
          {
              description: "Szczelina pomiędzy frontami szuflad: ",
              type: "spaceBetweenDrawers",
              error: "Szczelina powinna mieć od 1 do 50mm",
              minValue: 1,
              maxValue: 50,
          },
          {
              description: "Szczelina pomiędzy szafkami: ",
              type: "spaceBetweenCabinets",
              error: "Szczelina powinna mieć od 1 do 50mm",
              minValue: 1,
              maxValue: 50,
          },
          {
              description: "Wysokość nóżek (blendy) pod szafkami: ",
              type: "legsHeight",
              error: "Wysokość nóżek powinna wynosić od 50 do 200mm",
              minValue: 50,
              maxValue: 200,
          },
      ];

      if(!this.props.kitchenType.includes("edenRzad")) {
          formInputsArray.splice(3, 0,
              {
                  description: "Wysokość szafek górnych",
                  type: "upperCabinetHeight",
                  error: "Wysokość szafek powinna wynosić od 300 do 900mm",
                  minValue: 300,
                  maxValue: 900,
              },
          )
      }




      const formInputs = formInputsArray.map(input => {
          return (
              <div className="wrapper" key={input.type}>
                  <ParamsInput
                      paramDescription={input.description}
                      changeInputValue={
                          (event) => this.props.onChangeKitchenParam(
                              event.target.value,
                              input.type,
                              input.minValue,
                              input.maxValue
                          )}
                      focusParamInput={()=>this.props.onFocusParamInput(input.type)}
                      value={this.props[input.type]}
                      typedValue={this.props[input.type]}
                      minValue={input.minValue}
                      maxValue={input.maxValue}
                      error={input.error}
                      autofocus={input.type==="kitchenWidth"}
                      showErrors={this.props.showErrors}
                      valid={this.props.validParams[input.type]}
                      placeholder={input.minValue+"-"+input.maxValue+"mm"}
                  />
            </div>
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
        case "upperCabinetHeight":
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
        case "legsHeight":
            visualizationImage = legsHeight;
            break;
      }

    return (
      <div>
        <h2 className="header">Podstawowe parametry kuchni<span className="redDot">.</span></h2>
        <h3>Wybierz rodzaj kuchni</h3>
        <label>
        <input
            type="radio"
            onChange={(event)=>this.props.onChangeKitchenType(event)}
            checked={this.props.kitchenType === "prostaJedenRzad"}
            value="prostaJedenRzad"
            />
            Kuchnia prosta, tylko szafki dolne
        </label>
        <br/>
        <label>
        <input
            type="radio"
            onChange={(event)=>this.props.onChangeKitchenType(event)}
            checked={this.props.kitchenType === "prostaGoraDol"}
            value="prostaGoraDol"
            />
            Kuchnia prosta, szafki dolne i górne
        </label>
        <div className="paramsContainer">
            <div className="paramsForm">
                <h3>Podaj wymiary w milimetrach</h3>
                {formInputs}
            </div>
            <div className="paramVisualization">
                <img src={visualizationImage} className="visualizationImage" />
            </div>
        </div>
        <SaveAndContinueButton
            href='/projekt/kreator-szafki'
            active={this.props.validForm}
            showErrors={()=>this.props.onClickShowErrors(true)}
            resetErrors={()=>this.props.onClickShowErrors(false)}
        />
        <input
            type="button"
            className="setDefaultValuesButton"
            value="Ustaw sugerowane wartości"
            onClick={this.props.onClickSetDefaults}
        />
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
        upperCabinetHeight: state.upperCabinetHeight,
        legsHeight: state.legsHeight,
        spaceDrawersToTop: state.spaceDrawersToTop,
        spaceBetweenDrawers: state.spaceBetweenDrawers,
        spaceBetweenCabinets: state.spaceBetweenCabinets,
        focusedParamInput: state.focusedParamInput,
        validParams: state.validParams,
        showErrors: state.showErrors,
        validForm: state.validForm,
        validParams: state.validParams,
        kitchenType: state.kitchenType,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeKitchenParam: (paramValue, paramName, paramMinValue, paramMaxValue) =>
            dispatch({
                type: actionTypes.CHANGE_KITCHEN_PARAM,
                paramValue: paramValue,
                paramName: paramName,
                paramMinValue: paramMinValue,
                paramMaxValue: paramMaxValue
            }),
        onClickSaveAndContinue: ()=> dispatch({type: actionTypes.SAVE_PARAMS}),
        onFocusParamInput: (paramName)=> dispatch({type: actionTypes.FOCUS_INPUT, paramName: paramName}),
        onClickShowErrors: (ifShow)=> dispatch({type: actionTypes.SHOW_ERRORS, ifShow: ifShow}),
        onClickSetDefaults: ()=> dispatch({type: actionTypes.SET_DEFAULTS_PARAMS}),
        onChangeKitchenType: (event)=> dispatch({type: actionTypes.CHANGE_KITCHEN_TYPE, event: event}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParametryKuchni);
