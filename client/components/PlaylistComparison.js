
  import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateSinglePlaylist } from '../store/singlePlaylistStore';

function PlaylistComparison({ playlist1, playlist2 }) {
  const dispatch = useDispatch();
  const [songs1, setSongs1] = useState(playlist1.playlistSongs);
  const [songs2, setSongs2] = useState(playlist2.playlistSongs);
  const [votes1, setVotes1] = useState(0);
  const [votes2, setVotes2] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  const handleVote1 = () => {
    setVotes1(votes1 + 1);
    setSongs1(songs1.slice(1));
    setSongs2(songs2.slice(1));
  };

  const handleVote2 = () => {
    setVotes2(votes2 + 1);
    setSongs1(songs1.slice(1));
    setSongs2(songs2.slice(1));
  };

  const getWinner = () => {
    if (votes1 > votes2) {
      playlist1.wins = playlist1.wins + 1;
      playlist2.losses = playlist2.losses + 1;
      dispatch(updateSinglePlaylist(playlist1));
      dispatch(updateSinglePlaylist(playlist2));
      return playlist1.name;
    } else if (votes2 > votes1) {
      playlist2.wins = playlist2.wins + 1;
      playlist1.losses = playlist1.losses + 1;
      dispatch(updateSinglePlaylist(playlist1));
      dispatch(updateSinglePlaylist(playlist2));
      return playlist2.name;
    } else {
      return 'It is a tie!';
    }
  };

  return (
    <div className="playlist-comparison-container">
      {showWinner ? (
        <div>
          <h2 className="playlist-comparison-winner">The winner is: {getWinner()}</h2>
          <Link to={'/top'}>Playlists</Link>
        </div>
      ) : (
        <div className="playlist-comparison-wrapper">
          <div className="playlist-comparison-item">
            <h2 className="playlist-comparison-name">{playlist1.name}</h2>
            <p className="playlist-comparison-votes">Votes: {votes1}</p>
            {songs1.length > 0 && (
              <div>
                <h3>{songs1[0].Song.name} by {songs1[0].Song.artist}</h3>
                <button className="playlist-comparison-button" onClick={handleVote1}>Vote</button>
              </div>
            )}
          </div>
          <div className="playlist-comparison-item">
            <h2 className="playlist-comparison-name">{playlist2.name}</h2>
            <p className="playlist-comparison-votes">Votes: {votes2}</p>
            {songs2.length > 0 && (
              <div>
                <h3>{songs2[0].Song.name} by {songs2[0].Song.artist}</h3>
                <button className="playlist-comparison-button" onClick={handleVote2}>Vote</button>
              </div>
            )}
          </div>
          {songs1.length === 0 && songs2.length === 0 && (
            <button className="playlist-comparison-button" onClick={() => setShowWinner(true)}>Show Winner</button>
          )}
        </div>
      )}
    </div>
  );
  }

  export default PlaylistComparison
