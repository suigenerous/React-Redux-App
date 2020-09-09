import React from 'react';
import './App.css';

import { spotifyRedirect } from './utils'

import { connect } from "react-redux";

import { spotifyFetch } from './actions'

const redirectHandler = (event) => {
  event.preventDefault();
  return spotifyRedirect();
}

function NotAuthorized() {
  return(
    <button onClick = {redirectHandler}>Click to Authorize Spotify</button>
  );
}

function Authorized(props){
  console.log(props.spotifyData);
  return(
    <div>Spotify Data will go here</div>
  );
}

function App(props) {
  debugger;
  return (
    <div className="App">
      {props.authorized ? <Authorized/> : <NotAuthorized/>}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    authorized: state.authorized,
    spotifyData: state.spotifyData,
    fetchingData: state.fetchingData,
    errors: state.errors
  };
};

export default connect(mapStateToProps, {spotifyFetch})(App);

