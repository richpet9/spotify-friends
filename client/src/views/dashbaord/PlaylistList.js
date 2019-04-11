import React from 'react';

function PlaylistList(props) {
  //TODO: Implement a filter for these playlists. We don't need to
  //show every playlist the user has. I.E. filter out really old ones.

  const handleSelect = e => {
    e.target.classList.toggle('select');
  };

  return (
    <ul id="playlist-container">
      {props.playlistData.map(playlist => {
        return (
          <li key={playlist.id} className="playlist-item" onClick={handleSelect.bind(this)}>
            {playlist.name}
          </li>
        );
      })}
    </ul>
  );
}

export default PlaylistList;
