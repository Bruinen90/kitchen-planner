import React, { Component } from 'react';
import WykazFormatek from '../../components/WykazFormatek/WykazFormatek';
import ListaOkuc from '../../components/ListaOkuc/ListaOkuc';
import './ListaZakupow.css';
import {connect} from 'react-redux';

class ListaZakupow extends Component {
    componentWillMount() {
        if(!this.props.validKitchen) {
            this.props.history.replace('/projekt/parametry-kuchni');
            window.location.reload();
        }
    }
  render() {
    return (
        <div className="wrapper">
            <h1>Lista Zakupów</h1>
            <div className="ListaZakupowWrapper">
                <WykazFormatek />
                <ListaOkuc />
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return{
        validKitchen: state.kitchenCabinetsValid,
    }
}
export default connect(mapStateToProps)(ListaZakupow);
