import { SHOW_GARAGES } from "../types";

export const showGarages = (json) => ({ type: SHOW_GARAGES, payload: json })

export const fetchData = () => {
    return async dispatch => {
        try {
            let response = await fetch("http://192.168.25.2:3000/api/v1/listSales");
            let json = await response.json();
            dispatch(showGarages(json));
        }
        catch (e) {
            console.log(e);
        }

    }
}

