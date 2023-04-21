import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylist } from '../store/singlePlaylistStore';
import { fetchSongs } from '../store/allSongsStore';
import { deletePlaylist} from '../store/allPlaylistsStore'
import { createPsong, deletePsong } from '../store/allPsongsStore';
import Pagination from './Pagination'

function PlayListDetails() {
  const { playlistId } = useParams();
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const singlePlaylist = useSelector((state) => state.singlePlaylist);
  const allSongs = useSelector((state) => state.allSongs);
  const currentUser = useSelector((state) => state.auth);
  const [addSongsVisible, setAddSongsVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const history = useHistory();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    dispatch(fetchPlaylist(playlistId));
  }, [dispatch, playlistId, selectedSong]); // Refetch playlist when selectedSong changes

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch, selectedSong]); // Refetch songs when selectedSong changes

  const { id, name, user, wins, losses, playlistSongs } = singlePlaylist;

  const toggleAddSongs = () => {
    setAddSongsVisible(!addSongsVisible);
  };



  const handleSelectSong = (song) => {
    if (playlistSongs.length >= 10) {
      alert('Maximum songs reached. Please remove a song to add a new one.');
    } else {
      const newSong = {
        playlistId: id,
        songId: song.id,
      };
      dispatch(createPsong(newSong));
      setSelectedSong(song); // Update selectedSong state
    }
  };

  const handleRemoveSong = (song) => {
    dispatch(deletePsong(song.id));
    setSelectedSong(song);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeletePlaylist = () => {
    const confirmDelete = window.confirm('Delete Playlist?');
    if (confirmDelete) {
      dispatch(deletePlaylist(playlistId))
      // Dispatch delete action and redirect to home page
      // You may want to change this to redirect to another page depending on your app
      history.push('/playlists');
    }
  };

  const renderAddSongs = () => {
    const songsToAdd = allSongs.filter(
      (song) => !playlistSongs.some((ps) => ps.Song.id === song.id)
    );
    const filteredSongs = songsToAdd.filter(
      (song) =>
        song.name.toLowerCase().includes(searchText.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalSongs = filteredSongs.length;
    const pageCount = Math.ceil(totalSongs / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedSongs = filteredSongs.slice(startIndex, endIndex);

    return (
      <div className="playlist-add-songs-container">
        <h3 className="playlist-add-songs-title">Add Songs:</h3>
        <input
          className="playlist-add-search"
          type="text"
          placeholder="Search songs..."
          value={searchText}
          onChange={handleSearchChange}
        />

        {filteredSongs.length === 0 && <div>No Results</div>}
        {filteredSongs.length > 0 && (
          <div>
            <ul className="playlist-add-songs-list">
              {paginatedSongs.map((song) => (
                <li key={song.id}>
                  <div className="playlist-song-info">
                    <span className="playlist-song-name">{song.name}</span> by
                    <span className="playlist-song-artist">{song.artist}</span>
                    <button
                      className="playlist-song-add"
                      onClick={() => handleSelectSong(song)}
                    >
                      Add to Playlist
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
  }

    return (
      <div className="playlist-details-container">
        <h1 className="playlist-details-title">{name}</h1>
        <h2 className="playlist-details-created-by">
          Created by: {user ? user.username : "No User"}
        </h2>
        <div className="playlist-details-stats">
          <h2 className="playlist-details-wins">Wins: {wins}</h2>
          <h2 className="playlist-details-losses">Losses: {losses}</h2>
        </div>
        <div className="playlist-details-buttons">
          {currentUser.id === user?.id && (
            <button
              className="playlist-details-add-button"
              onClick={toggleAddSongs}
            >
              {addSongsVisible ? "Done" : "Edit Playlist"}
            </button>
          )}
        </div>
        <ol className="playlist-details-song-list">
          {playlistSongs ? (
            playlistSongs.map((playlistSong) => (
              <li
                key={playlistSong.id}
                className="playlist-details-song-item"
              >
                <div className="playlist-details-song-name">
                  {playlistSong.Song.name}
                </div>
                <div className="playlist-details-song-artist">
                  by {playlistSong.Song.artist}
                </div>
                {addSongsVisible && (
                  <button
                    className="playlist-details-remove-button"
                    onClick={() => handleRemoveSong(playlistSong)}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))
          ) : (
            <div></div>
          )}
        </ol>
        {currentUser.id === user?.id && (
  <button
    className="playlist-details-delete-button"
    onClick={handleDeletePlaylist}
    style={{ display: addSongsVisible ? "none" : "block", margin: "0 auto", backgroundColor: "red", border: "black" }}
  >
    Delete Playlist
  </button>
)}
        {addSongsVisible && (
          <div className="playlist-details-add-songs-container">
            {playlistSongs.length >= 10 && (
              <button className="playlist-details-done-button" onClick={toggleAddSongs}>
                {addSongsVisible ? "Maximum Songs Playlist Done" : "Add Songs"}
              </button>
            )}
            {playlistSongs.length < 10 && (
              <div className="playlist-details-additional-songs">
                Add Additional Songs
              </div>
            )}
            {playlistSongs.length < 10 && (
              <div className="playlist-details-additional-song-list">
                {renderAddSongs()}
              </div>
            )}
          </div>
        )}
      </div>
    );

}

export default PlayListDetails;
