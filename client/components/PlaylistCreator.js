import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPlaylist, fetchPlaylists } from '../store/allPlaylistsStore';
import { Redirect } from 'react-router-dom'; // Import Redirect from react-router-dom

function PlaylistCreator() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const allPlaylists = useSelector((state) => state.allPlaylists);
  const playlists = useSelector((state) => state.allPlaylists )

  const [playlistName, setPlaylistName] = useState('');
  const [playlistCreated, setPlaylistCreated] = useState(false);

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlaylist = {
      name: playlistName,
      userId: id,
    };
    dispatch(createPlaylist(newPlaylist));
    dispatch(fetchPlaylists());
    setPlaylistCreated(true);
  };

  if (playlistCreated) {
    const currentPlaylist = allPlaylists.filter((playlist) => playlist.name == playlistName)
    if(currentPlaylist.length) {
    return <Redirect to={`/playlists/${currentPlaylist[0].id}`} />;}
  }

  return (
    <div>
      <h1>Create a Playlist</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Playlist Name:
          <input type="text" value={playlistName} onChange={handleNameChange} />
        </label>
        <div>
          <button type="submit">Create Playlist</button>
        </div>
      </form>
    </div>
  );
}

export default PlaylistCreator;
