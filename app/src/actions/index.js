import axios from 'axios';

export const FETCHING = "FETCHING";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";

const API_URL = 'google.com'; // add spotify URL here

export const spotifyFetch = () => {
    const spotifyPromise = axios.get(API_URL);
    return dispatch => {
        dispatch({type: FETCHING});
        spotifyPromise
            .then (res => {
                dispatch({type: FETCH_SUCCESS, payload: res.data})
            })
            .catch (err => {
                dispatch({type: FETCH_ERROR, payload: err})
            });
    };
};