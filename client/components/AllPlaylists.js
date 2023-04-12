import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchPlaylists } from '../store/allPlaylistsStore';
import PlaylistComparison from './PlaylistComparison';
import Modal from 'react-modal';

Modal.setAppElement('#app');

function AllPlaylists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [vote1, setVote1] = useState();
  const [vote2, setVote2] = useState();
  const [voting, setVoting] = useState(false);
  const [unlockVoting, setUnlockVoting] = useState();
  const [reload, setReload] = useState("1");
  const [createdBy, setCreatedBy] = useState();
  const playlists = useSelector((state) => state.allPlaylists );

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);

  const addToVote1 = (playlist) => {
    setVote1(playlist);
  };

  const addToVote2 = (playlist) => {
    setVote2(playlist);
    setUnlockVoting(1);
  };

  const handleVote = (event) => {
    setVoting(true);
    setUnlockVoting(0);
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '800px',
      maxHeight: '600px',
      border: 'none',
      borderRadius: '20px',
      padding: '0px'
    }
  };

  return (
    <div className="playlists-container">
      {!voting && (
        <table className="playlists-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Wins</th>
              <th>Losses</th>
              <th># of Songs</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {playlists &&
              playlists.map((playlist) => {
                return (
                  <tr key={playlist.id} className="playlist-row">
                    <td>
                      <Link
                        to={`/playlists/${playlist.id}`}
                        className="playlist-name"
                      >
                        {playlist.name}
                      </Link>
                    </td>
                    <td>{playlist.wins}</td>
                    <td>{playlist.losses}</td>
                    <td>{playlist.playlistSongs.length}</td>
                    <td className="playlist-buttons">
                      {vote1 !== playlist ? (
                        <button
                          onClick={() => addToVote1(playlist)}
                          className="add-to-vote-button"
                        >
                          Add to Vote1
                        </button>
                      ) : null}

                      {vote1 && (!vote2 || vote1 === playlist) ? (
                        <button
                          onClick={() => addToVote2(playlist)}
                          className="add-to-vote-button"
                        >
                          Add to Vote2
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      {vote1 && vote2 && !voting ? (
      <Modal
      isOpen={true}
      onRequestClose={() => setUnlockVoting(0)}
      style={{
        content: {
          width: "50vw",
          height: "50vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }
      }}
    >
      <div className="voting-details">
        <h2>Vote for the best playlist!</h2>
        <p>Playlist 1: {vote1.name}</p>
        <p>Playlist 2: {vote2.name}</p>
        <button
          onClick={() => {
            setVoting(true);
          }}
          className="lets-vote-button"
        >
          Let's Vote
        </button>
      </div>
    </Modal>
      ) : null}
      {voting ? (
        <div className="playlist-comparison">
          <PlaylistComparison playlist1={vote1} playlist2={vote2} />
        </div>
      ) : null}
    </div>
  );

      }

export default AllPlaylists
