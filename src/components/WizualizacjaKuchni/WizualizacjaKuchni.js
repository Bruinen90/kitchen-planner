import React, { Component } from 'react';
import {connect} from 'react-redux';
import WizualizacjaWnetrza from '../WizualizacjaWnetrza/WizualizacjaWnetrza';
import * as actionTypes from '../../store/actions/actionTypes';
import './WizualizacjaKuchni.css';
import WizualizacjaSzafki from '../WizualizacjaSzafki/WizualizacjaSzafki';

import kitchenSinkIcon from '../../img/sprzety/kitchen_sink_icon.png';
import hobIcon from '../../img/sprzety/hob_icon.png';

class WizualizacjaKuchni extends Component {
    render() {
        let roomSize = {
            width: this.props.kitchenWidth/this.props.scale + 'px',
            height: this.props.kitchenHeight/this.props.scale + 'px',
        }
        const kitchenVisual = this.props.cabinets.map(cabinet => {
            // let szafkaWymiary = {
            //     width: cabinet.cabinetWidth/this.props.scale + "px",
            //     height: this.props.wysokoscSzafek/this.props.scale + "px",
            // }
            // let szafkaGornaWymiary = {
            //     width: cabinet.cabinetWidth/this.props.scale + "px",
            //     height: this.props.wysokoscGornychSzafek/this.props.scale + "px",
            // }
            let showIfHovered = {};
            let overlayOpacity = {};
            if(cabinet.cabinetId === this.props.hoveredCabinet) {
                showIfHovered = {opacity: "1"};
                overlayOpacity = {opacity: "0.7"};
            }

            return (
                    <div
                        key={cabinet.cabinetId}
                        className="cabinetWrapper"
                        onMouseOver={()=>this.props.onHoverCabinet(cabinet.cabinetId)}
                        onMouseOut={()=>this.props.onHoverCabinet(false)}
                    >
                        <div className="buttons" style={showIfHovered}>
                            <button
                                className="green"
                                onClick={()=>this.props.onClickEditCabinet(cabinet.cabinetId)}
                            >
                                Edytuj
                            </button>
                            <button
                                className="red"
                                onClick={()=>this.props.onClickDeleteCabinet(cabinet.cabinetId)}
                            >
                                Usuń
                            </button>
                            <div className="moveCabinetButtons">
                            <button
                                className={this.props.canMove.left? "blue" : "disabledButton"}
                                onClick={
                                    this.props.canMove.left ?
                                    ()=>this.props.onClickMoveCabinet(cabinet.cabinetId, -1)
                                    : null}
                            >
                                &#11207;
                            </button>
                            <button
                                className={this.props.canMove.right ? "blue" : "disabledButton"}
                                onClick={this.props.canMove.right ?
                                    ()=>this.props.onClickMoveCabinet(cabinet.cabinetId, +1)
                                    : null}
                            >
                                &#11208;
                            </button>
                            </div>
                        </div>

                        <WizualizacjaSzafki
                            cabinetWidth = {cabinet.cabinetWidth}
                            cabinetsHeight = {this.props.wysokoscSzafek}
                            upperCabinetsHeight = {this.props.wysokoscGornychSzafek}
                            upperCabinetsType = "jedneDrzwi"
                            kitchenType = {this.props.kitchenType}
                            drawersHeights = {cabinet.drawersHeights}
                            scale = {this.props.scale}
                            iloscGora="1"
                            space={this.props.szczelina}
                            upperDoubleDoors={cabinet.upperDoubleDoors}
                            upperShelfsCount={cabinet.upperShelfsCount}
                            hob = {cabinet.hob}
                            kitchenSink = {cabinet.kitchenSink}
                            cabinetType={cabinet.cabinetType}
                            ifDoubleDoors={cabinet.doubleDoors}
                            shelfsCount={cabinet.shelfsCount}
                            editInProgress={
                                this.props.currentlyEditedCabinetId===cabinet.cabinetId
                                &&this.props.editInProgress}
                        />

                        {/* {!this.props.kitchenType.includes("edenRzad") ?
                        <div
                            className="ramySzafki gorneRamy"
                            style={szafkaGornaWymiary}
                        >
                            <WizualizacjaWnetrza
                                rodzaj="jedneDrzwi"
                                ilosc="1"
                                drawersHeights={[]}
                                szczelina={this.props.szczelina}
                                ifDoubleDoors={cabinet.upperDoubleDoors}
                                shelfsCount={cabinet.upperShelfsCount}
                                rozmiar="small"
                                skala={this.props.scale}
                                editInProgress={
                                    this.props.currentlyEditedCabinetId===cabinet.cabinetId
                                    &&this.props.editInProgress}
                            />
                        </div>
                        :null}

                        <div className="devicesContainer" style={{height: 130*4/this.props.scale+"px"}}>
                            {cabinet.hob ?
                                <img
                                    src={hobIcon}
                                    className="hobIcon"
                                    alt="Płyta grzewcza"
                                    style={{width: 600/this.props.scale+"px"}}
                                />
                            : null}
                            {cabinet.kitchenSink ?
                                <img
                                    src={kitchenSinkIcon}
                                    className="kitchenSinkIcon"
                                    alt="Zlewozmywak"
                                    style={{width: 260/this.props.scale+"px"}}
                                />
                            : null}
                        </div>

                        <div className="ramySzafki maleRamy" style={szafkaWymiary}>

                            <WizualizacjaWnetrza
                                rodzaj={cabinet.cabinetType}
                                ilosc={cabinet.drawersHeights.length}
                                drawersHeights={cabinet.drawersHeights}
                                szczelina={this.props.szczelina}
                                activeDrawer={null}
                                ifDoubleDoors={cabinet.doubleDoors}
                                shelfsCount={cabinet.shelfsCount}
                                rozmiar="small"
                                skala={this.props.scale}
                                editInProgress={
                                    this.props.currentlyEditedCabinetId===cabinet.cabinetId
                                    &&this.props.editInProgress}
                            />

                        </div>
                        <div className="nogaSzafki malaNoga">
                          <div></div>
                        </div>
                        <div className="nogaSzafki malaNoga" style={{float: "right"}}>
                            <div></div>
                        </div> */}
                        <div className="cabinetOverlay" style={overlayOpacity}></div>
                    </div>
            )
        })

    return (
        <div className="contentWrapper" style={{opacity: this.props.cabinets.length > 0 ? "1" : "0"}}>
            <div className="header">Twoja kuchnia</div>
            <div className="rzadSzafek" style={roomSize}>
              {kitchenVisual}
            </div>
        </div>

    );
  }
}
const mapStateToProps = state => {
    return {
        currentlyEditedCabinetId: state.cabinetId,
        editInProgress: state.editInProgress,
        kitchenWidth: state.kitchenWidth,
        kitchenHeight: state.kitchenHeight,
        cabinets: state.cabinets,
        scale: state.scale,
        wysokoscSzafek: state.cabinetHeight,
        hoveredCabinet: state.hoveredCabinet,
        szczelina: state.spaceBetweenDrawers,
        canMove: state.canMove,
        hob: state.hob,
        kitchenSink: state.kitchenSink,
        kitchenType: state.kitchenType,
        wysokoscGornychSzafek: state.upperCabinetHeight,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onHoverCabinet: (cabinetId) =>
            dispatch({type: actionTypes.HOVER_CABINET_ON_VISUALIZATION, cabinetId: cabinetId}),
        onClickEditCabinet: (cabinetId) =>
            dispatch({type: actionTypes.EDIT_CABINET, cabinetId: cabinetId}),
        onClickDeleteCabinet: (cabinetId) =>
            dispatch({type: actionTypes.DELETE_CABINET, cabinetId: cabinetId}),
        onClickMoveCabinet: (cabinetId, positionChange) =>
            dispatch({type: actionTypes.MOVE_CABINET, cabinetId: cabinetId, positionChange: positionChange})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WizualizacjaKuchni);
