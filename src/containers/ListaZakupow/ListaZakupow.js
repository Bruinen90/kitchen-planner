import React, { Component } from 'react';
import WykazFormatek from '../../components/WykazFormatek/WykazFormatek';
import ListaOkuc from '../../components/ListaOkuc/ListaOkuc';
import ListaNarzedzi from '../../components/ListaNarzedzi/ListaNarzedzi';
import './ListaZakupow.css';
import {connect} from 'react-redux';
import SaveAndContinueButton from '../../components/UI/SaveAndContinueButton/SaveAndContinueButton';
import Auxx from '../../Auxx';
import MobileButton from '../../components/UI/MobileButton/MobileButton';

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
                <ListaNarzedzi />
            </div>
            {window.innerWidth>950 ? null :
                <MobileButton
                    color="green"
                    ionicIconName="arrow-round-back"
                    whenClicked={()=>this.props.history.push("/projekt/kreator-szafki")}
                    position={0}
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
