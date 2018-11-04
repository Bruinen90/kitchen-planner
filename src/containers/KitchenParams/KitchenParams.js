import React, { Component } from 'react';

import './KitchenParams.css';
import SaveAndContinueButton from '../../components/UI/SaveAndContinueButton/SaveAndContinueButton';
import ParamsInput from '../../components/UI/ParamsInput/ParamsInput';
import * as actionTypes from '../../store/actions/actionTypes';

import {connect} from 'react-redux';

import kitchenWidth from '../../img/schematics/kitchenWidth.png';
import cabinetDepth from '../../img/schematics/cabinetDepth.gif';
import cabinetHeight from '../../img/schematics/cabinetHeight.gif';
import spaceDrawersToTop from '../../img/schematics/spaceDrawersToTop.gif';
import spaceBetweenDrawers from '../../img/schematics/spaceBetweenDrawers.gif';
import spaceBetweenCabinets from '../../img/schematics/spaceBetweenCabinets.gif';
import legsHeight from '../../img/schematics/legsHeight.png';

class KitchenParams extends Component {
    constructor(props) {
        super(props);
        this.inputsArr = [];
        this.scrollToElement = (index) => {
            window.scrollTo({top: this.inputsArr[index].offsetTop, behavior: 'smooth'})
        }
    }

    componentDidMount () {
        window.scrollTo(0, 0);
    }

  render() {
      const formInputsArray = [
          {
              description: "Szerokość kuchni",
              type: "kitchenWidth",
              error: "Szerokość kuchni powinna wynosić od 400 do 9000mm",
              minValue: 400,
              maxValue: 9000,
          },
          {
              description: "Wysokość szafek dolnych",
              type: "cabinetHeight",
              error: "Wysokość szafek powinna wynosić od 500 do 900mm",
              minValue: 500,
              maxValue: 900,
          },
          {
              description: "Głębokość szafek dolnych",
              type: "cabinetDepth",
              error: "Głębokość szafek powinna wynosić od 200 do 600mm",
              minValue: 200,
              maxValue: 600,
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
              {
                  description: "Głębokość szafek górnych",
                  type: "upperCabinetDepth",
                  error: "Głębokość szafek powinna wynosić od 200 do 600mm",
                  minValue: 200,
                  maxValue: 600,
              }
          )
      }

      const formInputs = formInputsArray.map((input, index) => {
          return (
              <div className="wrapper" key={input.type} ref={(ref) => this.inputsArr[index] = ref}>
                  <ParamsInput
                      paramDescription={input.description}
                      changeInputValue={
                          (event) => this.props.onChangeKitchenParam(
                              event.target.value,
                              input.type,
                              input.minValue,
                              input.maxValue
                          )}
                      focused={()=>this.props.onFocusParamInput(input.type)}
                      value={this.props[input.type]}
                      typedValue={this.props[input.type]}
                      minValue={input.minValue}
                      maxValue={input.maxValue}
                      error={input.error}
                      autofocus={window.innerWidth > 950 ? input.type==="kitchenWidth" : null}
                      showErrors={this.props.showErrors}
                      valid={this.props.validParams[input.type]}
                      placeholder={input.minValue+"-"+input.maxValue+"mm"}
                      focusParamInput = {
                          window.innerWidth >950 ?
                          ()=>this.props.onFocusParamInput(input.type) :
                          ()=>this.scrollToElement(index)}
                  />
            </div>
          )
      });

      const visualizationImage = {
          "cabinetDepth": cabinetDepth,
          "spaceBetweenDrawers": spaceBetweenDrawers,
          "kitchenWidth": kitchenWidth,
          "cabinetHeight": cabinetHeight,
          "upperCabinetHeight": cabinetHeight,
          "upperCabinetDepth": cabinetDepth,
          "spaceDrawersToTop": spaceDrawersToTop,
          "spaceBetweenCabinets": spaceBetweenCabinets,
          "legsHeight": legsHeight,
      }

    return (
      <React.Fragment>
        <h2 className="header">Podstawowe parametry kuchni<span className="redDot">.</span></h2>
        <h3>Wybierz rodzaj kuchni</h3>
        <div className="chooseKitchenType">
            <label className="checkboxLabel">
                <div className="radioSwitch">
                    <input
                        type="radio"
                        onChange={(event)=>this.props.onChangeKitchenType(event)}
                        checked={this.props.kitchenType === "prostaJedenRzad"}
                        value="prostaJedenRzad"
                    />
                    <span className="slider radio"></span>
                </div>
                Kuchnia prosta, tylko szafki dolne
            </label>
            <br/>
            <label className="checkboxLabel">
            <div className="radioSwitch">
                <input
                    type="radio"
                    onChange={(event)=>this.props.onChangeKitchenType(event)}
                    checked={this.props.kitchenType === "prostaGoraDol"}
                    value="prostaGoraDol"
                />
                <span className="slider radio"></span>
            </div>
            Kuchnia prosta, szafki dolne i górne
            </label>
        </div>
        <div className="paramsContainer">
            <div className="paramsForm">
            <h3>Podaj wymiary w milimetrach</h3>
                {formInputs}
            </div>
            <div className="paramVisualization">
                <img src={visualizationImage[this.props.focusedParamInput]} className="visualizationImage" title="Podaj wymiar zaznaczony strzałką"/>
            </div>
        </div>
        {window.innerWidth>950 ?
        <input
            type="button"
            className="setDefaultValuesButton"
            value="Ustaw sugerowane wartości"
            onClick={this.props.onClickSetDefaults}
        /> :
        <input
            type="button"
            className={this.props.defaultsButtonText==="?" ? "setDefaultValuesButton" : "setDefaultValuesMessage"}
            value={this.props.defaultsButtonText}
            onClick={this.props.onClickDefaults}
        />
        }

        {window.innerWidth>950 || this.props.defaultsButtonText==="?" ? null :
        <div>
        <button
            className="confirmButton"
            onClick={this.props.onClickSetDefaults}
        ><ion-icon name="checkmark"></ion-icon>
        </button>
        <button
            className="rejectButton"
            onClick={this.props.onClickDefaults}
        ><ion-icon name="close"></ion-icon>
        </button>
        </div>
        }
        <SaveAndContinueButton
        href='/projekt/kreator-szafki'
        active={this.props.validForm}
        showErrors={()=>this.props.onClickShowErrors(true)}
        resetErrors={()=>this.props.onClickShowErrors(false)}
        />
      </React.Fragment>
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
        upperCabinetDepth: state.upperCabinetDepth,
        legsHeight: state.legsHeight,
        spaceDrawersToTop: state.spaceDrawersToTop,
        spaceBetweenDrawers: state.spaceBetweenDrawers,
        spaceBetweenCabinets: state.spaceBetweenCabinets,
        focusedParamInput: state.focusedParamInput,
        validParams: state.validParams,
        showErrors: state.showErrors,
        validForm: state.validForm,
        kitchenType: state.kitchenType,
        defaultsButtonText: state.defaultsButtonText,
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
        onClickDefaults: (event)=> dispatch({type: actionTypes.CLICK_DEFAULTS, event:event}),
        onFocusScrollToTop: ()=> dispatch({type: actionTypes.SCROLL_TO_TOP}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KitchenParams);
