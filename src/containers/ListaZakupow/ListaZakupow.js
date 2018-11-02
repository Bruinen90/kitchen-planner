import React, { Component } from 'react';
import ListaFormatek from '../../components/ListyZakupow/ListaFormatek/ListaFormatek';
import ListaOkuc from '../../components/ListyZakupow/ListaOkuc/ListaOkuc';
import ListaNarzedzi from '../../components/ListyZakupow/ListaNarzedzi/ListaNarzedzi';
import './ListaZakupow.css';
import {connect} from 'react-redux';
import Auxx from '../../Auxx';
import MobileButton from '../../components/UI/MobileButton/MobileButton';

class ListaZakupow extends Component {
    componentWillMount() {
        if(!this.props.validKitchen) {
            this.props.history.replace('/projekt/parametry-kuchni');
            window.location.reload();
        }
    }

    componentDidMount () {
        window.scrollTo(0, 0);
    }

  render() {
    return (
        <Auxx>
            <h1>Lista Zakupów</h1>
            <div className="ListaZakupowWrapper">
                <ListaFormatek />
                <ListaOkuc />
                <ListaNarzedzi
                    gorneSzafki = {this.props.gorneSzafki}
                />
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
        gorneSzafki: !state.kitchenType.includes("edenRzad"),
    }
}
export default connect(mapStateToProps)(ListaZakupow);
