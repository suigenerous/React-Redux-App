import axios from 'axios';

import {spotifyRedirect, currentHash, axiosGetter, createHeader }from '../utils/'

export const FETCHING = "FETCHING";
export const FETCHING_TOKEN = "FETCHING_TOKEN";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const AUTHORIZING = "AUTHORIZING";
export const REDIRECTING = "REDIRECTING";
export const REDIRECTED = "REDIRECTED"

export const spotifyRedirectAction = () => {
    return function(dispatch){
        console.log('inside spotify redirecting')
        // initial dispatch while token fetching is in process
        dispatch({
            type: REDIRECTING
        })
        // deploys spotify Redirect function
        spotifyRedirect();
        dispatch ({
            type: REDIRECTED
        })
    }
}

export const spotifyFetchTokenAction = () => {
    return function(dispatch){
        console.log('inside fetching token')
        // initial dispatch while token fetching is in process
        dispatch({
            type: FETCHING_TOKEN
        })
        // deploys spotify Redirect function
        spotifyRedirect();
    }
}

export const spotifyFetchData = () => {
    return;
};