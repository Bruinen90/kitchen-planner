import React from 'react';
import './Wykaz.css';

const Wykaz = (props) => {
    return(
    <div className="output">
        <h1 className="innerHeaders">Wymiary formatek do zamówienia</h1>
        <div className="formatki">
        <div className="parent">
            <div className="row">
                <div className="col">Płyta meblowa 18mm:</div>
                <div className="col">{props.trawersyWymiary}</div>
                <div className="col">{props.trawersyIlosc}szt</div>
                <div className="col"><div className={props.trawersyOkleina + ' okleina'}></div></div>
            </div>
            <div className="row">
                <div className="col">{props.bokiWymiary}</div>
                <div className="col">{props.bokiIlosc}szt</div>
                <div className="col"><div className={props.bokiOkleina + ' okleina'}></div></div>
            </div>
            <div className="row">
                <div className="col">Fronty:</div>
                <div className="col">{props.frontyWymiary}</div>
                <div className="col">{props.frontyIlosc}szt</div>
                <div className="col"><div className={props.frontyOkleina + ' okleina'}></div></div>
            </div>
        </div>
    </div>
</div>
    )
}

export default Wykaz;
