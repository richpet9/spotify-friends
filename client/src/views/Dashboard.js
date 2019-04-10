import React from 'react';

function Dashboard(props) {
  const { userData, otherUserData } = props;
  return (
    <div style={{ display: 'flex', width: '60%', margin: '0 auto' }}>
      <div style={{ width: '50%', textAlign: 'left' }}>
        <h1>{userData.display_name}</h1>
        <ul>
          {userData.playlists.map(info => {
            return <li key={info.id}>{info.name}</li>;
          })}
        </ul>
      </div>
      <div style={{ width: '50%', textAlign: 'left' }}>
        <h1>{otherUserData.display_name}</h1>
        <ul>
          {otherUserData.playlists.map(info => {
            return <li key={info.id}>{info.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
