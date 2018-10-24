import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cabinets: [],
    cabinetsCount: 0,
    kitchenType: "prostaJedenRzad",
    kitchenWidth: "",
    leftSpace: "",
    kitchenHeight: 2400,
    spaceBetweenDrawers: "",
    spaceDrawersToTop: "",
    spaceBetweenCabinets: "",
    cabinetDepth: "",
    cabinetHeight: "",
    upperCabinetHeight: "",
    upperCabinetDepth: "",
    legsHeight: "",
    scale: 6,
    uniqueId: 1,
    kitchenSink: false,
    hob: false,

    cabinetId: 1,
    cabinetType: "",
    cabinetWidth: 600,
    doubleDoors: false,
    shelfsCount: 0,
    upperDoubleDoors: false,
    upperShelfsCount: 0,
    drawersHeights: [],
    drawersCounterState: 3,
    blockedDrawers: [],
    activeDrawer: null,
    errorTypes: [],
    cabinetValid: false,
    cabinetError: "noCabinetType",

    formatki: [],
    editInProgress: false,
    editedCabinetWidth: "",
    hoveredCabinet: false,
    canMove: {
        left: true,
        right: true,
    },
    focusedParamInput: "",
    showErrors: false,
    validParams: {
        kitchenWidth: false,
        cabinetDepth: false,
        cabinetHeight: false,
        upperCabinetHeight: false,
        upperCabinetDepth: false,
        spaceDrawersToTop: false,
        spaceBetweenDrawers: false,
        spaceBetweenCabinets: false,
        legsHeight: false,
    },
    validForm: false,
    kitchenCabinetsValid: false,

    showLowDrawersDetails: false,
    showHighDrawersDetails: false,

    showMobileMenu: false,
    defaultsButtonText: "?",
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
                    (Math.floor(2*(state.cabinetHeight-
                        state.spaceDrawersToTop-
                        state.spaceBetweenDrawers*
                        (newArrayCount-1))/newArrayCount
                    )/2));
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

    const calculateCabinestWidthSum = (spaceAroundCabinets = 5) => {
        return (
            [...state.cabinets].map(cabinet => {
                return cabinet.cabinetWidth
            }).reduce((a,b) => a+b, 0) +spaceAroundCabinets
        )
    }

    const checkCabinetWidthValid = (currentCabinetWidth) => {
        if(calculateCabinestWidthSum() + currentCabinetWidth > state.kitchenWidth) {
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
        case(actionTypes.TOGGLER):
            return{
                ...state,
                [action.toggledParamName] : !state[action.toggledParamName]
            }
        case(actionTypes.CLICK_DEFAULTS):
            let defaultsButtonText = action.event.target.value;
            defaultsButtonText === "?" ?  defaultsButtonText = "Domyślne parametry?" : defaultsButtonText = "?"
            return {
                ...state,
                defaultsButtonText: defaultsButtonText,
            }

        case(actionTypes.CHANGE_KITCHEN_TYPE):
            let formValidation = state.validForm;
            if(!action.event.target.value.includes("edenRzad") && !state.validParams.upperCabinetHeight) {
                formValidation = false;
            }
                return {
                    ...state,
                    kitchenType: action.event.target.value,
                    validForm: formValidation,
                    kitchenHeight: action.event.target.value.includes("edenRzad") ? 1400 : 2400
                }

        case(actionTypes.CLICK_MENU): {
            return {
                ...state,
                showMobileMenu: !state.showMobileMenu,
            }
        }

        case(actionTypes.HIDE_MENU): {
            return{
                ...state,
                showMobileMenu: false,
            }
        }

        case(actionTypes.TOGGLE_DEVICE):
            return {
                ...state,
                [action.deviceName]: !state[action.deviceName],
            }

        case(actionTypes.CHANGE_DOORS_COUNT):
            if(action.upperCabinets) {
                return {
                    ...state,
                    upperDoubleDoors: action.count,
                }
            } else {
                return {
                    ...state,
                    doubleDoors: action.count,
                }
            }

        case(actionTypes.CHANGE_SHELFS_COUNT):
            if(action.upperCabinets) {
                return {
                    ...state,
                    upperShelfsCount: parseInt(action.count, 10),
                }
            } else {
                return {
                    ...state,
                    shelfsCount: parseInt(action.count, 10),
                }
            }

        case(actionTypes.FILL_CABINET_WIDTH):
            let fillingWidth = state.leftSpace
            if(state.editInProgress) {
                fillingWidth = state.leftSpace + state.editedCabinetWidth;
            }
            return {
                ...state,
                cabinetWidth: fillingWidth,
            }

        case(actionTypes.EDIT_CABINET):
            const editIndex = state.cabinets.findIndex(findCabinetId);
            const cabinetToBeEdited = {...state.cabinets[editIndex]};
            let editedDrawersHeights = [];
            if (cabinetToBeEdited.type !== "drzwi") editedDrawersHeights = [...cabinetToBeEdited.drawersHeights];
            return {
                ...state,
                cabinetId: cabinetToBeEdited.cabinetId,
                cabinetType: cabinetToBeEdited.cabinetType,
                cabinetWidth: cabinetToBeEdited.cabinetWidth,
                drawersHeights: editedDrawersHeights,
                drawersCounterState: editedDrawersHeights.length,
                activeDrawer: null,
                errorTypes: [],
                editInProgress: true,
                editedCabinetWidth: cabinetToBeEdited.cabinetWidth,
                blockedDrawers: createBlockedDrawersArray(),
                doubleDoors: cabinetToBeEdited.doubleDoors,
                shelfsCount: cabinetToBeEdited.shelfsCount,
                upperDoubleDoors: cabinetToBeEdited.upperDoubleDoors,
                upperShelfsCount: cabinetToBeEdited.upperShelfsCount,
                hob: cabinetToBeEdited.hob,
                kitchenSink: cabinetToBeEdited.kitchenSink,
            }

        case(actionTypes.SAVE_CABINET):
            const savedCabinetParams = {
                cabinetId: state.cabinetId,
                cabinetType: state.cabinetType,
                cabinetWidth: state.cabinetWidth,
                drawersHeights: [...state.drawersHeights],
                blockedDrawers: createBlockedDrawersArray(),
                doubleDoors: state.doubleDoors,
                shelfsCount: state.shelfsCount,
                upperDoubleDoors: state.upperDoubleDoors,
                upperShelfsCount: state.upperShelfsCount,
                kitchenSink: state.kitchenSink,
                hob: state.hob,
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

        case(actionTypes.CHANGE_CABINET_TYPE):
            let updateDrawersCount = 0;
            switch(action.event.target.value) {
                case('szufladaDrzwi'): updateDrawersCount = 1; break;
                case('jedneDrzwi'): updateDrawersCount = 0; break;
                case('szuflady'): updateDrawersCount = 3; break;
                case('zmywarka'): updateDrawersCount = 0; break;
                default: updateDrawersCount = 0;
            }
            const drawersBlocked = Array(updateDrawersCount).fill(false);
            return {
                ...state,
                cabinetType: action.event.target.value,
                drawersHeights: updateDrawersArray(updateDrawersCount),
                errorTypes: [],
                blockedDrawers: drawersBlocked,
                doubleDoors: false,
                shelfsCount: 0,
                kitchenSink: false,
                hob: false,
            }

        case(actionTypes.CHANGE_DRAWER_COUNT):
            const newBlockedDrawers = Array(parseInt(action.event.target.value, 10)).fill(false);
            return {
                ...state,
                drawersCounterState: action.event.target.value,
                drawersHeights: updateDrawersArray(action.event.target.value),
                blockedDrawers: newBlockedDrawers,
            }

        case(actionTypes.CHANGE_CABINET_WIDTH):
            return {
                ...state,
                cabinetWidth: parseInt(action.event.target.value, 10),
            }

        case(actionTypes.ADD_CABINET):
            const newIloscSzafek = state.cabinetsCount+1;
            const newCabinetId = state.uniqueId;
            const newCabinetParams = {
                cabinetId: state.uniqueId,
                cabinetType: state.cabinetType,
                cabinetWidth: state.cabinetWidth,
                drawersHeights: [...state.drawersHeights],
                doubleDoors: state.doubleDoors,
                shelfsCount: state.shelfsCount,
                hob: state.hob,
                kitchenSink: state.kitchenSink,
                upperDoubleDoors: state.upperDoubleDoors,
                upperShelfsCount: state.upperShelfsCount,
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
            newDrawersHeights[action.id] = parseInt(action.event.target.value, 10);
            return {
                ...state,
                drawersHeights: newDrawersHeights
            }

        case(actionTypes.DRAWERS_AUTO_FILL):
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
            const unBlockedDrawersCount = [...state.blockedDrawers].filter((a)=> a!==true).length;
                        console.log(unBlockedDrawersCount);
            const blockedDrawers = curDrawers.map((height, id) => {
                if(state.blockedDrawers[id]) {
                    return state.drawersHeights[id]
                } else {
                    return 0
                }
            });
            const blockedDrawersSum = blockedDrawers.reduce((a, b) => a+b, 0);

            const adjustedHeight =
                Math.round(((state.cabinetHeight-calculateSpacing()-blockedDrawersSum)/unBlockedDrawersCount)*2)/2;

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
                    badDrawersIds.splice(parseInt(index, 10), 1, "tooHeight");
                }
                if (curDrawerHeight[index] < 120) {
                    badDrawersIds.splice(parseInt(index, 10), 1, "tooLow");
                }

            }
                return {
                    ...state,
                    activeDrawer: null,
                    errorTypes: badDrawersIds,
                }

        case(actionTypes.CHECK_CABINET):
            let cabinetError = false;
            const sumOfDrawersHeights = state.drawersHeights.reduce((a,b) => a+b, 0);
            if(state.cabinetWidth > 900) cabinetError = "tooWide";
            if(state.cabinetWidth < 300) cabinetError = "tooNarrow";
            if (state.cabinetType === "szufladaDrzwi" &&
            sumOfDrawersHeights + calculateSpacing() + 100 > state.cabinetHeight) cabinetError = "tooHeightOneDrawer";
            if (state.cabinetType === "szufladaDrzwi" && sumOfDrawersHeights < 100) cabinetError = "tooLowOneDrawer";
            if (state.cabinetType === "szuflady" && sumOfDrawersHeights + calculateSpacing() > state.cabinetHeight + 0.5) cabinetError = "tooHeight";
            if (state.cabinetType === "szuflady" && sumOfDrawersHeights + calculateSpacing() < state.cabinetHeight - 0.5)  cabinetError = "tooLow"


            let editedCabinetOldWidth = 0;
            if(state.editInProgress) {
                editedCabinetOldWidth = state.editedCabinetWidth
            }

            if(!checkCabinetWidthValid(parseInt(state.cabinetWidth, 10)-editedCabinetOldWidth)) {
                cabinetError = "tooWideCabinet";
            }
            //check whole kitchen validation
            let kitchenCabinetsValid = true;
            if(calculateCabinestWidthSum(15) < state.kitchenWidth) {
                kitchenCabinetsValid = false;
            }

            if(state.cabinetType==="") {
                cabinetError = "noCabinetType"
            }

            const leftSpace = state.kitchenWidth - calculateCabinestWidthSum();

            return {
                ...state,
                leftSpace: leftSpace,
                cabinetError: cabinetError,
                kitchenCabinetsValid: kitchenCabinetsValid,
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
                frontyGorne: [],
                plyta16mm: [],
            };
            let allAccessories = [
                {
                    name: "hinges",
                    fullname: "Zawiasy",
                    count: 0,
                    productCode: "71B3550",
                    price: 10.6,
                    type: "acc",
                    screwsToHold: 2,
                },
                {
                    name: "hingesHolders",
                    fullname: "Prowadniki zawiasów",
                    count: 0,
                    productCode: "173L6100",
                    price: 0.65,
                    type: "acc",
                    screwsToHold: 2,
                },
                {
                    name: "shelfHolders",
                    fullname: "Wsporniki półek",
                    count: 0,
                    productCode: "wspornik półki fi 5",
                    price: 0.06,
                    type: "acc",
                },
                {
                    name: "legs",
                    fullname: "Nóżki",
                    count: 0,
                    productCode: "Nóżka Wurth",
                    price: 3,
                    type: "acc",

                },
                {
                    name: "handles",
                    fullname: "Uchwyty meblowe",
                    count: 0,
                    productCode: "uchwyty meblowe",
                    price: 20,
                    type: "acc",
                },
                {
                    name: "lowDrawers",
                    fullname: "Niskie szuflady",
                    count: 0,
                    productCode: "Niska szuflada blum",
                    price: 150,
                    type: "drawer",
                    screwsToHold: 24,
                },
                {
                    name: "highDrawers",
                    fullname: "Wysokie szuflady",
                    count: 0,
                    productCode: "Wysoka szuflada blum",
                    price: 150,
                    type: "drawer",
                    screwsToHold: 32,
                },
                {
                    name: "confirmats",
                    fullname: "Konfirmaty 6.4x50",
                    count: 0,
                    productCode: "Konfirmaty 6.4x50",
                    price: 0.3,
                    type: "screw",
                },
                {
                    name: "3.5x16",
                    fullname: "Wkręty 3,5x16mm",
                    count: 0,
                    productCode: "Wkręty SPAX 3,5x16mm",
                    price: 0.13,
                    type: "screw",
                },

            ]
            const addAcc = (accessorieName, count) => {
                allAccessories = allAccessories.map(acc => {
                    if(acc.name=== accessorieName) {
                        return {
                            ...acc,
                            count: acc.count + count,
                        }
                    } else {
                            return {
                                ...acc,
                            }
                        }
                    })}

            state.cabinets.map(cabinet => {
                //płyty i akcesoria na górne szafki
                if(!state.kitchenType.includes("edenRzad")){
                    addAcc("confirmats", 8);
                    primaryAllFormsArray.plyta18mm.push({
                        wymiary: state.upperCabinetDepth.toString()+"x"+(cabinet.cabinetWidth-36).toString()+"mm",
                        okleina: state.upperCabinetDepth < state.upperCabinetHeight ? 'd1' : 'k1',
                        ilosc: 2,
                    });
                    primaryAllFormsArray.plyta18mm.push({
                        wymiary: state.upperCabinetDepth.toString()+"x"+state.upperCabinetHeight.toString()+"mm",
                        okleina: state.upperCabinetDepth > cabinet.cabinetWidth-36? 'k1' : 'd1',
                        ilosc: 2,
                    });
                    if(cabinet.upperShelfsCount>0) {
                        primaryAllFormsArray.plyta16mm.push({
                            wymiary: (state.upperCabinetDepth-5).toString()+"x"+(cabinet.cabinetWidth-37).toString()+"mm",
                            okleina: state.upperCabinetDepth > cabinet.cabinetWidth-37? 'k1' : 'd1',
                            ilosc: cabinet.upperShelfsCount,
                        });
                        addAcc("shelfHolders", cabinet.upperShelfsCount*4);
                    }
                    if(cabinet.upperDoubleDoors) {
                        primaryAllFormsArray.frontyGorne.push({
                            wymiary:
                                state.upperCabinetHeight.toString()
                                +"x"+
                                ((cabinet.cabinetWidth-state.spaceBetweenDrawers-state.spaceBetweenCabinets/2)/2).toString()+"mm",
                            okleina: "full",
                            ilosc: 2,
                        });
                        addAcc("hinges", Math.ceil(state.upperCabinetHeight/399)*2);
                    } else {
                        primaryAllFormsArray.frontyGorne.push({
                            wymiary:
                                state.upperCabinetHeight.toString()
                                +"x"+
                                (cabinet.cabinetWidth-state.spaceBetweenCabinets/2).toString()+"mm",
                            okleina: "full",
                            ilosc: 1,
                        });
                        addAcc("hinges", Math.ceil(state.upperCabinetHeight/399));
                    }
                }
                //płyty na dolne szafki i resztę
                if(cabinet.cabinetType !== "zmywarka") {
                    let trawers = {
                        wymiary: state.cabinetDepth.toString()+"x"+(cabinet.cabinetWidth-36).toString()+"mm",
                        okleina: state.cabinetDepth > cabinet.cabinetWidth-36? 'k1' : 'd1',
                        ilosc: 2,
                    }
                    if(cabinet.kitchenSink) {
                        trawers = {
                            wymiary: state.cabinetDepth.toString()+"x"+(cabinet.cabinetWidth-36).toString()+"mm",
                            okleina: state.cabinetDepth > cabinet.cabinetWidth-36? 'k1' : 'd1',
                            ilosc: 1,
                        };
                        primaryAllFormsArray.plyta18mm.push({
                            wymiary: "80x"+(cabinet.cabinetWidth-36).toString()+"mm",
                            okleina: 'd2',
                            ilosc: 2,
                        });
                        addAcc("confirmats", 4)
                    }
                    primaryAllFormsArray.plyta18mm.push(trawers);
                    primaryAllFormsArray.plyta18mm.push({
                        wymiary: state.cabinetDepth.toString()+"x"+state.cabinetHeight.toString()+"mm",
                        okleina: state.cabinetDepth < state.cabinetHeight ? 'd1' : 'k1',
                        ilosc: 2,
                    });

                    if(cabinet.shelfsCount>0) {
                        primaryAllFormsArray.plyta16mm.push({
                            wymiary: (state.cabinetDepth-5).toString()+"x"+(cabinet.cabinetWidth-37).toString()+"mm",
                            okleina: state.cabinetDepth > cabinet.cabinetWidth-37? 'k1' : 'd1',
                            ilosc: cabinet.shelfsCount,
                        });
                        addAcc("shelfHolders", cabinet.shelfsCount*4);
                    }

                    let wymiaryPlecow = "";
                    if (cabinet.cabinetType === 'jedneDrzwi') {
                        if(cabinet.doubleDoors) {
                            primaryAllFormsArray.fronty.push({
                                wymiary:
                                    (state.cabinetHeight-state.spaceDrawersToTop).toString()
                                    +"x"+
                                    ((cabinet.cabinetWidth-state.spaceBetweenDrawers-state.spaceBetweenCabinets/2)/2).toString()+"mm",
                                okleina: "full",
                                ilosc: 2,
                            });
                            addAcc("hinges", 4);
                        } else {
                            primaryAllFormsArray.fronty.push({
                                wymiary:
                                    (state.cabinetHeight-state.spaceDrawersToTop).toString()
                                    +"x"+
                                    (cabinet.cabinetWidth-state.spaceBetweenCabinets/2).toString()+"mm",
                                okleina: "full",
                                ilosc: 1,
                            });
                            addAcc("hinges", 2);
                        }
                    } else if (cabinet.cabinetType === 'szufladaDrzwi') {
                        primaryAllFormsArray.fronty.push({
                            wymiary:
                                cabinet.drawersHeights[0].toString()
                                +"x"+
                                (cabinet.cabinetWidth-state.spaceBetweenCabinets/2).toString()+"mm",
                            okleina: "full",
                            ilosc: 1,
                        });

                        if(cabinet.doubleDoors) {
                            primaryAllFormsArray.fronty.push({
                                wymiary:
                                    (state.cabinetHeight-cabinet.drawersHeights[0]-2*state.spaceBetweenDrawers).toString()
                                    +"x"+
                                    ((cabinet.cabinetWidth-state.spaceBetweenDrawers-state.spaceBetweenCabinets/2)/2).toString()+"mm",
                                okleina: "full",
                                ilosc: 2,
                            });
                            addAcc("hinges", 4)
                        } else {
                            primaryAllFormsArray.fronty.push({
                                wymiary:
                                    (state.cabinetHeight-cabinet.drawersHeights[0]-2*state.spaceBetweenDrawers).toString()
                                    +"x"+
                                    (cabinet.cabinetWidth-state.spaceBetweenCabinets/2).toString()+"mm",
                                okleina: "full",
                                ilosc: 1,
                            });
                            addAcc("hinges", 2)
                        }
                        if (cabinet.drawersHeights[0] < 224) {
                            wymiaryPlecow = cabinet.cabinetWidth-123+"x84mm";
                            addAcc("lowDrawers", 1);
                        }
                        else {
                            wymiaryPlecow = cabinet.cabinetWidth-123+"x199mm";
                            addAcc("highDrawers", 1);
                        }
                        primaryAllFormsArray.plyta16mm.push({
                            wymiary: wymiaryPlecow,
                            okleina: 'd1',
                            ilosc: 1,
                        });
                        primaryAllFormsArray.plyta16mm.push({
                            wymiary: (cabinet.cabinetWidth-111).toString()+"x476mm",
                            okleina: null,
                            ilosc: cabinet.drawersHeights.length,
                        });
                    } else if (cabinet.cabinetType === 'szuflady') {
                        const allDrawers = cabinet.drawersHeights;
                        allDrawers.map(wysokoscFrontu => {
                            primaryAllFormsArray.fronty.push({
                                wymiary:
                                    wysokoscFrontu.toString()
                                    +"x"+
                                    (cabinet.cabinetWidth-state.spaceBetweenCabinets/2).toString()+"mm",
                                okleina: "full",
                                ilosc: 1,
                            })
                            if (wysokoscFrontu < 224) {
                                wymiaryPlecow = cabinet.cabinetWidth-123+"x84mm";
                                addAcc("lowDrawers", 1);
                            }
                                else {
                                    wymiaryPlecow = cabinet.cabinetWidth-123+"x199mm";
                                    addAcc("highDrawers", 1);
                                }
                                primaryAllFormsArray.plyta16mm.push({
                                    wymiary: wymiaryPlecow,
                                    okleina: 'd1',
                                    ilosc: 1,
                                });
                        });
                        primaryAllFormsArray.plyta16mm.push({
                            wymiary: (cabinet.cabinetWidth-111).toString()+"x476mm",
                            okleina: null,
                            ilosc: cabinet.drawersHeights.length,
                        });
                    }

                    addAcc("legs", 4);
                    addAcc("confirmats", 8);
                } else {
                    primaryAllFormsArray.fronty.push({
                        wymiary:
                            (state.cabinetHeight-state.spaceDrawersToTop).toString()
                            +"x"+
                            (cabinet.cabinetWidth-state.spaceBetweenCabinets/2).toString()+"mm",
                        okleina: "full",
                        ilosc: 1,
                    });
                    addAcc("legs", 4);
                }
            });

            allAccessories.map(acc => {
                if(acc.screwsToHold) {
                    addAcc("3.5x16", acc.count*acc.screwsToHold)
                }
            })

            let blenda = {
                wymiary: calculateCabinestWidthSum()+"x"+state.legsHeight+"mm",
                okleina: null,
                ilosc: 1,
            };
            if(calculateCabinestWidthSum()>2700) {
                const iloscBlend = Math.ceil(calculateCabinestWidthSum()/2700);
                blenda = {
                    wymiary: calculateCabinestWidthSum()/iloscBlend+"x"+state.legsHeight+"mm",
                    okleina: null,
                    ilosc: iloscBlend,
                }
            }
            primaryAllFormsArray.plyta18mm.push(blenda);

            let iloscFrontow = 0;
            const allFronts = primaryAllFormsArray.fronty.concat(primaryAllFormsArray.frontyGorne);
            for (const front of allFronts) {
                iloscFrontow = iloscFrontow + front.ilosc;
            };
            addAcc("handles", iloscFrontow);


            primaryAllFormsArray.plyta18mm = summarizeForms(primaryAllFormsArray.plyta18mm);
            primaryAllFormsArray.fronty = summarizeForms(primaryAllFormsArray.fronty);
            primaryAllFormsArray.frontyGorne = summarizeForms(primaryAllFormsArray.frontyGorne);
            primaryAllFormsArray.plyta16mm = summarizeForms(primaryAllFormsArray.plyta16mm);
            return {
                ...state,
                formatki: primaryAllFormsArray,
                okucia: allAccessories,
            }

        case(actionTypes.CHANGE_KITCHEN_PARAM):
            let valueValid = true;
            if(
                action.paramValue < action.paramMinValue ||
                action.paramValue > action.paramMaxValue
            ) {
                valueValid = false;
            }
            const newValidParams = {...state.validParams};
            newValidParams[action.paramName] = valueValid;
            let validForm = true;
            for (const paramName in newValidParams) {
                if(
                    newValidParams[paramName] === false &&
                    !(paramName.includes("upperCabinet") && state.kitchenType.includes("edenRzad"))
                ) {
                    validForm = false;
                }
            };
            let defaultLeftSpace = null;
            if (action.paramName === "kitchenWidth") {
                defaultLeftSpace = parseInt(action.paramValue, 10) - 5;
            }
            return {
                ...state,
                [action.paramName]: parseInt(action.paramValue, 10),
                leftSpace: defaultLeftSpace,
                validParams: newValidParams,
                validForm: validForm,
            }

        // case(actionTypes.SAVE_PARAMS):
        //     const curProjects = [];
        //     axios.get('/projekty.json')
        //         .then(res => {
        //             for(let key in res.data) {
        //                 curProjects.push(res.data[key])
        //             }
        //
        //         });
        //     console.log(curProjects.length)
        //     const kitchenParams = {
        //         kitchenWidth: state.kitchenWidth,
        //         kitchenHeight: state.kitchenHeight,
        //         spaceBetweenDrawers: state.spaceBetweenDrawers,
        //         spaceDrawersToTop: state.spaceDrawersToTop,
        //         spaceBetweenCabinets: state.spaceBetweenCabinets,
        //         cabinetDepth: state.cabinetDepth,
        //         cabinetHeight: state.cabinetHeight,
        //     }
        //     axios.post('/projekty.json', {projectKey: curProjects.length, kitchenParams: kitchenParams,})
        //         .then(response => console.log(response))
        //         .catch(error => console.log(error));

        case(actionTypes.FOCUS_INPUT):
            return{
                ...state,
                focusedParamInput: action.paramName,
            }

        case(actionTypes.SHOW_ERRORS):
            return {
                ...state,
                showErrors: action.ifShow,
            }

        case(actionTypes.SET_DEFAULTS_PARAMS):
            let defaultTopDrawersHeight = "";
            let defaultTopDrawersDepth = "";
            if(!state.kitchenType.includes("edenRzad")) {
                defaultTopDrawersHeight = 900;
                defaultTopDrawersDepth = 300;
            }
            const currentKitchenWidthValidity = state.validParams.kitchenWidth;
            return {
                ...state,
                cabinetDepth: 550,
                cabinetHeight: 750,
                upperCabinetHeight: defaultTopDrawersHeight,
                upperCabinetDepth: defaultTopDrawersDepth,
                spaceDrawersToTop: 3,
                spaceBetweenDrawers: 3,
                spaceBetweenCabinets: 2,
                legsHeight: 100,
                validParams: {
                    kitchenWidth: state.validParams.kitchenWidth,
                    cabinetDepth: true,
                    cabinetHeight: true,
                    upperCabinetHeight: state.kitchenType.includes("edenRzad") ? false : true,
                    upperCabinetDepth: state.kitchenType.includes("edenRzad") ? false : true,
                    spaceDrawersToTop: true,
                    spaceBetweenDrawers: true,
                    spaceBetweenCabinets: true,
                    legsHeight: true,
                },
                validForm: currentKitchenWidthValidity,
                defaultsButtonText: "?",
            }

        case(actionTypes.TOGGLE_DRAWERS_DETAILS):
            console.log(action.drawerSize)
            if(action.drawerSize === "highDrawers") {
                return {
                    ...state,
                    showHighDrawersDetails: !state.showHighDrawersDetails,
                }
            } else {
                return {
                    ...state,
                    showLowDrawersDetails: !state.showLowDrawersDetails,
                }
            }

        default:
    }

    return state;
}

export default reducer;
