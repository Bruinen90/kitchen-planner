import React, { Component } from 'react';
import * as actionTypes from '../../../store/actions/actionTypes';
import {connect} from 'react-redux';
import './DoorsAndShelfsForm.css';

class DoorsAndShelfsForm extends Component {
  render() {
    return (
        this.props.shouldBeVisible || this.props.upperCabinets ?
      <div>
          <label className="checkboxLabel">
            <div className="checkboxSwitch">
                <input
                    type="checkbox"
                    onChange={(event, upperCabinets)=>this.props.onChangeDoorsCount(event, this.props.upperCabinets)}
                    checked={this.props.upperCabinets ? this.props.upperDoubleDoors : this.props.doubleDoors}
                />
            <span className="slider"></span></div>
                    Drzwi podwójne (dwuskrzydłowe)
            </label>
            <div className="iloscPolekContainer">
                <select
                    onChange={(event, upperCabinets)=>this.props.onChangeShelfsCount(event, this.props.upperCabinets)}
                    value={this.props.upperCabinets ? this.props.upperShelfsCount : this.props.shelfsCount}
                    className="iloscPolek"
                >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                </select>
                Ilość półek
            </div>
      </div>
      : null
    );
  }
}

const mapStateToProps = state => {
    return {
        shouldBeVisible: state.cabinetType === "jedneDrzwi" || state.cabinetType === "szufladaDrzwi",
        doubleDoors: state.doubleDoors,
        shelfsCount: state.shelfsCount,
        upperShelfsCount: state.upperShelfsCount,
        upperDoubleDoors: state.upperDoubleDoors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeDoorsCount: (event, upperCabinets) => dispatch({
            type: actionTypes.CHANGE_DOORS_COUNT,
            count: event.target.checked,
            upperCabinets: upperCabinets
        }),
        onChangeShelfsCount: (event, upperCabinets) => dispatch({
            type: actionTypes.CHANGE_SHELFS_COUNT,
            count: event.target.value,
            upperCabinets: upperCabinets,
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DoorsAndShelfsForm);
