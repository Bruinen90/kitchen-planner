import React, {Component} from 'react';

import WysokoscSzuflady from './WysokoscSzuflady/WysokoscSzuflady';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';

import * as actionTypes from '../../../store/actions/actionTypes';

import {connect} from 'react-redux';

class FormularzSzuflad extends Component {
    componentDidUpdate () {
        this.props.onCabinetFormUpdate();
    }

    render() {

        return(
            this.props.drawersHeights.length > 0 ?
                <div className="formularzSzuflad">
                {this. props.drawersHeights.length >1 ?
                <div>
                Liczba szuflad:
                <input
                    type="number"
                    min="2"
                    max="4"
                    onChange={this.props.changeDrawerCount}
                    value={this.props.ilosc}
                    required
                /><br/></div> : null}
                    Wysokość szuflad{this.props.drawersHeights.length === 1 ? "y" : null} (mm):
                    {this.props.drawersHeights.map((wysokosc, id) => {
                        let blockButtonClasses = "poleFormularzaSzuflad";
                        if (this.props.blockedDrawers[id]) {
                            blockButtonClasses = blockButtonClasses+ " " + "blue";
                        } else {
                            blockButtonClasses = blockButtonClasses+ " " + "red";
                        }
                        return (
                            <div>
                            {this.props.drawersHeights.length > 1 ?
                                <input
                                    type="button"
                                    className="poleFormularzaSzuflad green"
                                    onClick={() => this.props.onClickAutoFill(id)}
                                    value="Wypełnij"
                                />
                                :
                                null }
                            <WysokoscSzuflady
                                key={id}
                                numerSzuflady={id+1}
                                zmianaWysokosci={(event) => this.props.onDrawerHeightChange(event, id)}
                                iloscSzuflad={this.props.drawersHeights.length}
                                wysokosc={wysokosc}
                                aktywnaSzuflada = {() => this.props.onActiveDrawer(id)}
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
                        className="przyciskWyrownajSzuflady" />
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

export default connect(mapStateToProps, mapDispatchToProps)(FormularzSzuflad);
