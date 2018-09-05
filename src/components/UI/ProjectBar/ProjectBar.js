import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';
import './ProjectBar.css';

import {NavLink} from 'react-router-dom';

class ProjectBar extends Component {
    render() {
        return (
            <div className="projectBar">
                <NavLink
                to="/projekt/parametry-kuchni"
                activeClassName="activeProjectStage"

                >
                    <div>
                        Parametry kuchni
                    </div>
                </NavLink>

                <NavLink
                to="/projekt/kreator-szafki"
                activeClassName="activeProjectStage"
                className={this.props.validKitchenParams ? null : "notActiveLink"}
                >
                    <div>
                        Kreator szafek
                    </div>
                </NavLink>
                {this.props.validKitchenCabinets ?
                    <NavLink
                    to="/projekt/lista-zakupow"
                    activeClassName="activeProjectStage"
                    onClick={this.props.calculateForms}
                    >
                        <div>
                            Lista zakupów
                        </div>
                    </NavLink> :
                <div className="notActiveLink">Lista zakupów</div>}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        validKitchenParams: state.validForm,
        validKitchenCabinets: state.kitchenCabinetsValid,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        calculateForms: () => dispatch({type: actionTypes.CALCULATE_FORMS}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectBar);
