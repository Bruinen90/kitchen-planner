import React, {Component} from 'react';

import {connect} from 'react-redux';

class WizualizacjaWnetrze extends Component {
    render() {
        let drowersArray = [];
        if (this.props.rodzaj === "szuflady") {
            this.props.drawersHeights.map((wysokosc,id) => {
                    drowersArray.push(
                        <div
                            className="szuflada"
                            key={id}
                            style={{"height": wysokosc+"px"}}
                            >
                            {id+1}
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
        drawersHeights: state.drawersHeights,
    }
}

export default connect(mapStateToProps)(WizualizacjaWnetrze);
