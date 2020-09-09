import axios from 'axios';

import { currentHash, createHeader } from '../utils'

export const FETCHING = "FETCHING";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";


export const spotifyFetch = () => {
    const header = createHeader(currentHash());
    const spotifyPromise = get('https://api.spotify.com/v1/me/player/recently-played', {headers: header });
    return dispatch => {
        dispatch({type: FETCHING});
        spotifyPromise
            .then (res => {
                // grabs an array of song objects from response and assigns to tempSongObjArr
                const tempSongObjArr = res.data.items;
                // grabs cursors object containg .after and .before unix timecode strings from response and assings to tempCursorsObj
                const tempCursorsObj = res.data.cursors;
                // create response object 
                const resObj = {
                    response: iteration,
                    before: tempCursorsObj.before,
                    after: tempCursorsObj.after,
                    songObjectsArray: tempSongObjArr
                };
                dispatch({type: FETCH_SUCCESS, payload: resObj})
            })
            .catch (err => {
                dispatch({type: FETCH_ERROR, payload: err})
            });
    };
};