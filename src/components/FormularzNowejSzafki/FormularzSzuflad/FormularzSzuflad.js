import React, {Component} from 'react';

import WysokoscSzuflady from './WysokoscSzuflady/WysokoscSzuflady';

import * as actionTypes from '../../../store/actions/actionTypes';

import {connect} from 'react-redux';

class FormularzSzuflad extends Component {
    render() {
        return(
            this.props.drawersArray.length > 0 ?
                <div className="formularzSzuflad">
                    Wysokość szuflad{this.props.drawersArray.length === 1 ? "y" : null}:
                    {this.props.drawersArray.map(szuflada => {
                        return <WysokoscSzuflady
                            key={szuflada.drawerId}
                            numerSzuflady={szuflada.drawerId}
                            zmianaWysokosci={(event) => this.props.onDrawerHeightChange(event, szuflada.drawerId-1)}
                            iloscSzuflad={this.props.drawersArray.length}
                        />
                    })}

                </div>
            :
            null

        );
    }
}

const mapStateToProps = state => {
    return {
        drawersArray: state.drawersArray,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDrawerHeightChange: (event, id) => dispatch({type: actionTypes.CHANGE_DRAWER_HEIGHT, event: event, id: id}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularzSzuflad);
