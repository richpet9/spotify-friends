import React, { useState } from 'react';
import Button from '../../common/Button';
import PlaylistList from './PlaylistList';

function Dashboard(props) {
  const [otherUsername, setOtherUsername] = useState(null);
  const { userData, otherUserData } = props;

  const handleLogout = () => {
    localStorage.removeItem('refresh_token');
    window.location = '/';
  };

  const handleUsernameChange = el => {
    setOtherUsername(el.target.value);
  };

  const handleContinue = () => {
    if (otherUsername === null) {
      //Show error
    } else {
      props.getUserData(otherUsername);
    }
  };

  const handleGoBack = () => {
    if (true) {
      setOtherUsername(null);
      props.restart();
    }
  };

  return (
    <div id="dashboard-container">
      {!otherUserData && (
        <div>
          <p>First, please enter their Spotify username</p>
          <input type="text" autoFocus onChange={handleUsernameChange.bind(this)} name="spotify-username" />
          <br />
          <Button small value="Logout" onClick={handleLogout} />
          <Button small value="Continue" onClick={handleContinue} />
        </div>
      )}
      {otherUserData && (
        <div>
          <p>Select the playlists which seem interesting</p>

          <PlaylistList playlistData={otherUserData.playlists} />
          <Button small value="Go back" onClick={handleGoBack} />
          <Button small value="Continue" />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
