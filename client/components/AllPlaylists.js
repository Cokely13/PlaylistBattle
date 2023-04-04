import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylists } from '../store/allPlaylistsStore';
import { editPlaylist } from '../store/singlePlaylistStore';

function AllPlayLists() {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.allPlaylists);
  const userId = useSelector((state) => state.auth.id);
  const [showSongs, setShowSongs] = useState([]);

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);

  const handlePlaylistClick = (playlistId) => {
    if (showSongs.includes(playlistId)) {
      setShowSongs(showSongs.filter((id) => id !== playlistId));
    } else {
      setShowSongs([...showSongs, playlistId]);
    }
  };

  const handleEditClick = (playlist) => {
    dispatch(editPlaylist(playlist));
  };

  return (
    <div>
      <h1>All Playlists:</h1>
      <ul>
        {playlists.sort((a, b) => a.name.localeCompare(b.name)).map((playlist) => (
          <li key={playlist.id}>
            <div
              onClick={() => handlePlaylistClick(playlist.id)}
              style={{ display: 'inline-block', cursor: 'pointer' }}
            >
              {playlist.name}
            </div>
            {userId === playlist.userId && (
              <button onClick={() => handleEditClick(playlist)}>Edit</button>
            )}
            {showSongs.includes(playlist.id) && (
              <ul>
                {playlist.playlistSongs.map((playlistSong) => (
                  <li key={playlistSong.id}>
                    {playlistSong.Song.name} - {playlistSong.Song.artist}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllPlayLists;

