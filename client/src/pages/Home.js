import React, { useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Login from '../views/Login';
import Dashboard from '../views/dashbaord/Dashboard';

function Home(props) {
  const [userData, setUserData] = useState(null); //Data of other user state
  const [otherUserData, setOtherUserData] = useState(null); //Data of other user state

  //Spotify API
  const spotify = new SpotifyWebApi();

  const refreshToken = localStorage.getItem('refresh_token'); //Refresh token from localstorage

  //If we don't have any userdata, i.e. they are not logged in
  if (!userData) {
    //We are not logged in, and there is an access token param
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
      //We are not logged in, but we have a refresh token
      window.location = '/refresh-token?token=' + refreshToken;
    }
  }

  const getUserData = name => {
    //Create the data object for otherUser
    let otherUser = {};
    spotify.getUser(name).then(data => {
      otherUser = data;
      spotify.getUserPlaylists(name).then(data => {
        otherUser.playlists = data.items;
        setOtherUserData(otherUser);
      });
    });
  };

  const restart = () => {
    setOtherUserData(null);
  };

  //DEBUG: For testing dashboard quickly
  // if (userData) {
  //   getUserData('cjyopp98');
  // }
  //////////////////////////////

  return (
    <div className="container">
      <h1 id="wordmark">Spotifriends</h1>
      {!userData && <Login />}
      {userData && <Dashboard userData={userData} otherUserData={otherUserData} getUserData={getUserData} restart={restart} />}
    </div>
  );
}

export default Home;
