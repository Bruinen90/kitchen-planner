import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cabinets: [],
    cabinetsCount: 0,
    kitchenWidth: '1200px',
    kitchenHeight: '300px',
    scale: 3,
    spaceBetweenDrawers: 3,
    spaceDrawersToTop: 3,
    cabinetDepth: 550,
    cabinetHeight: 750,
    cabinetId: 1,
    cabinetType: "",
    cabinetWidth: 600,
    drawersHeights: [],
    drawersCounterState: 3,
    blockedDrawers: [],
    activeDrawer: null,
    errorTypes: [],
    cabinetValid: false,
    cabinetError: "noCabinetType",
    formatki: [],
    hoveredCabinet: false,
    uniqueId: 1,
    editInProgress: false,
    canMove: {
        left: true,
        right: true,
    }
}

const reducer = (state = initialState, action) => {
    const updateDrawersArray = (newArrayCount) => {
        const drawersHeights = [];
        if(newArrayCount===1) {
            drawersHeights.push(150)
        } else {
            let i=1;
            while(i<=newArrayCount) {
                drawersHeights.push(
                    (state.cabinetHeight-
                        state.spaceDrawersToTop-
                        state.spaceBetweenDrawers*
                        (newArrayCount-1))/newArrayCount
                    );
                i++;
            }
        }
        return drawersHeights
    }

    const calculateSpacing = (frontsQuantity = state.drawersHeights.length) => {
        const spacesSum = state.spaceDrawersToTop + state.spaceBetweenDrawers*(frontsQuantity-1);
        return spacesSum;
    }

    const findCabinetId = (cabinet) => {
        return cabinet.cabinetId === action.cabinetId;
    }

    const createBlockedDrawersArray = (countOfDrawers = state.drawersHeights.length) => {
        return Array(countOfDrawers).fill(false)
    }

    switch (action.type) {
        case(actionTypes.EDIT_CABINET):
            const editIndex = state.cabinets.findIndex(findCabinetId);
            const cabinetToBeEdited = {...state.cabinets[editIndex]};
            let editedDrawersHeights = [];
            cabinetToBeEdited.type !== "drzwi" ? editedDrawersHeights = [...cabinetToBeEdited.drawersHeights] : null;
            return {
                ...state,
                cabinetId: cabinetToBeEdited.cabinetId,
                cabinetType: cabinetToBeEdited.cabinetType,
                cabinetWidth: cabinetToBeEdited.cabinetWidth,
                drawersHeights: editedDrawersHeights,
                drawersCounterState: editedDrawersHeights.length,
                blockedDrawers: [],
                activeDrawer: null,
                errorTypes: [],
                editInProgress: true,
                blockedDrawers: createBlockedDrawersArray(),
            }

        case(actionTypes.SAVE_CABINET):
            const savedCabinetParams = {
                cabinetId: state.cabinetId,
                cabinetType: state.cabinetType,
                cabinetWidth: state.cabinetWidth,
                drawersHeights: [...state.drawersHeights],
                blockedDrawers: createBlockedDrawersArray(),
            }

            const beforeCabinetsArray = [...state.cabinets];
            const afterCabinetsArray = beforeCabinetsArray.map(cabinet => {
                if(cabinet.cabinetId !== state.cabinetId) {
                    return cabinet
                }
                return {
                    ...savedCabinetParams
                }
            })

            return {
                    ...state,
                    cabinets: afterCabinetsArray,
                    editInProgress: false,
                }

        case(actionTypes.CHANGE_ROOM_SIZE):
            if (action.event.charCode === 13) {
                const scale = action.event.target.value*1.2/window.innerWidth;
                return {
                    ...state,
                    kitchenWidth: action.event.target.value/scale + 'px',
                    kitchenHeight: 1000/scale + 'px',
                    blat: action.event.target.value-3,
                    scale: scale,
                }
        }

        case(actionTypes.CHANGE_CABINET_TYPE):
            let updateDrawersCount = 0;
            switch(action.event.target.value) {
                case('szufladaDrzwi'): updateDrawersCount = 1; break;
                case('jedneDrzwi'): updateDrawersCount = 0; break;
                case('szuflady'): updateDrawersCount = 3; break;
            }
            const drawersBlocked = Array(updateDrawersCount).fill(false);
            return {
                ...state,
                cabinetType: action.event.target.value,
                drawersHeights: updateDrawersArray(updateDrawersCount),
                errorTypes: [],
                blockedDrawers: drawersBlocked,
            }

        case(actionTypes.CHANGE_DRAWER_COUNT):
            const newBlockedDrawers = Array(parseInt(action.event.target.value)).fill(false);
            return {
                ...state,
                drawersCounterState: action.event.target.value,
                drawersHeights: updateDrawersArray(action.event.target.value),
                blockedDrawers: newBlockedDrawers,
            }

        case(actionTypes.CHANGE_CABINET_WIDTH):
            return {
                ...state,
                cabinetWidth: parseInt(action.event.target.value),
            }

        case(actionTypes.ADD_CABINET):
            //Check if sum of fronts isn't too big
            if(state.drawersHeights.reduce((a,b) => a+b, 0) >
            state.cabinetHeight - calculateSpacing()) {
                prompt("Error!")
            }

            let newCabinetArray = [];
            const trawersy = {
                ilosc: 2,
                wymiary: state.cabinetDepth.toString()+"x"+(state.cabinetWidth-36).toString()+"mm",
                okleina: 'd1',
                typPlyty: '18mm',
            }
            if (state.cabinetDepth > state.cabinetWidth-36) {
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
            let szufladyPlecy= [];
            let wymiaryPlecow = "";
            if (state.cabinetType === 'jedneDrzwi') {
                fronty = [{
                    ilosc: 1,
                    wymiary: (state.cabinetHeight-3).toString()+"x"+(state.cabinetWidth-3).toString()+"mm",
                    okleina: "full",
                    typPlyty: 'front',
                }]
            } else if (state.cabinetType === 'szufladaDrzwi') {
                fronty = [{
                    ilosc: 1,
                    wymiary: state.drawersHeights[0].toString()+"x"+(state.cabinetWidth-3).toString()+"mm",
                    okleina: "full",
                    typPlyty: 'front',
                },
                {   ilosc: 1,
                    wymiary: (state.cabinetHeight-state.drawersHeights[0]-6).toString()+"x"+(state.cabinetWidth-3).toString()+"mm",
                    okleina: 'full',
                    typPlyty: 'front',
                },];

                if (state.drawersHeights[0] < 224) wymiaryPlecow = state.cabinetWidth-123+"x84mm";
                else wymiaryPlecow = state.cabinetWidth-123+"x199mm";
                szufladyPlecy.push(
                    {
                        ilosc: 1,
                        wymiary: wymiaryPlecow,
                        okleina: 'd1',
                        typPlyty: '16mm'
                    }
                )

            } else if (state.cabinetType === 'szuflady') {
                const allDrawers = [...state.drawersHeights];
                const uniqueDrawers = Array.from(new Set(allDrawers));
                const countDrawers = (wysokosc) => {
                    return allDrawers.filter(height => {
                        return height === wysokosc
                    }).length
                };
                fronty =
                    uniqueDrawers.map((wysokosc, id) => {
                        return {
                            ilosc: countDrawers(wysokosc),
                            wymiary: wysokosc.toString()+"x"+(state.cabinetWidth-3).toString()+"mm",
                            okleina: 'full',
                            typPlyty: 'front',
                        }
                    });
                szufladyPlecy =
                    uniqueDrawers.map((wysokosc, id) => {
                        if (wysokosc < 224) wymiaryPlecow = state.cabinetWidth-123+"x84mm";
                        else wymiaryPlecow = state.cabinetWidth-123+"x199mm";
                        return {
                            ilosc: countDrawers(wysokosc),
                            wymiary: wymiaryPlecow,
                            okleina: 'd1',
                            typPlyty: '16mm'
                        }
                    })
            }
            newCabinetArray.push(fronty);
            newCabinetArray.push(szufladyPlecy)

            let szufladyDna = {
                    ilosc: state.drawersHeights.length,
                    wymiary: (state.cabinetWidth-111).toString()+"x"+"476mm",
                    okleina: null,
            };
            newCabinetArray.push(szufladyDna);


            const newIloscSzafek = state.cabinetsCount+1;
            const newCabinetId = state.uniqueId;

            const newCabinetParams = {
                cabinetId: state.uniqueId,
                cabinetType: state.cabinetType,
                cabinetWidth: state.cabinetWidth,
                drawersHeights: [...state.drawersHeights],
            }

            const updateCabinets = [...state.cabinets];
            updateCabinets.push(newCabinetParams)

            return {
                    ...state,
                    cabinetId: newCabinetId,
                    formatki: newCabinetArray,
                    cabinetsCount: newIloscSzafek,
                    cabinets: updateCabinets,
                    uniqueId: state.uniqueId+1,
                }

        case(actionTypes.CHANGE_DRAWER_HEIGHT):
            const newDrawersHeights = [...state.drawersHeights];
            newDrawersHeights[action.id] = parseInt(action.event.target.value);
            return {
                ...state,
                drawersHeights: newDrawersHeights
            }

        case(actionTypes.DRAWERS_AUTO_FILL):
            const currentDrawers = [...state.drawersHeights];
            const otherDrawers = state.drawersHeights.map((szuflada, index) => {
                if(index !== action.id) return szuflada
                else return 0
            });
            const sumOtherDrawersHeight = otherDrawers.reduce((a,b) => a+b, 0);
            const missingHeight = state.cabinetHeight -
                sumOtherDrawersHeight - calculateSpacing();
            const newHeightsCabinet = state.drawersHeights.map((szuflada, index) => {
                if (index !== action.id) return szuflada;
                return missingHeight
            })
            return {
                ...state,
                drawersHeights: newHeightsCabinet
            }

        case(actionTypes.AUTO_ADJUST_DRAWERS):
            const curDrawers = [...state.drawersHeights];
            const unBlockedDrawersCount = [...state.blockedDrawers].filter((a)=> a!=true).length;
                        console.log(unBlockedDrawersCount);
            const blockedDrawers = curDrawers.map((height, id) => {
                if(state.blockedDrawers[id]) {
                    return state.drawersHeights[id]
                } else {
                    return 0
                }
            });
            const blockedDrawersSum = blockedDrawers.reduce((a, b) => a+b, 0);

            const adjustedHeight = (state.cabinetHeight-calculateSpacing()-blockedDrawersSum)/unBlockedDrawersCount;

            const newDrawers = curDrawers.map((height, id) => {
                if(state.blockedDrawers[id]) {
                    return height
                } else {
                    return adjustedHeight
                }
            })
            // const newDrawersArray = updateDrawersArray(state.drawersHeights.length)
            return {
                ...state,
                drawersHeights: newDrawers,
            }

        case(actionTypes.BLOCK_DRAWER):
            const blockedDrawersArray = [...state.drawersHeights].map((_, id) => {
                if(action.id === id) {return !state.blockedDrawers[id]} else {
                    return state.blockedDrawers[id]
                    }
            })
            return {
                ...state,
                blockedDrawers: blockedDrawersArray,
            }

        case(actionTypes.ACTIVE_DRAWER):
            return {
                ...state,
                activeDrawer: action.id,
            }

        case(actionTypes.DISACTIVE_DRAWER):
            const curDrawerHeight = [...state.drawersHeights];
            const badDrawersIds = curDrawerHeight.map(height => {
                return null;
            })
            for (let index in state.drawersHeights) {
                if (curDrawerHeight[index] > 400) {
                    badDrawersIds.splice(parseInt(index), 1, "tooHeight");
                }
                if (curDrawerHeight[index] < 120) {
                    badDrawersIds.splice(parseInt(index), 1, "tooLow");
                }

            }
                return {
                    ...state,
                    activeDrawer: null,
                    errorTypes: badDrawersIds,
                }

        case(actionTypes.CHECK_CABINET):
            let cabinetValid = false;
            let cabinetError = false;
            const sumOfDrawersHeights = state.drawersHeights.reduce((a,b) => a+b, 0);
            if ((
                    state.cabinetType === "jedneDrzwi" ||
                (
                    state.cabinetType === "szufladaDrzwi" &&
                    sumOfDrawersHeights + calculateSpacing() + 100 <= state.cabinetHeight &&
                    sumOfDrawersHeights >= 100
                ) ||
                (
                    sumOfDrawersHeights + calculateSpacing() === state.cabinetHeight
                )) && state.cabinetWidth > 299 && state.cabinetWidth <901



            ) {
                cabinetValid = true
            } else {
                if(state.cabinetWidth > 900) cabinetError = "tooWide";
                if(state.cabinetWidth < 300) cabinetError = "tooNarrow";
                if (state.cabinetType === "szufladaDrzwi" &&
                sumOfDrawersHeights + calculateSpacing() + 100 > state.cabinetHeight) cabinetError = "tooHeightOneDrawer";
                if (state.cabinetType === "szufladaDrzwi" && sumOfDrawersHeights < 100) cabinetError = "tooLowOneDrawer";
                if (state.cabinetType === "szuflady" && sumOfDrawersHeights + calculateSpacing() > state.cabinetHeight) cabinetError = "tooHeight";
                if (state.cabinetType === "szuflady" && sumOfDrawersHeights + calculateSpacing() < state.cabinetHeight)  cabinetError = "tooLow"

            }
            return {
                ...state,
                cabinetValid: cabinetValid,
                cabinetError: cabinetError,
            }

        case(actionTypes.HOVER_CABINET_ON_VISUALIZATION):
            const hoveredCabinetArrayIndex = state.cabinets.findIndex(findCabinetId);
            let canMoveLeft = true;
            let canMoveRight = true;
            if(hoveredCabinetArrayIndex === 0) canMoveLeft = false;
            if(hoveredCabinetArrayIndex === state.cabinets.length-1) canMoveRight = false;
            const canMove = {left: canMoveLeft, right: canMoveRight}
            return {
                ...state,
                hoveredCabinet: action.cabinetId,
                canMove: canMove,
            }

        case(actionTypes.DELETE_CABINET):
            const deletionIndex = state.cabinets.findIndex(findCabinetId);
            console.log(deletionIndex)
            const updatedCabinetsArray = [
                ...state.cabinets.slice(0,deletionIndex),
                ...state.cabinets.slice(deletionIndex+1


                )
            ]
            return {
                ...state,
                cabinets: updatedCabinetsArray,
            }

        case(actionTypes.MOVE_CABINET):
            const cabinetsBeforeMove = [...state.cabinets];
            const cabinetToBeMovedIndex = state.cabinets.findIndex(findCabinetId);
            const cabinetToBeMoved = {...cabinetsBeforeMove[cabinetToBeMovedIndex]}
            const collidingCabinet = {...cabinetsBeforeMove[cabinetToBeMovedIndex+action.positionChange]}
            const cabinetsAfterMove = cabinetsBeforeMove.map((cabinet, index) => {
                if(index !== cabinetToBeMovedIndex && index !== cabinetToBeMovedIndex+action.positionChange) {
                    return cabinet
                }
                if(index === cabinetToBeMovedIndex) {
                    return collidingCabinet
                }
                if (index === cabinetToBeMovedIndex+action.positionChange) {
                    return cabinetToBeMoved
                }
            })
            return {
                ...state,
                cabinets: cabinetsAfterMove,
            }

    }

    return state;
}

export default reducer;
