import React, { Component } from 'react';
import './App.css';

import MenuBar from '../components/UI/MenuBar/MenuBar';
import ShoppingList from './ShoppingList/ShoppingList';
import CabinetCreator from './CabinetCreator/CabinetCreator';
import Home from './Home/Home';
import KitchenParams from './KitchenParams/KitchenParams';
import ProjectBar from '../components/UI/ProjectBar/ProjectBar';
import WIP from '../components/WIP/WIP'; 
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';

import {Route, Switch, withRouter} from 'react-router-dom';

class App extends Component {
  render() {
      const {
          cabinets,
          showMobileMenu,
          onClickMenu,
          onClickHideMenu,
      } = this.props;
    return (
      <div className="App">
        <MenuBar
            inProgress = {cabinets.length > 0}
            clickMenu = {onClickMenu}
            hideMenu = {onClickHideMenu}
            showMobileMenu = {showMobileMenu}
        />
        <Route path="/projekt/" component={ProjectBar} />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/projekt/kreator-szafki" component={CabinetCreator} />
            <Route path="/projekt/parametry-kuchni" component={KitchenParams} />
            <Route path="/projekt/lista-zakupow" component={ShoppingList} />
            <Route path="" component={WIP} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        cabinets: state.cabinets,
        showMobileMenu: state.showMobileMenu,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickMenu: () => dispatch({type: actionTypes.CLICK_MENU}),
        onClickHideMenu: () => dispatch({type: actionTypes.HIDE_MENU})
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
