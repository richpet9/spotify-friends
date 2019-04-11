import React from 'react';
import Button from '../common/Button';

function Login(props) {
  return (
    <div id="login-container">
      <Button link="/login" iconLink="/img/icon.png" value="log in" />
    </div>
  );
}

export default Login;
