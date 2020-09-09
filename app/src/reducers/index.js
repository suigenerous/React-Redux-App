import {FETCHING, FETCHING_SUCCESS, FETCHING_ERROR} from '../actions'

const initialState = {
    spotifyData: {},
    fetchingData: false,
    errors: {}
};

export const spotifyReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCHING:
            return {...state, fetchingData: true};
        case FETCHING_SUCCESS:
            return {...state, spotifyData: action.payload, fetchingData: false};
        case FETCHING_ERROR:
            return {...state, errors: action.payload, fetchingData: false};
        default:
            return state;
    }
}