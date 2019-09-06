import { SHOW_GARAGES } from "../types";

const initialState = {
    markers: []
};

const garageReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case SHOW_GARAGES:
            return { markers: action.payload }

        default:
            console.log(action.type);
            return state;
    }
};

export default garageReducer;
