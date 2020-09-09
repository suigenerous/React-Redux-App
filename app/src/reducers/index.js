import {FETCHING, REDIRECTED, REDIRECTING, AUTHORIZING, FETCHING_TOKEN, FETCH_SUCCESS, FETCH_ERROR} from '../actions'

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
        case FETCHING_TOKEN:
            console.log('fetching token')
            return {...state, fetchingToken: true};
        default:
            return state;
    }
}