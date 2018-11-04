import React, {Component} from 'react';

import DrawerHeight from './DrawerHeight/DrawerHeight';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';

import * as actionTypes from '../../../store/actions/actionTypes';

import {connect} from 'react-redux';

class DrawersForm extends Component {
    constructor(props) {
        super(props);
        this.drawersForm = React.createRef();
    }

    componentDidUpdate () {
        this.props.onCabinetFormUpdate();
    }

    focusDrawer = (drawerId) => {
        this.props.onActiveDrawer(drawerId);
        window.scrollTo({top: this.drawersForm.current.offsetTop, behavior: 'smooth'})
    }

    render() {

        return(
            this.props.cabinetType.includes("szufla") ?
                <div className="formularzSzuflad">
                {this.props.cabinetType==="szuflady" ?
                <div>
                        <select
                            onChange={this.props.changeDrawerCount}
                            value={this.props.ilosc}
                            required
                            className="iloscPolek"
                        >
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        Liczba szuflad
                    </div>: null}
                    <span ref={this.drawersForm}>
                        Wysokość szuflad{this.props.drawersHeights.length === 1 ? "y" : null} (mm):
                    </span>
                    {this.props.drawersHeights.map((wysokosc, id) => {
                        let blockButtonClasses = "poleFormularzaSzuflad";
                        if (this.props.blockedDrawers[id]) {
                            blockButtonClasses = blockButtonClasses+" blue";
                        } else {
                            blockButtonClasses = blockButtonClasses+" red";
                        }
                        return (
                            <div key={id}>
                            {this.props.drawersHeights.length > 1 ?
                                <input
                                    type="button"
                                    className="poleFormularzaSzuflad green"
                                    onClick={() => this.props.onClickAutoFill(id)}
                                    value="Wypełnij"
                                />
                                :
                                null }
                            <DrawerHeight
                                key={id}
                                numerSzuflady={id+1}
                                zmianaWysokosci={(event) => this.props.onDrawerHeightChange(event, id)}
                                iloscSzuflad={this.props.drawersHeights.length}
                                wysokosc={wysokosc}
                                aktywnaSzuflada = {()=>this.focusDrawer(id)}
                                nieaktywnaSzuflada = {this.props.onDisactiveDrawer}
                                zablokowana = {this.props.blockedDrawers[id]}
                            />
                            {this.props.drawersHeights.length > 1 ?
                                <input
                                    type="button"
                                    onClick={()=>this.props.onClickBlockDrawer(id)}
                                    className={blockButtonClasses}
                                    value={this.props.blockedDrawers[id] ? "Odblokuj" : "Zablokuj"}
                                />
                                :
                                null }
                            {this.props.errorTypes[id] ? <ErrorMessage
                                errorType={this.props.errorTypes[id]}
                            /> : null}

                            </div>
                        )
                    })}
                    {this.props.drawersHeights.length > 1 ?
                    <input
                        type="button"
                        onClick={this.props.onClickAutoDrawers}
                        value="Wyrównaj wysokość szuflad"
                        className="przyciskWyrownajSzuflady blue" />
                    : null}
                </div>
            :
            null
        );
    }
}

const mapStateToProps = state => {
    return {
        drawersHeights: state.drawersHeights,
        errorTypes: state.errorTypes,
        blockedDrawers: state.blockedDrawers,
        cabinetType: state.cabinetType,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDrawerHeightChange: (event, id) => dispatch({type: actionTypes.CHANGE_DRAWER_HEIGHT, event: event, id: id}),
        onClickAutoFill: (id) => dispatch({type: actionTypes.DRAWERS_AUTO_FILL, id: id}),
        onActiveDrawer: (id) => dispatch({type: actionTypes.ACTIVE_DRAWER, id: id}),
        onDisactiveDrawer: () => dispatch({type: actionTypes.DISACTIVE_DRAWER}),
        onCabinetFormUpdate: () => dispatch({type: actionTypes.CHECK_CABINET}),
        onClickAutoDrawers: () => dispatch({type: actionTypes.AUTO_ADJUST_DRAWERS}),
        onClickBlockDrawer: (id) => dispatch({type: actionTypes.BLOCK_DRAWER, id: id}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawersForm);
