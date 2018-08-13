import React, {Component} from 'react';

import {connect} from 'react-redux';

class WizualizacjaWnetrze extends Component {
    render() {
        let drowersArray = [];
        if (this.props.rodzaj === "szuflady") {
            this.props.drawersArray.map(szuflada => {
                    drowersArray.push(
                        <div
                            className="szuflada"
                            key={szuflada.drawerId}>
                            {szuflada.drawerId}
                        </div>);
            })
        }

        if (this.props.rodzaj === "szufladaDrzwi") {
                drowersArray.push(<div className="szuflada malaSzuflada"></div>);
                drowersArray.push(<div className="szuflada"></div>);
        }

        if (this.props.rodzaj === "jedneDrzwi") {
                drowersArray.push(<div className="szuflada"></div>);
        }
            return(
                drowersArray
        )
    }
}

const mapStateToProps = state => {
    return {
        drawersArray: state.drawersArray,
    }
}

export default connect(mapStateToProps)(WizualizacjaWnetrze);
