import React, { Component } from 'react';
import * as actionTypes from '../../../store/actions/actionTypes';
import {connect} from 'react-redux';

class FormularzDrzwi extends Component {
  render() {
    return (
        this.props.shouldBeVisible ?
      <div>
          <label>
              <input
                type="checkbox"
                onChange={(event)=>this.props.onChangeDoorsCount(event)}
                />
                Drzwi podwójne (dwuskrzydłowe)
            </label>
            <div>
            Ilość półek:
            <select onChange={(event)=>this.props.onChangeShelfsCount(event)}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>

            </div>
      </div>
      : null
    );
  }
}

const mapStateToProps = state => {
    return {
        shouldBeVisible: state.cabinetType === "jedneDrzwi" || state.cabinetType === "szufladaDrzwi",

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeDoorsCount: (event) => dispatch({
            type: actionTypes.CHANGE_DOORS_COUNT,
            count: event.target.checked,
        }),
        onChangeShelfsCount: (event) => dispatch({
            type: actionTypes.CHANGE_SHELFS_COUNT,
            count: event.target.value,
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormularzDrzwi);
