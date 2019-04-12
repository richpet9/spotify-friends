import React, { useState } from 'react';
import Button from '../../common/Button';

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
      <p>First, please enter their Spotify username</p>
      <input type="text" autoFocus onChange={handleUsernameChange.bind(this)} name="spotify-username" />
      <br />
      <Button small value="Logout" onClick={handleLogout} />
      <Button small value="Continue" onClick={handleContinue} />
    </div>
  );
}

export default SelectUser;
