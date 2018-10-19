import React, { Component } from 'react';
import WizualizacjaWnetrza from '../WizualizacjaWnetrza/WizualizacjaWnetrza';
import kitchenSinkIcon from '../../img/sprzety/kitchen_sink_icon.png';
import hobIcon from '../../img/sprzety/hob_icon.png';
import './WizualizacjaSzafki.css';

class WizualizacjaSzafki extends Component {
  render() {
      let wizualizacjaWymiary = {
          width: this.props.cabinetWidth/this.props.scale + "px",
          height: this.props.cabinetsHeight/this.props.scale + "px",
      }

      let wizualizacjaWymiaryGorne = {
          width: this.props.cabinetWidth/this.props.scale + "px",
          height: this.props.upperCabinetsHeight/this.props.scale + "px",
      }

      let noga = {
          width: 100/this.props.scale + "px",
          height: 100/this.props.scale + "px",
          borderTopWidth: 20/this.props.scale + "px",
          borderBottomWidth: 20/this.props.scale + "px",
      }

      let nogaTrzpien = {
          width: 50/this.props.scale + "px",
      }

      let devicesContainer = {
          height: this.props.kitchenType.includes("edenRzad") ? 150/this.props.scale + "px" : 500/this.props.scale + "px",
          backgroundColor: this.props.kitchenType.includes('edenRzad') ? 'transparent' : null,
      }

    return (
      <div className="wizualizacjaSzafki" style={{width: wizualizacjaWymiary.width}}>
          {!this.props.kitchenType.includes("edenRzad") ?
              <div
                  className="ramySzafki gorneRamy"
                  style={wizualizacjaWymiaryGorne}
              >
                  <WizualizacjaWnetrza
                      rodzaj={this.props.upperCabinetsType}
                      ilosc="1"
                      drawersHeights={this.props.drawersHeights}
                      szczelina={this.props.space}
                      ifDoubleDoors={this.props.upperDoubleDoors}
                      shelfsCount={this.props.upperShelfsCount}
                      editInProgress = {this.props.editInProgress}
                  />
              </div>
          :null}
          {/* Turning off device-container when no device and one-row kitchen type */}
          {this.props.hob || this.props.kitchenSink || !this.props.kitchenType.includes("edenRzad") ?
          <div className="devicesContainer" style={devicesContainer}>
            {this.props.hob ?
                <img
                    src={hobIcon}
                    style={{width: 580/this.props.scale +"px", zIndex: "2"}}
                    alt="Płyta grzewcza"
                />
            : null}
            {this.props.kitchenSink ?
                <img
                    src={kitchenSinkIcon}
                    style={{width: 260/this.props.scale +"px", zIndex: "2"}}
                    alt="Zlewozmywak"
                />
            : null}
          </div> : null}
          <div className="ramySzafki" style={wizualizacjaWymiary}>
              <WizualizacjaWnetrza
                  rodzaj={this.props.cabinetType}
                  ilosc={this.props.drawersHeights.length}
                  drawersHeights={this.props.drawersHeights}
                  activeDrawer={this.props.activeDrawer}
                  szczelina={this.props.space}
                  ifDoubleDoors={this.props.ifDoubleDoors}
                  shelfsCount={this.props.shelfsCount}
                  scale = {this.props.scale}
                  editInProgress = {this.props.editInProgress}
              />
          </div>
          <div className="nogaSzafki" style={noga}>
              <div style={nogaTrzpien}></div>
          </div>
          <div className="nogaSzafki prawa" style={noga}>
              <div style={nogaTrzpien}></div>
          </div>
      </div>
    );
  }
}
export default WizualizacjaSzafki;
