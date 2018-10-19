import React, { Component } from 'react';
import WykazFormatek from '../../components/WykazFormatek/WykazFormatek';
import ListaOkuc from '../../components/ListaOkuc/ListaOkuc';
import './ListaZakupow.css';
import {connect} from 'react-redux';
import SaveAndContinueButton from '../../components/UI/SaveAndContinueButton/SaveAndContinueButton';
import Auxx from '../../Auxx';

class ListaZakupow extends Component {
    componentWillMount() {
        if(!this.props.validKitchen) {
            this.props.history.replace('/projekt/parametry-kuchni');
            window.location.reload();
        }
    }
  render() {
    return (
        <Auxx>
            <h1>Lista Zakupów</h1>
            <div className="ListaZakupowWrapper">
                <WykazFormatek />
                <ListaOkuc />
            </div>
            {window.innerWidth>950 ? null :
                <SaveAndContinueButton
                href='/projekt/kreator-szafki'
                resetErrors={this.props.calculateForms}
                active={true}
                back={true}
                />
            }
        </Auxx>
    );
  }
}

const mapStateToProps = state => {
    return{
        validKitchen: state.kitchenCabinetsValid,
    }
}
export default connect(mapStateToProps)(ListaZakupow);
