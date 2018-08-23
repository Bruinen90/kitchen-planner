import React, {Component} from 'react';

import WysokoscSzuflady from './WysokoscSzuflady/WysokoscSzuflady';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';

import * as actionTypes from '../../../store/actions/actionTypes';

import {connect} from 'react-redux';

class FormularzSzuflad extends Component {
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
                        return <div><WysokoscSzuflady
                            key={id}
                            numerSzuflady={id+1}
                            zmianaWysokosci={(event) => this.props.onDrawerHeightChange(event, id)}
                            iloscSzuflad={this.props.drawersHeights.length}
                            wysokosc={wysokosc}
                            aktywnaSzuflada = {() => this.props.onActiveDrawer(id)}
                            nieaktywnaSzuflada = {this.props.onDisactiveDrawer}
                        />
                        {this.props.drawersHeights.length > 1 ?
                            <input type="button" onClick={() => this.props.onClickAutoFill(id)} value="Wypełnij" /> :
                            null }
                        {this.props.errorTypes[id] ? <ErrorMessage
                            errorType={this.props.errorTypes[id]}
                        /> : null}

                        </div>
                    })}

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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDrawerHeightChange: (event, id) => dispatch({type: actionTypes.CHANGE_DRAWER_HEIGHT, event: event, id: id}),
        onClickAutoFill: (id) => dispatch({type: actionTypes.DRAWERS_AUTO_FILL, id: id}),
        onActiveDrawer: (id) => dispatch({type: actionTypes.ACTIVE_DRAWER, id: id}),
        onDisactiveDrawer: () => dispatch({type: actionTypes.DISACTIVE_DRAWER}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularzSzuflad);
