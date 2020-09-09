import {FETCHING, REDIRECTED, REDIRECTING, AUTHORIZING, FETCHING_TOKEN, FETCH_TOKEN_SUCCESS, FETCH_ERROR} from '../actions'

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
            return {...state, token: action.payload, tokenFetched: true}
        default:
            return state;
    }
}