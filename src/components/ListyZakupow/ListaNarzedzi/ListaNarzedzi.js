import React, {Component} from 'react';
import Auxx from '../../../Auxx';
import './ListaNarzedzi.css';

class ListaNarzedzi extends Component {
    render() {
        const toolsTypes = [
            {
                symbol: "bits",
                fullName: "Bity",
                keyword: "bit",
            },
            {
                symbol: "drills",
                fullName: "Wiertła",
                keyword: "wiertło",
            },
            {
                symbol: "electricalTools",
                fullName: "Elektronarzędzia",
                keyword: "elektronarzędzie",
                minimumPrice: 100,
            },
            {
                symbol: "others",
                fullName: "Pozostałe narzędzia",
            },

        ]

        const toolsList = [
            {
                name: "Wiertło do konfirmatów",
                price: 15,
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
                name: "Wyrzynarka",
                price: 200,
            },
            {
                name: "Poziomica minimum 1 metr",
                price: 40,
            }

        ];

        if(this.props.gorneSzafki) {
            toolsList.push(
                {
                    name: "Wiertarka udarowa",
                    price: 200,
                },
                {
                    name: "Wiertło 8mm do betonu",
                    price: 5,
                },
            )
        }
        const toolsListWithTypes = toolsList.map(tool => {
            let typeSymbol = "others";
            for (let type of toolsTypes) {
                if (tool.name.toLowerCase().includes(type.keyword)) {
                    typeSymbol = type.symbol;
                } else if (type.minimumPrice && type.minimumPrice < tool.price) {
                    typeSymbol = type.symbol;
                }
            }
            return {
                ...tool,
                type: typeSymbol,
            }
        })
        // toolsList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

        const outputTools = toolsTypes.map(type => {
            let allToolsOfTypeList = [];
            for(let tool of toolsListWithTypes) {
                if (type.symbol === tool.type) {
                    allToolsOfTypeList.push(tool)
                }
            }
            let typeToolsList = allToolsOfTypeList.map(tool => {
                return (
                    <Auxx key={tool.name}>
                        <div className="toolName">
                            <a href={"http://www.google.com/search?q="+tool.name} target="_blank">{tool.name}</a>
                        </div>
                        <div className="toolPrice">
                            {tool.price} zł
                        </div>
                    </Auxx>
                )
            })
            return (
                <Auxx key={type.fullName}>
                    <div className="toolTypeHeader">
                        {type.fullName}
                    </div>
                    {typeToolsList}
                </Auxx>
            )
        })

        return(
            <div className="outputTools">
                <h1 className="innerHeaders">Potrzebne narzędzia</h1>
                <div className="toolsListWrapper">
                    {outputTools}
                </div>
            </div>
        )
    }
}

export default ListaNarzedzi;
