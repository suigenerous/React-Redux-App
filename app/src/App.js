import React, { useEffect } from 'react';
import { checkForToken } from './utils'
import { connect } from "react-redux";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardDeck
} from 'reactstrap';
import { spotifyRedirectAction, spotifyFetchTokenAction, spotifyFetchDataAction } from './actions'
import styled from 'styled-components';

const redirectHandler = (event, redirect) => {
  event.preventDefault();
  redirect();
};

function NotAuthorized(props) {
  return(
    <button onClick = {(e) => {redirectHandler(e, props.redirect)}}>Click to Authorize Spotify</button>
  );
};

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  align-items: center;
  align-content: center;
`

function Authorized(props){
  const songsArray = props.spotifyData;
  console.log(songsArray);
  return(
    <CenteredDiv>
      <h1>Recently Played Songs:</h1>
      {songsArray.map((song) => {
        return <SongCard
                title = {song.track.album.name}
                artist = {song.track.album.artists[0].name}
                image = {song.track.album.images[0].url}
                popularity = {song.track.album.popularity}
                songUrl = {song.track.album.external_urls.spotify}
              />
      })}
    </CenteredDiv>
  );
}

function SongCard(props){
  return(
    <div>
      <CenteredDiv>
        <img width = "40%" src={props.image} alt={props.title} />
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardSubtitle>{props.artist}</CardSubtitle>
          <CardText>Popularity Index: {props.popularity}</CardText>
          <Button href = {props.songUrl}>Play song on Spotify</Button>
        </CardBody>
      </CenteredDiv>
    </div>
  )
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

