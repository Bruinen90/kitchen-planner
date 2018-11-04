import React, { Component } from 'react';
import FormsList from '../../components/ShoppingLists/FormsList/FormsList';
import AccessoriesList from '../../components/ShoppingLists/AccessoriesList/AccessoriesList';
import ToolsList from '../../components/ShoppingLists/ToolsList/ToolsList';
import './ShoppingList.css';
import {connect} from 'react-redux';
import MobileButton from '../../components/UI/MobileButton/MobileButton';

class ShoppingList extends Component {
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
        <React.Fragment>
            <h1>Lista Zakupów</h1>
            <div className="ListaZakupowWrapper">
                <FormsList />
                <AccessoriesList />
                <ToolsList
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
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
    return{
        validKitchen: state.kitchenCabinetsValid,
        gorneSzafki: !state.kitchenType.includes("edenRzad"),
    }
}
export default connect(mapStateToProps)(ShoppingList);
