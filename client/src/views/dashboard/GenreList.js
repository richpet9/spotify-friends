import React from 'react';
import Button from '../../common/Button';

function GenreList(props) {
  const allGenres = ['Pop', 'Hip Hop', 'R&B', 'Indie', 'Trap', 'Country', 'Electronic', 'Jazz'];

  const handleContinue = () => {
    props.continue();
  };

  return (
    <div id="genre-container">
      <p>Select Genres</p>
      <ul>
        {allGenres.map(genre => {
          return <li key={genre}>{genre}</li>;
        })}
      </ul>
      <Button small value="Go back" onClick={props.goBack} />
      <Button small value="Continue" onClick={handleContinue} />
    </div>
  );
}

export default GenreList;
