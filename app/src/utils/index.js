import axios from 'axios';

// redirect helper function

export const spotifyRedirect = () => {
    // authorizationURL constants
  
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const clientId = 'd84e971aa0a841d3a990820b1676fcd1';
    const redirectUri = 'http://localhost:3000/';
    const scopes = [
        "playlist-read-private",
        "user-top-read",
        "user-read-recently-played",
        "playlist-modify-private",
        "playlist-modify-public",
    ];
    const authURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

    // redirect

    return window.location.replace(authURL);

}
// hash helper function, returns access token

export const currentHash = () => {
    const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
            if (item) {
                let parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
            }, {});
    return hash.access_token;
  };

// axiosGetter function

export function axiosGetter(h, iteration){
    // calls axios method get passing spotify recently-played endpoint url and header object 
      return axios
        .get('https://api.spotify.com/v1/me/player/recently-played', {headers: h })
          // on response received 
        .then((res) => {
          // grabs an array of song objects from response and assigns to tempSongObjArr
          const tempSongObjArr = res.data.items;
          // grabs cursors object containg .after and .before unix timecode strings from response and assings to tempCursorsObj
          const tempCursorsObj = res.data.cursors;
          // create response object 
          const resObj = {
              response: iteration,
              before: tempCursorsObj.before,
              after: tempCursorsObj.after,
              songObjectsArray: tempSongObjArr,
          };
          // coppies existing array of response objects and adds current iteration to the array
          return resObj;
  
        })
          // on error received
        .catch((err) => {
          return console.log(err.message);
        })
        .finally(() => {
          return;
        })
  }

  export const createHeader = (token) => {
      return {Authorization: `Bearer ${token}`};
  };