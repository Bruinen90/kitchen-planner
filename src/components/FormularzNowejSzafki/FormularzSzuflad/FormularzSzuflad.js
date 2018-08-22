import React, {Component} from 'react';

import WysokoscSzuflady from './WysokoscSzuflady/WysokoscSzuflady';

import * as actionTypes from '../../../store/actions/actionTypes';

import {connect} from 'react-redux';

class FormularzSzuflad extends Component {
    render() {
        return(
            this.props.drawersHeights.length > 0 ?
                <div className="formularzSzuflad">
                    Wysokość szuflad{this.props.drawersHeights.length === 1 ? "y" : null}:
                    {this.props.drawersHeights.map((wysokosc, id) => {
                        return <div><WysokoscSzuflady
                            key={id}
                            numerSzuflady={id+1}
                            zmianaWysokosci={(event) => this.props.onDrawerHeightChange(event, id)}
                            iloscSzuflad={this.props.drawersHeights.length}
                            wysokosc={wysokosc}
                        />
                        <input type="button" onClick={() => this.props.onClickAutoFill(id)} value="Wypełnij" />
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDrawerHeightChange: (event, id) => dispatch({type: actionTypes.CHANGE_DRAWER_HEIGHT, event: event, id: id}),
        onClickAutoFill: (id) => dispatch({type: actionTypes.DRAWERS_AUTO_FILL, id: id}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularzSzuflad);
