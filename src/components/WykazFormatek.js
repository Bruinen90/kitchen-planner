import React from 'react';
import './Wykaz.css';

const Wykaz = (props) => {
    const frontyWykaz = props.fronty.map(front => {
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
        if(props.dnaSzuflad.ilosc > 0) {
            const plecySzufladWykaz = props.plecySzuflad.map(plecySzuflad => {
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
                            <div className="col">{props.dnaSzuflad.wymiary}</div>
                            <div className="col">{props.dnaSzuflad.ilosc}szt</div>
                            <div className="col"><div className={props.dnaSzuflad.okleina + ' okleina'}></div></div>
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
                        <div className="col">{props.trawersyWymiary}</div>
                        <div className="col">{props.trawersyIlosc}szt</div>
                        <div className="col"><div className={props.trawersyOkleina + ' okleina'}></div></div>
                    </div>
                    <div className="row">
                        <div className="col">{props.bokiWymiary}</div>
                        <div className="col">{props.bokiIlosc}szt</div>
                        <div className="col"><div className={props.bokiOkleina + ' okleina'}></div></div>
                    </div>
                    <div className="typeHeader">Fronty</div>
                        {frontyWykaz}

                    {plyta16Wykaz}
                </div>

    </div>
</div>
    )
}

export default Wykaz;
