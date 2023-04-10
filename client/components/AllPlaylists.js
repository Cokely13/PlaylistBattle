import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchPlaylists} from '../store/allPlaylistsStore';
import PlaylistComparison from './PlaylistComparison';

function AllPlaylists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [vote1, setVote1] = useState();
  const [vote2, setVote2] = useState();
  const [voting, setVoting] = useState();
  const [unlockVoting, setUnlockVoting] = useState();
  const [reload, setReload] = useState("1");
  const [createdBy, setCreatedBy] = useState();
  const playlists = useSelector((state) => state.allPlaylists )

  useEffect(() => {
    dispatch(fetchPlaylists())
  }, [])

  const addToVote1 = (playlist) => {
    setVote1(playlist)
  }

  const addToVote2 = (playlist) => {
    setVote2(playlist)
    setUnlockVoting(1)
  }

  const handleVote = (event) => {
    setVoting(1)
  }

  return (
    <div className="playlists-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> {/* Add a container for the component */}
      {voting !== 1 ?
      <div className="playlists-wrapper" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}> {/* Add a wrapper for the playlists */}
        <div className="playlists-header">Playlists</div>
        {playlists ? playlists.map((playlist) => {
          return (
            <div key={playlist.id} className="playlist-item">
              <Link to={`/playlists/${playlist.id}`} className="playlist-name">{playlist.name}</Link>
              <div className="playlist-stats">
                <span>Wins: {playlist.wins}  </span>
                <span>Losses: {playlist.losses}  </span>
                <div># of Songs: {playlist.playlistSongs.length} </div>
              </div>
              {vote1 !== playlist ? <button onClick={() => addToVote1(playlist)} className="add-to-vote-button">Add to Vote1</button> : <div></div>}
              {(vote1 && !vote2) || vote1 == playlist ? <button onClick={() => addToVote2(playlist)} className="add-to-vote-button">Add to Vote2</button>: <div></div>}
            </div>
          )
        }) : <div>NAN</div>}
        {vote1 && vote2 ?
        <div className="voting-details" style={{marginTop: '2rem'}}>
          Playlist 1: {vote1.name} vs Playlist2: {vote2.name}
          <button onClick={handleVote} className="lets-vote-button" style={{marginLeft: '1rem'}}>LET'S VOTE</button>
        </div> : <div></div>}
      </div> : <div></div>}
      {voting == 1 ? <div style={{marginTop: '2rem'}}>
        <PlaylistComparison playlist1={vote1} playlist2={vote2} />
      </div>: <div></div>}
    </div>
  )
}

export default AllPlaylists;
