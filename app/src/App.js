import React from 'react';
import './App.css';

import { connect } from "react-redux";

import { spotifyRedirectAction, spotifyFetchTokenAction } from './actions'

const redirectHandler = (event, redirect) => {
  event.preventDefault();
  redirect();
  debugger;

};

function NotAuthorized(props) {
  return(
    <button onClick = {(e) => {redirectHandler(e, props.redirect)}}>Click to Authorize Spotify</button>
  );
};

function Authorized(props){
  console.log(props.spotifyData);
  return(
    <div>Spotify Data will go here</div>
  );
}

function App(props) {
  console.log(props);
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

export default connect(mapStateToProps, {spotifyRedirectAction, spotifyFetchTokenAction})(App);

