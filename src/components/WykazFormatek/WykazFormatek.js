import React, {Component} from 'react';
import './Wykaz.css';

import {connect} from 'react-redux';

class Wykaz extends Component {
    render() {
        const wykazFormatek = (formsArray) => {
            return(formsArray.map(formatka => {
                return(
                    <div className="row" key={formatka.wymiary+formatka.okleina}>
                        <div className="col">{formatka.wymiary}</div>
                        <div className="col narrow">{formatka.ilosc}szt</div>
                        <div className="col"><div className={formatka.okleina + ' okleina'}></div></div>
                    </div>
                )
            }))
        }
        return(
            <div className="outputFormatki">
                <h1 className="innerHeaders">Wymiary formatek do zamówienia</h1>
                <div className="formatki">
                    <div className="parent">
                        <div className="typeHeader">Płyta meblowa 18mm:</div>
                                {wykazFormatek(this.props.plyta18mm)}
                            <div className="typeHeader">Fronty</div>
                                {wykazFormatek(this.props.fronty)}

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
        plyta16mm: state.formatki.plyta16mm,
    }
}

export default connect(mapStateToProps)(Wykaz);
