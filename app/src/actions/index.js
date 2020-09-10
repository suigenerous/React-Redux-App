import axios from 'axios';
import {spotifyRedirect, currentHash, axiosGetter, createHeader }from '../utils/'

export const FETCHING = "FETCHING";
export const FETCHING_TOKEN = "FETCHING_TOKEN";
export const FETCH_TOKEN_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const AUTHORIZING = "AUTHORIZING";
export const REDIRECTING = "REDIRECTING";
export const REDIRECTED = "REDIRECTED";
export const FETCHING_DATA = "FETCHING_DATA";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";

export const spotifyRedirectAction = () => {
    return function(dispatch){
        console.log('inside spotify redirecting');
        // initial dispatch while token fetching is in process
        dispatch({
            type: REDIRECTING
        });
        // deploys spotify Redirect function
        spotifyRedirect();
        dispatch ({
            type: REDIRECTED
        });
    }
}

export const spotifyFetchTokenAction = () => {
    return function(dispatch){
        console.log('inside fetching token');
        // initial dispatch while token fetching is in process
        dispatch({
            type: FETCHING_TOKEN
        });
        const accessToken = currentHash();
        dispatch({
            type: FETCH_TOKEN_SUCCESS,
            payload: accessToken
        });
    }
}

export const spotifyFetchDataAction = (token) => {
    return function(dispatch){
        console.log('inside fetching data');
        dispatch({
            type: FETCHING_DATA
        })
        const header = createHeader(token);
        const limit = 50;
        let initialBefore = Date.now();
        let continueLoop = true;

        // const setData = ((data) => {return data});
        // let data = setData({});
        async function recursiveCaller(){
            let before = initialBefore;
            let res = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}&before=${before}`, {headers: header });
            do {
                try {
                    if (res !== null){
                        let res = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}&before=${before}`, {headers: header });
                        console.log(res.data.items);
                        before = res.data.cursors.after;
                    }
                }
                catch(e) {
                    console.log(e);
                    continueLoop = false;
                }
            }
            while (continueLoop);

        };
        recursiveCaller();
        
    };
};