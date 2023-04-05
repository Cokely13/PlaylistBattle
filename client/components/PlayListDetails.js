import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylist } from '../store/singlePlaylistStore';
import { fetchSongs } from '../store/allSongsStore';
import {createPsong, deletePsong} from '../store/allPsongsStore'

function PlayListDetails() {
  const { playlistId } = useParams();
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const singlePlaylist = useSelector((state) => state.singlePlaylist);
  const allSongs = useSelector((state) => state.allSongs);
  const currentUser = useSelector((state) => state.auth);
  const [addSongsVisible, setAddSongsVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    dispatch(fetchPlaylist(playlistId));
  }, [dispatch, playlistId, selectedSong]); // Refetch playlist when selectedSong changes

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch, selectedSong]); // Refetch songs when selectedSong changes

  const { id, name, user, wins, losses, playlistSongs } = singlePlaylist;

  const handleEditPlaylist = () => {
    console.log('Edit playlist');
  };

  const toggleAddSongs = () => {
    setAddSongsVisible(!addSongsVisible);
  };

  const handleSelectSong = (song) => {
    const newSong = {
      playlistId: id,
      songId: song.id
    }
    dispatch(createPsong(newSong));
    setSelectedSong(song); // Update selectedSong state
  };

  const handleRemoveSong = (song) => {
    dispatch(deletePsong(song.id));
    setSelectedSong(song);
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  const renderAddSongs = () => {
    const songsToAdd = allSongs.filter(song => !playlistSongs.some(ps => ps.Song.id === song.id));
    const filteredSongs = songsToAdd.filter((song) =>
      song.name.toLowerCase().includes(searchText.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
      <div>
        <h3>Add Songs:</h3>
        <input type="text" placeholder="Search songs..." value={searchText} onChange={handleSearchChange} />
        {filteredSongs.length === 0 && <div>No Results</div>}
        {filteredSongs.length > 0 &&
          <ul>
            {filteredSongs.map((song) => (
              <li key={song.id}>
                {song.name} - {song.artist}{' '}
                <button onClick={() => handleSelectSong(song)}>Add</button>
              </li>
            ))}
          </ul>
        }
      </div>
    );
  };

  return (
    <div>
      <h2>{name}</h2>
      <div>Created by: {user ? user.username : 'No User'}</div>
      <div>
        {currentUser.id === user?.id && (
          <div>
            <button onClick={handleEditPlaylist}>Edit Playlist</button>
            <button onClick={toggleAddSongs}>
              {addSongsVisible ? 'Hide Add Songs' : 'Add Songs'}
            </button>
          </div>
        )}
      </div>
      <div>
        Wins: {wins} Losses: {losses}
      </div>
      <ol>
        {playlistSongs
          ? playlistSongs.map((playlistSong) => (
              <li key={playlistSong.id}>
                {playlistSong.Song.name} - {playlistSong.Song.artist}
                {addSongsVisible && (
                  <button onClick={() => handleRemoveSong(playlistSong)}>Remove</button>
                )}
              </li>
            ))
          : <div></div>}
      </ol>
      {addSongsVisible && renderAddSongs()}
    </div>
  );
}

export default PlayListDetails;
