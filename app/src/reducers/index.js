import {FETCHING, FETCH_SUCCESS, FETCH_ERROR} from '../actions'

const initialState = {
    authorized: false,
    spotifyData: {},
    fetchingData: false,
    errors: {}
};

export const spotifyReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCHING:
            return {...state, fetchingData: true};
        case FETCH_SUCCESS:
            return {...state, spotifyData: action.payload, fetchingData: false, authorized: true};
        case FETCH_ERROR:
            return {...state, errors: action.payload, fetchingData: false, authorized: false};
        default:
            return state;
    }
}