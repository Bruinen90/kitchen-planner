import * as actionTypes from '../actions/actionTypes';

const initialState = {
    kitchenWidth: '1200px',
    kitchenHeight: '500px',
    cabinetDepth: 550,
    cabinetHeight: 750,
    cabinets: [
        {   id: 1,
            rodzaj: "",
            szerokosc: "600",
            iloscSzuflad: 3,
        }
    ],
    formatki: [],
    cabinetsCount: 0,
    drawersArray: [],
    drawersCounterState: 3,
}

const reducer = (state = initialState, action) => {
    const updateDrawersArray = (newArrayCount) => {
        const drawersArray = [];
        let i=1;
        while(i<=newArrayCount) {
            drawersArray.push({drawerId: i, height: 0});
            i++;
        }
        return drawersArray
    }
    switch (action.type) {
        case(actionTypes.CHANGE_ROOM_SIZE):
        if (action.event.charCode === 13) {
            return {
                ...state,
                kitchenWidth: action.event.target.value/(action.event.target.value*2/window.innerWidth) + 'px',
                kitchenHeight: 1000/(2*action.event.target.value/window.innerWidth) + 'px',
                blat: action.event.target.value-3,
            }
        }

        case(actionTypes.CHANGE_CABINET_TYPE):
            const currentCabinet = {...state.cabinets};
            currentCabinet[0].rodzaj = action.event.target.value;
            let updateDrawersCount = 0;
            switch(currentCabinet[0].rodzaj) {
                case('szufladaDrzwi'): updateDrawersCount = 1; break;
                case('jedneDrzwi'): updateDrawersCount = 0; break;
                case('szuflady'): updateDrawersCount = state.drawersCounterState; break;
            }

            return {
                ...state,
                cabinets: currentCabinet,
                drawersArray: updateDrawersArray(updateDrawersCount),
            }

        case(actionTypes.CHANGE_DRAWER_COUNT):
            const currentDrawerCount = {...state.cabinets};
            currentDrawerCount[0].iloscSzuflad = action.event.target.value;
            return {
                ...state,
                cabinets: currentDrawerCount,
                drawersCounterState: currentDrawerCount[0].iloscSzuflad,
                drawersArray: updateDrawersArray(currentDrawerCount[0].iloscSzuflad),
            }

        case(actionTypes.CHANGE_CABINET_WIDTH):
            const currentCabinetWidth = {...state.cabinets};
            currentCabinetWidth[0].szerokosc = action.event.target.value;
            return {
                ...state,
                cabinets: currentCabinetWidth,
            }

        case(actionTypes.ADD_CABINET):
            let newCabinetArray = [];
            const trawersy = {
                ilosc: 2,
                wymiary: state.cabinetDepth.toString()+"x"+(state.cabinets[0].szerokosc-36).toString()+"mm",
                okleina: 'd1',
                typPlyty: '18mm',
            }
            if (state.cabinetDepth > state.cabinets[0].szerokosc-36) {
                trawersy.okleina = 'k1';
            }

            newCabinetArray.push(trawersy);

            const boki = {
                ilosc: 2,
                wymiary: state.cabinetDepth.toString()+"x"+state.cabinetHeight.toString()+"mm",
                okleina: 'd1',
                typPlyty: '18mm',
            }
            if (state.cabinetDepth > state.cabinetHeight) {
                boki.okleina = 'k1';
            }

            newCabinetArray.push(boki);

            let fronty = "";
            if (state.cabinets[0].rodzaj === 'jedneDrzwi') {
                fronty = [{
                    ilosc: 1,
                    wymiary: (state.cabinetHeight-3).toString()+"x"+(state.cabinets[0].szerokosc-3).toString()+"mm",
                    okleina: "full",
                    typPlyty: 'front',
                }]
            } else if (state.cabinets[0].rodzaj === 'szufladaDrzwi') {
                fronty = [{
                    ilosc: 1,
                    wymiary: (state.cabinetHeight/3-3).toString()+"x"+(state.cabinets[0].szerokosc-3).toString()+"mm",
                    okleina: "full",
                    typPlyty: 'front',
                },
                {   ilosc: 1,
                    wymiary: (2*state.cabinetHeight/3-3).toString()+"x"+(state.cabinets[0].szerokosc-3).toString()+"mm",
                    okleina: 'full',
                    typPlyty: 'front',
                },]
            } else if (state.cabinets[0].rodzaj === 'szuflady') {
                fronty = [{
                    ilosc: state.cabinets[0].iloscSzuflad,
                    wymiary: (state.cabinetHeight/state.cabinets[0].iloscSzuflad-3).toString()+"x"+(state.cabinets[0].szerokosc-3).toString()+"mm",
                    okleina: 'full',
                    typPlyty: 'front',
                }]
            }

            newCabinetArray.push(fronty);
            const newIloscSzafek = state.cabinetsCount+1;


            return {
                    ...state,
                    formatki: newCabinetArray,
                    cabinetsCount: newIloscSzafek,
                }
            }
    return state;
}

export default reducer;
