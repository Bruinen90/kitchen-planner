import React, { Component } from 'react';
import './App.css';

import MenuBar from '../components/UI/MenuBar';
import SizeInput from '../components/SizeInput';
import Instrukcja from '../components/Porady/JakKorzystac';
import FormularzNowejSzafki from '../components/FormularzNowejSzafki/FormularzNowejSzafki';
import WizualizacjaWnetrza from '../components/WizualizacjaWnetrza/WizualizacjaWnetrza';
import WykazFormatek from '../components/WykazFormatek';

import {connect} from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';


class App extends Component {
    state = {
        instrukcjaPrint: false,
    }

    showHowToUse = () => {
        this.setState({
            instrukcjaPrint: !this.state.instrukcjaPrint,
        })
    }

  render() {
      let roomSize = {
          width: this.props.sizeW,
          height: this.props.sizeH,
      }

      // let blatPrint = "";
      //
      // if (this.state.blat) {
      //     blatPrint = "Blat: " + this.state.blat + " mm"
      // }

      let listaFormatek = "";
      if (this.props.iloscSzafek > 0) {
          const formatki = this.props.formatki;
          listaFormatek=
              <WykazFormatek
                  trawersyWymiary={formatki[0].wymiary}
                  trawersyIlosc={formatki[0].ilosc}
                  trawersyOkleina={formatki[0].okleina}
                  bokiWymiary={formatki[1].wymiary}
                  bokiIlosc={formatki[1].ilosc}
                  bokiOkleina={formatki[1].okleina}
                  fronty={formatki[2]}
              />
      }


      let instrukcja = ""
      if (this.state.instrukcjaPrint) {
          instrukcja = <Instrukcja />;
      }

      let wizualizacjaWymiary = {
          width: this.props.szafki[0].szerokosc/2 + "px",
          height: this.props.wysokoscSzafek/2 + "px",
      }


    return (
      <div className="App">

        <MenuBar
            jakKorzystac={this.showHowToUse}
        />

        {instrukcja}

        <h1 className="header">Kitchen planner<span className="red">.</span></h1>
        {/* <div className="roomBorders" style={roomSize}>
        </div> */}

        <SizeInput
            enterSize={(event) => this.props.onChangeRoomSize(event)}
        />

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
                <div className="ramySzafki" style={wizualizacjaWymiary}>
                    <WizualizacjaWnetrza
                        rodzaj={this.props.szafki[0].rodzaj}
                        ilosc={this.props.iloscSzuflad}
                    />
                </div>
                <div className="nogaSzafki">
                    <div></div>
                </div>
                <div className="nogaSzafki" style={{float: "right"}}>
                    <div></div>
                </div>
            </div>
        </div>

            {listaFormatek}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        sizeW: state.kitchenWidth,
        sizeH: state.kitchenHeight,
        wysokoscSzafek: state.cabinetHeight,
        glebokoscSzafek: state.cabinetDepth,
        szafki: state.cabinets,
        iloscSzafek: state.cabinetsCount,
        formatki: state.formatki,
        iloscSzuflad: state.drawersHeights.length,
        canAddCabinet: state.cabinetValid,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeRoomSize: (event) => dispatch({type: actionTypes.CHANGE_ROOM_SIZE, event: event}),
        onChangeCabinetType: (event) => dispatch({type: actionTypes.CHANGE_CABINET_TYPE, event: event}),
        onChangeDrawerCount: (event) => dispatch({type: actionTypes.CHANGE_DRAWER_COUNT, event: event}),
        onChangeCabinetWidth: (event) => dispatch({type: actionTypes.CHANGE_CABINET_WIDTH, event: event}),
        onAddCabinet: () => dispatch({type: actionTypes.ADD_CABINET}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
