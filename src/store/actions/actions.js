import * as actionTypes from './actionTypes';

export const changeRoomSize = (event) => {
    return {
        type: actionTypes.CHANGE_ROOM_SIZE,
        event: event,
    };
};
