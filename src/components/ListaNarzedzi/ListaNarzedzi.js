import React, {Component} from 'react';
import Auxx from '../../Auxx';
import './ListaNarzedzi.css';

class ListaNarzedzi extends Component {
    render() {
        const toolsList = [
            {
                name: "Wiertło do konfirmatów",
                price: 12,
            },
            {
                name: "Wiertło 2mm do nawierceń pod śruby",
                searchName: "Wiertło 2mm do metalu",
                price: 2,
            },
            {
                name: "Kątownik (winkiel) aluminiowy 500 mm",
                price: 30,
            },
            {
                name: "Wiertło 5mm do drewna",
                price: 2,
            },
            {
                name: "Wiertło 10mm do drewna",
                price: 4,
            },
            {
                name: "Ścisk stolarski kątowy",
                price: 40,
            },
            {
                name: "Bit PH1 do śrub 3.5 mm",
                price: 3,
            },
            {
                name: "Bit do konfirmatów",
                price: 3,
            },
            {
                name: "Miarka zwijana",
                price: 10,
            },
            {
                name: "Wkrętarka akumulatorowa",
                price: 250,
            },
            {
                name: "Wyrzynarka do otworów pod sprzęt AGD",
                price: 200,
            },

        ];

        toolsList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

        const outputTools = toolsList.map(tool => {
            let searchPhrase = tool.name;
            if (tool.searchName) searchPhrase = tool.searchName;
            return (
                <Auxx>
                    <div className="toolName">
                        <a href={"http://www.google.com/search?q="+searchPhrase} target="_blank">{tool.name}</a>
                    </div>
                    <div className="toolPrice">
                        {tool.price} zł
                    </div>
                </Auxx>
            )
        })

        return(
            <div className="outputTools">
                <h1 className="innerHeaders">Lista potrzebnych narzędzi</h1>
                <div className="toolsListWrapper">
                    {outputTools}
                </div>
            </div>
        )
    }
}

export default ListaNarzedzi;
