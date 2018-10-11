import React, { Component } from 'react';
import './App.css';

import MenuBar from '../components/UI/MenuBar/MenuBar';
import Instrukcja from '../components/Porady/JakKorzystac';
import ListaZakupow from './ListaZakupow/ListaZakupow';
import KreatorSzafki from './KreatorSzafki/KreatorSzafki';
import Home from './Home/Home';
import ParametryKuchni from './ParametryKuchni/ParametryKuchni';
import ProjectBar from '../components/UI/ProjectBar/ProjectBar';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';

import {Route, Switch, withRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar
            inProgress = {this.props.cabinets.length > 0}
            clickMenu = {this.props.onClickMenu}
            hideMenu = {this.props.onClickHideMenu}
            showMobileMenu = {this.props.showMobileMenu}
        />
        <Route path="/projekt/" component={ProjectBar} />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/instrukcja/" component={Instrukcja}/>
            <Route path="/projekt/kreator-szafki" component={KreatorSzafki} />
            <Route path="/projekt/parametry-kuchni" component={ParametryKuchni} />
            <Route path="/projekt/lista-zakupow" component={ListaZakupow} />
        </Switch>
        {/* <h1 className="header">Kitchen planner<span className="redDot">.</span></h1> */}


        {/* <SizeInput
            enterSize={(event) => this.props.onChangeRoomSize(event)}
        /> */}

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
        glebokoscSzafek: state.cabinetDepth,
        iloscSzafek: state.cabinetsCount,
        formatki: state.formatki,
        drawersHeights: state.drawersHeights,
        activeDrawer: state.activeDrawer,
        iloscSzuflad: state.drawersHeights.length,
        canAddCabinet: state.cabinetValid,
        cabinetWidth: state.cabinetWidth,
        cabinetType: state.cabinetType,
        showForms: state.showForms,
        showMobileMenu: state.showMobileMenu,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeRoomSize: (event) => dispatch({type: actionTypes.CHANGE_ROOM_SIZE, event: event}),
        onChangeCabinetType: (event) => dispatch({type: actionTypes.CHANGE_CABINET_TYPE, event: event}),
        onChangeDrawerCount: (event) => dispatch({type: actionTypes.CHANGE_DRAWER_COUNT, event: event}),
        onChangeCabinetWidth: (event) => dispatch({type: actionTypes.CHANGE_CABINET_WIDTH, event: event}),
        onAddCabinet: () => dispatch({type: actionTypes.ADD_CABINET}),
        onClickMenu: () => dispatch({type: actionTypes.CLICK_MENU}),
        onClickHideMenu: () => dispatch({type: actionTypes.HIDE_MENU})
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
