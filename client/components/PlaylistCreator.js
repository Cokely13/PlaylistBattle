import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function PlaylistCreator() {
  const allSongs = useSelector((state) => state.allSongs );
  const [playlistName, setPlaylistName] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleAddSong = (song) => {
    setSelectedSongs([...selectedSongs, song]);
  };

  const handleRemoveSong = (song) => {
    setSelectedSongs(selectedSongs.filter((selectedSong) => selectedSong.id !== song.id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Create the playlist using the playlistName and selectedSongs
  };

  const alphabeticallySortByField = (field) => {
    return [...allSongs].sort((a, b) => {
      const fieldA = a[field].toLowerCase();
      const fieldB = b[field].toLowerCase();
      if (fieldA < fieldB) {
        return -1;
      }
      if (fieldA > fieldB) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <div>
      <h1>Create a Playlist</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Playlist Name:
          <input type="text" value={playlistName} onChange={handleNameChange} />
        </label>
        <h2>Add Songs</h2>
        <div>
          <button onClick={() => setSelectedSongs([])}>Clear Selection</button>
          <button type="submit">Create Playlist</button>
        </div>
        <div>
          <button onClick={() => setSelectedSongs(alphabeticallySortByField('name'))}>Sort by Name</button>
          <button onClick={() => setSelectedSongs(alphabeticallySortByField('artist'))}>Sort by Artist</button>
        </div>
        <ul>
          {allSongs.map((song) => (
            <li key={song.id}>
              {song.name} - {song.artist}
              {selectedSongs.some((selectedSong) => selectedSong.id === song.id) ? (
                <button onClick={() => handleRemoveSong(song)}>Remove</button>
              ) : (
                <button onClick={() => handleAddSong(song)}>Add</button>
              )}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default PlaylistCreator;
