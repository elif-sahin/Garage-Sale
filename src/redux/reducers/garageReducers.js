import { SHOW_GARAGES } from "../types";

const initialState = {
    markers: []
};

const garageReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case SHOW_GARAGES:
            console.log("casedeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            console.log("reducerdan" + action.payload);
            return { markers: action.payload }

        default:
            console.log(action.type);
            console.log("defaulttaaaaaaaaaaaaaaa");
            return state;
    }
};

export default garageReducer;
