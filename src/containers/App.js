import React, { Component } from 'react';
import './App.css';
import MenuBar from '../components/UI/MenuBar';
import SizeInput from '../components/SizeInput';
import Instrukcja from '../components/Porady/JakKorzystac';
import FormularzNowejSzafki from '../components/FormularzNowejSzafki/FormularzNowejSzafki';
import WizualizacjaWnetrza from '../components/WizualizacjaWnetrza/WizualizacjaWnetrza';
import WykazFormatek from '../components/WykazFormatek';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import {connect} from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';


class App extends Component {
    state = {
        sizeD: 550,
        wysokoscSzafek: 750,
        glebokoscSzafek: 550,
        instrukcjaPrint: false,
        szafki: [
            {   id: 1,
                rodzaj: "",
                szerokosc: "600",
                iloscSzuflad: 3,
            }
        ],
        formatki: [],
        iloscSzafek: 0,
    }

    showHowToUse = () => {
        this.setState({
            instrukcjaPrint: !this.state.instrukcjaPrint,
        })
    }

    changeCabinetType = (event) => {
        const currentCabinet = {...this.state};
        currentCabinet.szafki[0].rodzaj = event.target.value;
        this.setState(currentCabinet);
    }

    changeCabinetWidth = (event) => {
        const currentCabinet = {...this.state};
        currentCabinet.szafki[0].szerokosc = event.target.value;
        this.setState(currentCabinet)
    }

    changeDrawerCount = (event) => {
        const currentCabinet = {...this.state};
        currentCabinet.szafki[0].iloscSzuflad = event.target.value;
        this.setState(currentCabinet)
    }

    cabinetComplete = () => {
        let newCabinetArray = [];
        const trawersy = {
            ilosc: 2,
            wymiary: this.state.glebokoscSzafek.toString()+"x"+(this.state.szafki[0].szerokosc-36).toString()+"mm",
            okleina: 'd1',
            typPlyty: '18mm',
        }
        if (this.state.glebokoscSzafek > this.state.szafki[0].szerokosc-36) {
            trawersy.okleina = 'k1';
        }

        newCabinetArray.push(trawersy);

        const boki = {
            ilosc: 2,
            wymiary: this.state.glebokoscSzafek.toString()+"x"+this.state.wysokoscSzafek.toString()+"mm",
            okleina: 'd1',
            typPlyty: '18mm',
        }
        if (this.state.glebokoscSzafek > this.state.wysokoscSzafek) {
            boki.okleina = 'k1';
        }

        newCabinetArray.push(boki);

        let fronty = "";
        if (this.state.szafki[0].rodzaj === 'jedneDrzwi') {
            fronty = [{
                ilosc: 1,
                wymiary: (this.state.wysokoscSzafek-3).toString()+"x"+(this.state.szafki[0].szerokosc-3).toString()+"mm",
                okleina: "full",
                typPlyty: 'front',
            }]
        } else if (this.state.szafki[0].rodzaj === 'szufladaDrzwi') {
            fronty = [{
                ilosc: 1,
                wymiary: (this.state.wysokoscSzafek/3-3).toString()+"x"+(this.state.szafki[0].szerokosc-3).toString()+"mm",
                okleina: "full",
                typPlyty: 'front',
            },
            {   ilosc: 1,
                wymiary: (2*this.state.wysokoscSzafek/3-3).toString()+"x"+(this.state.szafki[0].szerokosc-3).toString()+"mm",
                okleina: 'full',
                typPlyty: 'front',
            },]
        } else if (this.state.szafki[0].rodzaj === 'szuflady') {
            fronty = [{
                ilosc: this.state.szafki[0].iloscSzuflad,
                wymiary: (this.state.wysokoscSzafek/this.state.szafki[0].iloscSzuflad-3).toString()+"x"+(this.state.szafki[0].szerokosc-3).toString()+"mm",
                okleina: 'full',
                typPlyty: 'front',
            }]
        }

        newCabinetArray.push(fronty);

        this.setState(
            {
                formatki: newCabinetArray,
                iloscSzafek: this.state.iloscSzafek+1,
            }
        )

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
      //
      // let bokiPrint = '';
      // if(this.state.formatki[0]) {
      //     bokiPrint = this.state.formatki[0].wymiary;
      // }
      let listaFormatek = "";
      if (this.state.iloscSzafek > 0) {
          listaFormatek= <WykazFormatek
          trawersyWymiary={this.state.formatki[0].wymiary}
          trawersyIlosc={this.state.formatki[0].ilosc}
          trawersyOkleina={this.state.formatki[0].okleina}
          bokiWymiary={this.state.formatki[1].wymiary}
          bokiIlosc={this.state.formatki[1].ilosc}
          bokiOkleina={this.state.formatki[1].okleina}
          fronty={this.state.formatki[2]}
          />
      }



      let instrukcja = ""
      if (this.state.instrukcjaPrint) {
          instrukcja = <Instrukcja />;
      }

      let wizualizacjaWymiary = {
          width: this.state.szafki[0].szerokosc/2 + "px",
          height: this.state.wysokoscSzafek/2 + "px",
      }


    return (
      <div className="App">

        <MenuBar
            jakKorzystac={this.showHowToUse}
        />
        {instrukcja}
        <h1 className="header">Kitchen planner<span className="red">.</span></h1>


        <div className="roomBorders" style={roomSize}>
        </div>

        <SizeInput
            enterSize={(event) => this.props.onChangeRoomSize(event)}
        />

        {/* <PrzyciskDodaj
            click={this.addCabinet}
        /> */}

        <FormularzNowejSzafki
            changeType = {(event) => this.changeCabinetType(event)}
            changeWidth = {(event) => this.changeCabinetWidth(event)}
            changeDrawerCount = {(event) => this.changeDrawerCount(event)}
            ilosc = {this.state.szafki[0].iloscSzuflad}
            clickDodaj = {this.cabinetComplete}
        />

        <div className="wizualizacjaSzafki" style={wizualizacjaWymiary}>
            <WizualizacjaWnetrza rodzaj={this.state.szafki[0].rodzaj} ilosc={this.state.szafki[0].iloscSzuflad} />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeRoomSize: (event) => dispatch({type: actionTypes.CHANGE_ROOM_SIZE, event: event})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
