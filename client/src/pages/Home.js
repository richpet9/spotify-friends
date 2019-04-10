import React, { useState } from 'react';
import LoggedIn from '../views/LoggedIn';
import Login from '../views/Login';
import SpotifyWebApi from 'spotify-web-api-js';
import './Home.css';

function Home(props) {
  const [loggedIn, setLoggedIn] = useState(false); //Logged in state
  const [username, setUsername] = useState(null); //Username state / temp
  const [userData, setUserData] = useState(null); //Data of other user state / temp
  const [otherUsername, setOtherUsername] = useState(null); //otherUsername state / temp
  const [otherUserData, setOtherUserData] = useState(null); //Data of other user state / temp

  //Spotify API
  const spotify = new SpotifyWebApi();

  const refreshToken = localStorage.getItem('refresh_token'); //Refresh token on localstorage

  if (!userData) {
    if (props.access) {
      //We were given an access token
      spotify.setAccessToken(props.access);
      spotify.getMe().then(
        data => {
          //We are logged in
          let me = data;
          spotify.getUserPlaylists(data.id).then(data => {
            me.playlists = data.items;
            setUserData(me);
          });
        },
        err => {
          //The access token is wrong or expired
          if (refreshToken) {
            window.location = '/refresh-token?token=' + refreshToken;
          } else {
            //There is no refresh token, somehow an invalid access token param was in url
            setUserData(null);
          }
        }
      );
    } else if (refreshToken) {
      //If not logged in, but we have a refresh token
      window.location = '/refresh-token?token=' + refreshToken;
    }
  }

  const handleUsernameChange = el => {
    setOtherUsername(el.target.value);
  };

  const handleContinue = () => {
    //Create the data object for otherUser
    let otherUser = {};
    spotify.getUser(otherUsername).then(data => {
      otherUser = data;
      spotify.getUserPlaylists(otherUsername).then(data => {
        otherUser.playlists = data.items;
        setOtherUserData(otherUser);
      });
    });
  };

  return (
    <div className="container">
      <h1>Spotify Friends</h1>
      {!userData && <Login />}
      {userData && <LoggedIn userData={userData} otherUserData={otherUserData} handleUsernameChange={handleUsernameChange} handleContinue={handleContinue} />}
    </div>
  );
}

export default Home;
