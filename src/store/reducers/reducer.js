import * as actionTypes from '../actions/actionTypes';

const initialState = {
    kitchenWidth: '1200px',
    kitchenHeight: '500px',
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
    }
    return state;
}

export default reducer;
