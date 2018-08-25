import * as actionTypes from '../actions/actionTypes';

const initialState = {
    kitchenWidth: '1200px',
    kitchenHeight: '500px',
    cabinetDepth: 550,
    cabinetHeight: 750,
    spaceBetweenDrawers: 3,
    spaceDrawersToTop: 3,
    cabinets: [
        {   id: 1,
            rodzaj: "",
            szerokosc: 600,
        }
    ],
    formatki: [],
    cabinetsCount: 0,
    drawersCounterState: 3,
    drawersHeights: [],
    activeDrawer: null,
    errorTypes: [],
    cabinetValid: false,
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
                drawersHeights: updateDrawersArray(updateDrawersCount),
                errorTypes: [],
            }

        case(actionTypes.CHANGE_DRAWER_COUNT):
            const currentCabinets = [state.cabinets];
            const newCabinets = currentCabinets.map(cabinet => {
                    return {
                        ... cabinet[0],
                        iloscSzuflad: action.event.target.value,
                        rodzaj: "szuflady"
                    }
            });
            return {
                ...state,
                cabinets: newCabinets,
                drawersCounterState: action.event.target.value,
                drawersHeights: updateDrawersArray(action.event.target.value),
            }

        case(actionTypes.CHANGE_CABINET_WIDTH):
            const currentCabinetWidth = {...state.cabinets};
            currentCabinetWidth[0].szerokosc = action.event.target.value;
            return {
                ...state,
                cabinets: currentCabinetWidth,
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
                    wymiary: state.drawersHeights[0].toString()+"x"+(state.cabinets[0].szerokosc-3).toString()+"mm",
                    okleina: "full",
                    typPlyty: 'front',
                },
                {   ilosc: 1,
                    wymiary: (state.cabinetHeight-state.drawersHeights[0]-6).toString()+"x"+(state.cabinets[0].szerokosc-3).toString()+"mm",
                    okleina: 'full',
                    typPlyty: 'front',
                },]
            } else if (state.cabinets[0].rodzaj === 'szuflady') {
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
                            wymiary: wysokosc.toString()+"x"+(state.cabinets[0].szerokosc-3).toString()+"mm",
                            okleina: 'full',
                            typPlyty: 'front',
                        }
                    });
            }

            newCabinetArray.push(fronty);
            const newIloscSzafek = state.cabinetsCount+1;


            return {
                    ...state,
                    formatki: newCabinetArray,
                    cabinetsCount: newIloscSzafek,
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
            const sumOfDrawersHeights = state.drawersHeights.reduce((a,b) => a+b, 0);
            if ((
                    state.cabinets[0].rodzaj === "jedneDrzwi" ||
                (
                    state.cabinets[0].rodzaj === "szufladaDrzwi" &&
                    sumOfDrawersHeights + calculateSpacing() + 100 <= state.cabinetHeight &&
                    sumOfDrawersHeights >= 100
                ) ||
                (
                    sumOfDrawersHeights + calculateSpacing() === state.cabinetHeight
                )) && state.cabinets[0].szerokosc > 299 && state.cabinets[0].szerokosc <901



            ) {
                cabinetValid = true
                }
            return {
                ...state,
                cabinetValid: cabinetValid,
            }

    }

    return state;
}

export default reducer;
