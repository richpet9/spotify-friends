import React, { useState } from 'react';
import SelectUser from './SelectUser';
import PlaylistList from './PlaylistList';
import GenreList from './GenreList';

function Dashboard(props) {
  const [selectedPlaylists, setPlaylists] = useState(null);
  const [selectedGenres, setGenres] = useState(null);

  const { otherUserData } = props;

  const handleGoBack = () => {
    if (!selectedPlaylists) {
      //If we dont have playlists yet, restart to Home
      props.restart();
    } else if (!selectedGenres) {
      //If we don't have genres yet, go back to playlists
      setPlaylists(null);
    } else {
      //If we have genres, go back to genres
      setGenres(null);
    }
  };

  const handleContinue = data => {
    if (!otherUserData) {
      //If we dont have other user data yet, continue by setting that data
      props.getUserData(data);
    } else if (!selectedPlaylists) {
      //If we dont have playlists selected, continue by setting that
      setPlaylists(data);
    } else if (!selectedGenres) {
      //If we dont have genres set, continue by setting that.
      setGenres(data);
    }
  };

  return (
    <div id="dashboard-container">
      {!otherUserData && !selectedPlaylists && !selectedGenres && <SelectUser continue={handleContinue} />}
      {otherUserData && !selectedPlaylists && <PlaylistList continue={handleContinue} goBack={handleGoBack} playlistData={otherUserData.playlists} />}
      {selectedPlaylists && !selectedGenres && <GenreList continue={handleContinue} goBack={handleGoBack} />}
    </div>
  );
}

export default Dashboard;
