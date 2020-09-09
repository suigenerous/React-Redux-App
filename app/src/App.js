import React, { useEffect } from 'react';
import './App.css';
import { checkForToken } from './utils'
import { connect } from "react-redux";

import { spotifyRedirectAction, spotifyFetchTokenAction, spotifyFetchDataAction } from './actions'

const redirectHandler = (event, redirect) => {
  event.preventDefault();
  redirect();
};

function NotAuthorized(props) {
  return(
    <button onClick = {(e) => {redirectHandler(e, props.redirect)}}>Click to Authorize Spotify</button>
  );
};

function Authorized(props){
  const songsArray = props.spotifyData;
  return(
    <div>
      {songsArray.map((song) => {
        return <p>{song.track.album.name}</p>
      })}
    </div>
  );
}

function App(props) {

  // checks to see if token exists in url and grabs token if it does, if not, it will continue as normal
  if (checkForToken()){
    props.spotifyFetchTokenAction();
  }

  // check to see if token has been fetched from fetchedToken state value
  // console.log('token fetched?: ' + props.tokenFetched);

  useEffect(() => {
    if (props.tokenFetched === true) {
      props.spotifyFetchDataAction(props.token);
    };
  },[props.tokenFetched])
  
  

  console.log(props);

  // return jsx

  return (
    <div className="App">
      {props.authorized ? <Authorized spotifyData = {props.spotifyData}/> : <NotAuthorized redirect = {props.spotifyRedirectAction}/>}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    authorized: state.authorized,
    tokenFetched: state.tokenFetched,
    authorizing: state.authorizing,
    fetchingToken: state.fetchingToken,
    redirected: state.redirected,
    token: state.token,
    spotifyData: state.spotifyData,
    fetchingData: state.fetchingData,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, {spotifyRedirectAction, spotifyFetchTokenAction, spotifyFetchDataAction})(App);

