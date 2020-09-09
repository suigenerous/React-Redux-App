import {FETCHING, REDIRECTED, REDIRECTING, AUTHORIZING, FETCHING_TOKEN, FETCH_TOKEN_SUCCESS, FETCH_ERROR, FETCH_DATA_SUCCESS} from '../actions'

const initialState = {
    authorized: false,
    tokenFetched: false,
    authorizing: false,
    fetchingToken: false,
    redirected: false,
    token: '',
    spotifyData: {},
    fetchingData: false,
    errors: {},
};

export const spotifyReducer = (state = initialState, action) => {
    switch (action.type){
        case REDIRECTED:
            return {...state, redirected: true};
        case FETCH_TOKEN_SUCCESS:
            return {...state, token: action.payload, tokenFetched: true};
        case FETCH_DATA_SUCCESS:
            return {...state, spotifyData: action.payload, authorized: true} 
        default:
            return state;
    }
};