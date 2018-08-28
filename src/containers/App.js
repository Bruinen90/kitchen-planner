import React, { Component } from 'react';
import './App.css';
import './kitchenVis.css';

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
      const kitchenVisual = this.props.cabinets.map(cabinet => {
          let szafkaWymiary = {
              width: cabinet.cabinetWidth/4 + "px",
              height: this.props.wysokoscSzafek/4 + "px",
          }
          return (

                  <div className="wizualizacjaSzafki malaSzafka">
                      <div className="ramySzafki maleRamy" style={szafkaWymiary}>
                          <WizualizacjaWnetrza
                              rodzaj={cabinet.cabinetType}
                              ilosc={cabinet.drawersHeights.length}
                              drawersHeights={cabinet.drawersHeights}
                              szczelina={this.props.szczelina}
                              activeDrawer={null}
                              rozmiar="small"
                          />
                      </div>
                      <div className="nogaSzafki malaNoga">
                          <div></div>
                      </div>
                      <div className="nogaSzafki malaNoga" style={{float: "right"}}>
                          <div></div>
                      </div>
                  </div>


          )
      })

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
              />
      }


      let instrukcja = ""
      if (this.state.instrukcjaPrint) {
          instrukcja = <Instrukcja />;
      }

      let wizualizacjaWymiary = {
          width: this.props.cabinetWidth/2 + "px",
          height: this.props.wysokoscSzafek/2 + "px",
      }


    return (
      <div className="App">

        <MenuBar
            jakKorzystac={this.showHowToUse}
        />

        {instrukcja}

        <h1 className="header">Kitchen planner<span className="redDot">.</span></h1>
        {/* <div className="roomBorders" style={roomSize}>
        </div> */}
        <div className="rzadSzafek">{kitchenVisual}</div>

        {/*<SizeInput
            enterSize={(event) => this.props.onChangeRoomSize(event)}
        /> */}

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
                        rodzaj={this.props.cabinetType}
                        ilosc={this.props.drawersHeights.length}
                        drawersHeights={this.props.drawersHeights}
                        activeDrawer={this.props.activeDrawer}
                        szczelina={this.props.szczelina}
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
        cabinets: state.cabinets,
        sizeW: state.kitchenWidth,
        sizeH: state.kitchenHeight,
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
