import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cabinets: [],
    cabinetsCount: 0,
    kitchenWidth: 2400,
    kitchenHeight: 1000,
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
    },
    showForms: false,
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

    const checkCabinetWidthValid = (currentCabinetWidth) => {
        const calculateCabinestWidthSum = [...state.cabinets].map(cabinet => {
            return cabinet.cabinetWidth
            }).reduce((a,b) => a+b, 0);
        if(calculateCabinestWidthSum + currentCabinetWidth > state.kitchenWidth) {
            return false} else {return true}
        }

    const summarizeForms = (formsArray) => {
        const uniqueFormsArray = [];

        for(let i = 0; i<formsArray.length; i++) {
            let duplicate = false;
            for (let u = 0; u<uniqueFormsArray.length; u++) {
                if(
                    formsArray[i].wymiary === uniqueFormsArray[u].wymiary
                    &&
                    formsArray[i].okleina === uniqueFormsArray[u].okleina
                ) {
                    duplicate = true;
                }
            }
            if(!duplicate) {
                uniqueFormsArray.push(formsArray[i])
            }
        }
        const shortedFormsArray = uniqueFormsArray.map(formatka=> {
            let ilosc = 0;
            for(let i = 0; i< formsArray.length; i++) {
                if(
                    formatka.wymiary === formsArray[i].wymiary &&
                    formatka.okleina === formsArray[i].okleina
                ) {
                    ilosc = ilosc + formsArray[i].ilosc;
                };
            }
            return {
                ...formatka,
                ilosc: ilosc,
            }
        });
        return shortedFormsArray;
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
                    kitchenWidth: action.event.target.value,
                    kitchenHeight: 1000,
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

            if(!checkCabinetWidthValid(parseInt(state.cabinetWidth))) {
                cabinetValid = false;
                cabinetError = "tooWideCabinet";
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
            const cabinetToBeMoved = {...cabinetsBeforeMove[cabinetToBeMovedIndex]};
            const collidingCabinet = {...cabinetsBeforeMove[cabinetToBeMovedIndex+action.positionChange]};
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
            });
            return {
                ...state,
                cabinets: cabinetsAfterMove,
            };

        case(actionTypes.CALCULATE_FORMS):
            const primaryAllFormsArray = {
                plyta18mm: [],
                fronty: [],
                plyta16mm: [],
            };
            state.cabinets.map(cabinet => {
                let trawers = {
                    wymiary: state.cabinetDepth.toString()+"x"+(cabinet.cabinetWidth-36).toString()+"mm",
                    okleina: state.cabinetDepth > cabinet.cabinetWidth-36? 'k1' : 'd1',
                    ilosc: 2,
                }
                primaryAllFormsArray.plyta18mm.push(trawers);
                primaryAllFormsArray.plyta18mm.push({
                    wymiary: state.cabinetDepth.toString()+"x"+state.cabinetHeight.toString()+"mm",
                    okleina: state.cabinetDepth < state.cabinetHeight ? 'd1' : 'k1',
                    ilosc: 2,
                });

                let szufladyPlecy= [];
                let wymiaryPlecow = "";
                if (cabinet.cabinetType === 'jedneDrzwi') {
                    primaryAllFormsArray.fronty.push({
                        wymiary: (state.cabinetHeight-3).toString()+"x"+(cabinet.cabinetWidth-3).toString()+"mm",
                        okleina: "full",
                        ilosc: 1,
                    })
                } else if (cabinet.cabinetType === 'szufladaDrzwi') {
                    primaryAllFormsArray.fronty.push({
                        wymiary: cabinet.drawersHeights[0].toString()+"x"+(cabinet.cabinetWidth-3).toString()+"mm",
                        okleina: "full",
                        ilosc: 1,
                    })
                    primaryAllFormsArray.fronty.push({
                        wymiary: (state.cabinetHeight-cabinet.drawersHeights[0]-6).toString()+"x"+(cabinet.cabinetWidth-3).toString()+"mm",
                        okleina: "full",
                        ilosc: 1,
                    });
                    if (cabinet.drawersHeights[0] < 224) {wymiaryPlecow = cabinet.cabinetWidth-123+"x84mm";}
                    else {wymiaryPlecow = cabinet.cabinetWidth-123+"x199mm";}
                    primaryAllFormsArray.plyta16mm.push({
                        wymiary: wymiaryPlecow,
                        okleina: 'd1',
                        ilosc: 1,
                    });
                    primaryAllFormsArray.plyta16mm.push({
                        wymiary: (cabinet.cabinetWidth-111).toString()+"x"+"476mm",
                        okleina: null,
                        ilosc: cabinet.drawersHeights.length,
                    });
                } else if (cabinet.cabinetType === 'szuflady') {
                    const allDrawers = cabinet.drawersHeights;
                    allDrawers.map(wysokoscFrontu => {
                        primaryAllFormsArray.fronty.push({
                            wymiary: wysokoscFrontu.toString()+"x"+(cabinet.cabinetWidth-3).toString()+"mm",
                            okleina: "full",
                            ilosc: 1,
                        })
                        if (wysokoscFrontu < 224) wymiaryPlecow = cabinet.cabinetWidth-123+"x84mm";
                            else wymiaryPlecow = cabinet.cabinetWidth-123+"x199mm";
                            primaryAllFormsArray.plyta16mm.push({
                                wymiary: wymiaryPlecow,
                                okleina: 'd1',
                                ilosc: 1,
                            });
                    });
                    primaryAllFormsArray.plyta16mm.push({
                        wymiary: (cabinet.cabinetWidth-111).toString()+"x"+"476mm",
                        okleina: null,
                        ilosc: cabinet.drawersHeights.length,
                    });
                    // const uniqueDrawers = Array.from(new Set(allDrawers));
                    // const countDrawers = (wysokosc) => {
                    //     return allDrawers.filter(height => {
                    //         return height === wysokosc
                    //     }).length
                    // };
                    // fronty =
                    //     uniqueDrawers.map((wysokosc, id) => {
                    //         return {
                    //             ilosc: countDrawers(wysokosc),
                    //             wymiary: wysokosc.toString()+"x"+(cabinet.cabinetWidth-3).toString()+"mm",
                    //         }
                    //     });
                    // szufladyPlecy =
                    //     uniqueDrawers.map((wysokosc, id) => {
                    //         if (wysokosc < 224) wymiaryPlecow = cabinet.cabinetWidth-123+"x84mm";
                    //         else wymiaryPlecow = cabinet.cabinetWidth-123+"x199mm";
                    //         return {
                    //             ilosc: countDrawers(wysokosc),
                    //             wymiary: wymiaryPlecow,
                    //             okleina: 'd1',
                    //             typPlyty: '16mm'
                    //         }
                    //     })
                }
            });


            primaryAllFormsArray.plyta18mm = summarizeForms(primaryAllFormsArray.plyta18mm);
            primaryAllFormsArray.fronty = summarizeForms(primaryAllFormsArray.fronty);
            primaryAllFormsArray.plyta16mm = summarizeForms(primaryAllFormsArray.plyta16mm);
            return {
                ...state,
                formatki: primaryAllFormsArray,
                showForms: !state.showForms,
            }

    }

    return state;
}

export default reducer;
