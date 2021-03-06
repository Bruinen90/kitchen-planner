import React, { Component } from 'react';
import './CabinetCreator.css';

import NewCabinetForm from '../../components/NewCabinetForm/NewCabinetForm';
import KitchenVisualization from '../../components/KitchenVisualization/KitchenVisualization';
import SaveAndContinueButton from '../../components/UI/SaveAndContinueButton/SaveAndContinueButton';
import KitchenState from '../../components/KitchenState/KitchenState';
import CabinetVisualization from '../../components/CabinetVisualization/CabinetVisualization';
import CabinetsList from '../../components/CabinetsList/CabinetsList';
import MobileButton from '../../components/UI/MobileButton/MobileButton';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import {Redirect} from 'react-router-dom';

class CabinetCreator extends Component {
    componentDidMount () {
        window.scrollTo(0, 0);
    }

    componentDidUpdate () {
        if(this.props.kitchenCabinetsValid) {
            window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
        }
    }

  render() {
    return (
        <React.Fragment>
        {this.props.kitchenParamsValid ? null : <Redirect to="/projekt/parametry-kuchni" /> }
            <div className="kreatorNowejSzafki">
                <div className="formularzCol">
                    <NewCabinetForm
                        changeType = {(event) => this.props.onChangeCabinetType(event)}
                        changeWidth = {(event) => this.props.onChangeCabinetWidth(event)}
                        changeDrawerCount = {(event) => this.props.onChangeDrawerCount(event)}
                        ilosc = {this.props.iloscSzuflad}
                        clickDodaj = {this.props.onAddCabinet}
                        canAddCabinet = {this.props.canAddCabinet}
                    />
                </div>
                {this.props.cabinetWidth>200 && this.props.cabinetWidth <901 ? <div className="wizualizacjaSzafkiCol">
                    <CabinetVisualization
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
            {this.props.cabinets.length > 0 && window.innerWidth>950 ? <KitchenVisualization /> : null}
            {window.innerWidth>950 ? null :
                <MobileButton
                    color="green"
                    ionicIconName="arrow-round-back"
                    whenClicked={()=>this.props.history.push("/projekt/parametry-kuchni")}
                    position={0}
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
                hide={this.props.cabinets.length === 0}
                whenClicked={()=>this.props.onClickToggler("showCabinetsList")}
                position={1}
                ifAlternative = {this.props.showCabinetsList}
                alternativeIconName="arrow-dropdown"
                alternativeCss={{fontSize: "72px"}}
            />
            <MobileButton
                color="white"
                customCss = {{border: "1px solid #555", color: "#777"}}
                customText = {String(this.props.cabinets.length)}
                position={this.props.cabinets.length === 0 ? 1 : 2}
            />
            {this.props.showErrors ? <div className="szafkaNieprawidlowa">
            Suma szerokości szafek jest za mała - dodaj lub edytuj szafki</div> : null}
            <CabinetsList
                cabinets = {this.props.cabinets}
                show = {this.props.showCabinetsList && this.props.cabinets.length > 0}
                clickHide = {()=>this.props.onClickToggler("showCabinetsList")}
            />
        </React.Fragment>
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
        showCabinetsList: state.showCabinetsList,
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
        onClickToggler: (toggledParamName) => dispatch({type: actionTypes.TOGGLER, toggledParamName: toggledParamName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CabinetCreator);
