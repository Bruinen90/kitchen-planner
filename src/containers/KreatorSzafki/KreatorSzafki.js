import React, { Component } from 'react';
import './KreatorSzafki.css';

import WizualizacjaWnetrza from '../../components/WizualizacjaWnetrza/WizualizacjaWnetrza';
import FormularzNowejSzafki from '../../components/FormularzNowejSzafki/FormularzNowejSzafki';
import WizualizacjaKuchni from '../../components/WizualizacjaKuchni/WizualizacjaKuchni';
import SaveAndContinueButton from '../../components/UI/SaveAndContinueButton/SaveAndContinueButton';
import KitchenState from '../../components/KitchenState/KitchenState';

import kitchenSinkIcon from '../../img/sprzety/kitchen_sink_icon.png';
import hobIcon from '../../img/sprzety/hob_icon.png';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import {Redirect} from 'react-router-dom';

class KreatorSzafki extends Component {
  render() {

      let wizualizacjaWymiary = {
          width: this.props.cabinetWidth/2 + "px",
          height: this.props.wysokoscSzafek/2 + "px",
      }
    return (
        <div className="contentWrapper">
        {this.props.kitchenParamsValid ? null : <Redirect to="/projekt/parametry-kuchni" /> }
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
                {this.props.hob ? <img src={hobIcon} className="hobIcon"/> : null}
                {this.props.kitchenSink ? <img src={kitchenSinkIcon} className="kitchenSinkIcon" /> : null}
                    <div className="ramySzafki" style={wizualizacjaWymiary}>
                        <WizualizacjaWnetrza
                            rodzaj={this.props.cabinetType}
                            ilosc={this.props.drawersHeights.length}
                            drawersHeights={this.props.drawersHeights}
                            activeDrawer={this.props.activeDrawer}
                            szczelina={this.props.szczelina}
                            ifDoubleDoors={this.props.doubleDoors}
                            shelfsCount={this.props.shelfsCount}
                        />
                    </div>
                    <div className="nogaSzafki">
                        <div></div>
                    </div>
                    <div className="nogaSzafki" style={{float: "right"}}>
                        <div></div>
                    </div>
                </div>
                <KitchenState />
            </div>
            {this.props.cabinets.length > 0 ? <WizualizacjaKuchni /> : null}
            <SaveAndContinueButton
                href='/projekt/lista-zakupow'
                resetErrors={this.props.calculateForms}
                active={this.props.kitchenCabinetsValid}
                showErrors={()=>this.props.onClickShowErrors(true)}
            />
            {this.props.showErrors ? <div className="szafkaNieprawidlowa">
            Suma szerokości szafek jest za mała - dodaj lub edytuj szafki</div> : null}
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
        kitchenParamsValid: state.validForm,
        kitchenCabinetsValid: state.kitchenCabinetsValid,
        showErrors: state.showErrors,
        doubleDoors: state.doubleDoors,
        shelfsCount: state.shelfsCount,
        hob: state.hob,
        kitchenSink: state.kitchenSink,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeCabinetType: (event) => dispatch({type: actionTypes.CHANGE_CABINET_TYPE, event: event}),
        onChangeDrawerCount: (event) => dispatch({type: actionTypes.CHANGE_DRAWER_COUNT, event: event}),
        onChangeCabinetWidth: (event) => dispatch({type: actionTypes.CHANGE_CABINET_WIDTH, event: event}),
        onAddCabinet: () => dispatch({type: actionTypes.ADD_CABINET}),
        calculateForms: () => dispatch({type: actionTypes.CALCULATE_FORMS}),
        onClickShowErrors: (ifShow)=> dispatch({type: actionTypes.SHOW_ERRORS, ifShow: ifShow}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KreatorSzafki);
