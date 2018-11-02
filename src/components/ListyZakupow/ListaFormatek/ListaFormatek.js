import React, {Component} from 'react';
import './ListaFormatek.css';
import * as actionTypes from '../../../store/actions/actionTypes';

import {connect} from 'react-redux';

class Wykaz extends Component {
    render() {
        const wykazFormatek = (formsArray) => {
            return(formsArray.map(formatka => {
                let showFormDescription = window.innerWidth > 950 ? {left: "3000px"} : {opacity: "0"};
                if(
                    formatka.wymiary+formatka.okleina ===
                    this.props.showFormDescriptionKey && this.props.showFormDescription) {
                        window.innerWidth > 950 ?
                            showFormDescription.left = "105%" :
                            showFormDescription.opacity = "1"
                    }
                return(
                    <div
                        className="row"
                        key={formatka.wymiary+formatka.okleina}
                        onMouseOver={()=>this.props.onHoverForms(formatka.wymiary+formatka.okleina, true)}
                        onMouseOut={()=>this.props.onHoverForms(formatka.wymiary+formatka.okleina, false)}
                        onClick={()=>this.props.onHoverForms(formatka.wymiary+formatka.okleina, !this.props.showFormDescription)}
                    >
                        <div className="col">{formatka.wymiary}</div>
                        <div className="col narrow">{formatka.ilosc}szt</div>
                        <div className="col"><div className={formatka.okleina + ' okleina'}></div></div>
                        <div className="col descriptionPrint">{formatka.opis}</div>
                        <div className="descriptionOverflow" style={showFormDescription}>
                            {formatka.opis}
                            {window.innerWidth < 951 ? 
                            <div className="hideDescriptionIcon">
                                <ion-icon name="close"></ion-icon>
                            </div> : null}
                        </div>
                    </div>
                )
            }))
        }
        return(
            <div className="outputFormatki">
                <h1 className="innerHeaders">Formatki do zamówienia</h1>
                <div className="formatki">
                    <div className="parent">
                        <div className="typeHeader">Płyta meblowa 18mm:</div>
                                {wykazFormatek(this.props.plyta18mm)}
                            <div className="typeHeader">Fronty szafek dolnych</div>
                                {wykazFormatek(this.props.fronty)}
                            {this.props.frontyGorne.length > 0 ?
                                <div className="typeHeader">Fronty szafek górnych</div> : null
                            }
                                {wykazFormatek(this.props.frontyGorne)}

                            {this.props.plyta16mm.length > 0 ? <div className="typeHeader">Płyta meblowa 16mm</div> : null}
                                {wykazFormatek(this.props.plyta16mm)}
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        plyta18mm: state.formatki.plyta18mm,
        fronty: state.formatki.fronty,
        frontyGorne: state.formatki.frontyGorne,
        plyta16mm: state.formatki.plyta16mm,
        showFormDescription: state.showFormDescription,
        showFormDescriptionKey: state.showFormDescriptionKey,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onHoverForms: (form_key, show)=>dispatch({type: actionTypes.SHOW_FORM_DESCRIPTION, form_key: form_key, show: show})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wykaz);
