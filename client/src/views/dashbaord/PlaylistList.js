import React, { useState } from 'react';
import Button from '../../common/Button';

function PlaylistList(props) {
  //TODO: Implement a filter for these playlists. We don't need to
  //show every playlist the user has. I.E. filter out really old ones.
  let selected = [];

  const handleSelect = e => {
    const id = e.target.id;
    if (e.target.className.includes('select')) {
      //Deselect
      e.target.className = 'playlist-item';
      selected = selected.filter(playlist => playlist !== id);
    } else {
      //Select
      e.target.className = 'playlist-item select';
      selected.push(id);
    }
  };

  const handleContinue = () => {
    if (selected.length !== 0) {
      props.continue(selected);
    }
  };

  return (
    <div>
      <p>Select the playlists which seem interesting</p>
      <ul id="playlist-container">
        {props.playlistData.map(playlist => {
          return (
            <li key={playlist.id} className="playlist-item" id={playlist.id} onClick={handleSelect.bind(this)}>
              {playlist.name}
            </li>
          );
        })}
      </ul>
      <Button small value="Go back" onClick={props.goBack} />
      <Button small value="Continue" onClick={handleContinue} />
    </div>
  );
}

export default PlaylistList;
