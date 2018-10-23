import React, { Component } from 'react';
import './KreatorSzafki.css';

import FormularzNowejSzafki from '../../components/FormularzNowejSzafki/FormularzNowejSzafki';
import WizualizacjaKuchni from '../../components/WizualizacjaKuchni/WizualizacjaKuchni';
import SaveAndContinueButton from '../../components/UI/SaveAndContinueButton/SaveAndContinueButton';
import KitchenState from '../../components/KitchenState/KitchenState';
import WizualizacjaSzafki from '../../components/WizualizacjaSzafki/WizualizacjaSzafki';
import ListaSzafek from '../../components/ListaSzafek/ListaSzafek';
import MobileButton from '../../components/UI/MobileButton/MobileButton';
import Auxx from '../../Auxx';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import {Redirect} from 'react-router-dom';

class KreatorSzafki extends Component {
  render() {
    return (
        <Auxx>
        {this.props.kitchenParamsValid ? null : <Redirect to="/projekt/parametry-kuchni" /> }
            <div className="kreatorNowejSzafki">
                <div className="formularzCol">
                    <FormularzNowejSzafki
                        changeType = {(event) => this.props.onChangeCabinetType(event)}
                        changeWidth = {(event) => this.props.onChangeCabinetWidth(event)}
                        changeDrawerCount = {(event) => this.props.onChangeDrawerCount(event)}
                        ilosc = {this.props.iloscSzuflad}
                        clickDodaj = {this.props.onAddCabinet}
                        canAddCabinet = {this.props.canAddCabinet}
                    />
                </div>
                {this.props.cabinetWidth>200 && this.props.cabinetWidth <901 ? <div className="wizualizacjaSzafkiCol">
                    <WizualizacjaSzafki
                        cabinetWidth = {this.props.cabinetWidth}
                        cabinetsHeight = {this.props.wysokoscSzafek}
                        upperCabinetsHeight = {this.props.wysokoscGornychSzafek}
                        upperCabinetsType = "jedneDrzwi"
                        kitchenType = {this.props.kitchenType}
                        drawersHeights = {this.props.drawersHeights}
                        scale = {4}
                        iloscGora="1"
                        space={this.props.szczelina}
                        upperDoubleDoors={this.props.upperDoubleDoors}
                        upperShelfsCount={this.props.upperShelfsCount}
                        hob = {this.props.hob}
                        kitchenSink = {this.props.kitchenSink}
                        cabinetType={this.props.cabinetType}
                        activeDrawer={this.props.activeDrawer}
                        ifDoubleDoors={this.props.doubleDoors}
                        shelfsCount={this.props.shelfsCount}
                    />
                </div> : null}
                <div className="kitchenStateCol">
                    <KitchenState />
                </div>
            </div>
            {this.props.cabinets.length > 0 && window.innerWidth>950 ? <WizualizacjaKuchni /> : null}
            {window.innerWidth>950 ? null :
                <SaveAndContinueButton
                href='/projekt/parametry-kuchni'
                resetErrors={this.props.calculateForms}
                active={true}
                back={true}
                />
            }
            <SaveAndContinueButton
                href='/projekt/lista-zakupow'
                resetErrors={this.props.calculateForms}
                active={this.props.kitchenCabinetsValid}
                showErrors={()=>this.props.onClickShowErrors(true)}
                back={false}
            />
            <MobileButton
                color="blue"
                ionicIconName="list"
                hide={false}
                whenClicked="actionWhenClicked"
                position={-2}
            />
            {this.props.showErrors ? <div className="szafkaNieprawidlowa">
            Suma szerokości szafek jest za mała - dodaj lub edytuj szafki</div> : null}
            <ListaSzafek
                cabinets = {this.props.cabinets}
            />
        </Auxx>
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
        wysokoscGornychSzafek: state.upperCabinetHeight,
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
        upperDoubleDoors: state.upperDoubleDoors,
        upperShelfsCount: state.upperShelfsCount,
        hob: state.hob,
        kitchenSink: state.kitchenSink,
        kitchenType: state.kitchenType,
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
