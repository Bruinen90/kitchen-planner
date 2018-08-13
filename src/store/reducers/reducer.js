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
}

const reducer = (state = initialState, action) => {
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
            return {
                ...state,
                cabinets: currentCabinet,
            }

        case(actionTypes.CHANGE_DRAWER_COUNT):
            const currentDrawerCount = {...state.cabinets};
            currentDrawerCount[0].iloscSzuflad = action.event.target.value;
            return {
                ...state,
                cabinets: currentDrawerCount
            }

        case(actionTypes.CHANGE_CABINET_WIDTH):
            const currentCabinetWidth = {...state.cabinets};
            currentCabinetWidth[0].szerokosc = action.event.target.value;
            return {
                ...state,
                cabinets: currentCabinetWidth,
            }

    }
    return state;
}

export default reducer;
