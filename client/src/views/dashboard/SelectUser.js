import React, { useState } from 'react';
import Button from '../../common/Button';
import Tooltip from '../../common/Tooltip';

function SelectUser(props) {
  const [otherUsername, setOtherUsername] = useState(null);

  const handleUsernameChange = el => {
    setOtherUsername(el.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('refresh_token');
    window.location = '/';
  };

  const handleContinue = () => {
    if (otherUsername === null) {
      //Show error
    } else {
      props.continue(otherUsername);
    }
  };

  return (
    <div>
      <p>
        Please enter the Spotify{' '}
        <Tooltip tip="To find the User ID of a Facebook sign up, copy the profile URI, which contains the ID. The user ID will be a string of numbers (and maybe letters).">
          user ID
        </Tooltip>{' '}
        of a friend
      </p>
      <input type="text" autoFocus onChange={handleUsernameChange.bind(this)} name="spotify-username" />
      <br />
      <Button small value="Logout" onClick={handleLogout} />
      <Button small value="Continue" onClick={handleContinue} />
    </div>
  );
}

export default SelectUser;
