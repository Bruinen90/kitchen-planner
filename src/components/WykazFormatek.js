import React, {Component} from 'react';
import './Wykaz.css';

import {connect} from 'react-redux';

class Wykaz extends Component {
    render() {
        const frontyWykaz = this.props.fronty.map(front => {
            return(
                <div className="row">
                    <div className="col">{front.wymiary}</div>
                    <div className="col">{front.ilosc}szt.</div>
                    <div className="col">
                        <div className={front.okleina + ' okleina'}></div>
                    </div>
                </div>
            );
        });

        let plyta16Wykaz = null;
            if(this.props.dnaSzuflad.ilosc > 0) {
                const plecySzufladWykaz = this.props.plecySzuflad.map(plecySzuflad => {
                    return(
                        <div className="row">
                            <div className="col">{plecySzuflad.wymiary}</div>
                            <div className="col">{plecySzuflad.ilosc}szt.</div>
                            <div className="col">
                                <div className={plecySzuflad.okleina + ' okleina'}></div>
                            </div>
                        </div>
                    )
                });
                plyta16Wykaz =
                    <div>
                        <div className="typeHeader">Płyta meblowa 16mm:</div>
                            {plecySzufladWykaz}
                            <div className="row">
                                <div className="col">{this.props.dnaSzuflad.wymiary}</div>
                                <div className="col">{this.props.dnaSzuflad.ilosc}szt</div>
                                <div className="col"><div className={this.props.dnaSzuflad.okleina + ' okleina'}></div></div>
                            </div>
                    </div>
            }

        return(
            <div className="output">
                <h1 className="innerHeaders">Wymiary formatek do zamówienia</h1>
                <div className="formatki">
                    <div className="parent">
                        <div className="typeHeader">Płyta meblowa 18mm:</div>
                            <div className="row">
                                <div className="col">{this.props.trawersy.wymiary}</div>
                                <div className="col">{this.props.trawersy.ilosc}szt</div>
                                <div className="col"><div className={this.props.trawersy.okleina + ' okleina'}></div></div>
                            </div>
                            <div className="row">
                                <div className="col">{this.props.boki.wymiary}</div>
                                <div className="col">{this.props.boki.ilosc}szt</div>
                                <div className="col"><div className={this.props.boki.okleina + ' okleina'}></div></div>
                            </div>
                            <div className="typeHeader">Fronty</div>
                                {frontyWykaz}

                            {plyta16Wykaz}
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        trawersy: state.formatki[0],
        boki: state.formatki[1],
        fronty: state.formatki[2],
        plecySzuflad: state.formatki[3],
        dnaSzuflad: state.formatki[4],
    }
}

export default connect(mapStateToProps)(Wykaz);
