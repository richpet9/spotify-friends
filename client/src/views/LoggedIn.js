import React from 'react';
import Dashboard from './Dashboard';

function LoggedIn(props) {
  const { userData, otherUserData } = props;

  const handleLogout = () => {
    localStorage.removeItem('refresh_token');
    window.location = '/';
  };

  return (
    <main>
      <h3>Welcome to Spotify Friends, {userData.display_name}!</h3>
      <input type="button" value="logout" onClick={handleLogout} />
      {!otherUserData && (
        <div>
          <p>Please enter the spotify ID of a friend:</p>
          <input type="text" placeholder={userData.display_name} onChange={props.handleUsernameChange.bind(this)} />{' '}
          <input type="button" value="continue" onClick={props.handleContinue} />
        </div>
      )}
      {otherUserData && <Dashboard userData={userData} otherUserData={otherUserData} />}
    </main>
  );
}

export default LoggedIn;
