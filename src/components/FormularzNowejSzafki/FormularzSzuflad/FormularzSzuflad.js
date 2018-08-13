import React, {Component} from 'react';

import WysokoscSzuflady from './WysokoscSzuflady/WysokoscSzuflady';

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
                            wysokosc={this.props.wysokoscSzuflady}
                            numerSzuflady={szuflada.drawerId}
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

export default connect(mapStateToProps)(FormularzSzuflad);
