import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { Link } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch();
  const userId =  useSelector(state => state.auth);
  const [sortBy, setSortBy] = useState("");
  const user = useSelector(state => state.singleUser);
  const [showplaylists, setShowPlaylists] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(null);


  useEffect(() => {
    dispatch(fetchSingleUser(userId.id));
  }, [dispatch, userId]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order !== '' ? order : null);
  };

  const handleShowPlaylist = (e) => {
    setShowPlaylists(1)
  };

  const handleHidePlaylist = (e) => {
    setShowPlaylists()
  };

  const getTotalWins = () => {
    if (user && user.playlists) {
      return user.playlists.reduce((acc, playlist) => acc + playlist.wins, 0);
    }
    return 0;
  };

  const getTotalLosses = () => {
    if (user && user.playlists) {
      return user.playlists.reduce((acc, playlist) => acc + playlist.losses, 0);
    }
    return 0;
  };

  const sortedPlaylists = user && user.playlists ?
    user.playlists.slice().sort((a, b) => {
      if (!sortOrder) {
        return 0;
      }
      if (sortOrder === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortOrder === 'wins') {
        return b.wins - a.wins;
      }
      if (sortOrder === 'losses') {
        return b.losses - a.losses;
      }
    })
    : [];

  const filteredPlaylists = sortedPlaylists.filter(playlist => {
    return playlist.name.toLowerCase().includes(searchQuery);
  });

  console.log('email', user)

  return (
    <div className="playlists-container">
      <div className="playlists-header">
      {user ?
        <div className="user-details">
          <img  src={user.imageUrl}/>
          <h1 className="user-name"><u>{user.username}</u></h1>
          <h1 className="user-email">{user.email}</h1>
          {user.admin? <h1>ADMIN</h1> : <div></div>}
          </div >: <div></div>}
          {showplaylists !== 1 ? <button onClick={handleShowPlaylist}>Show Playlists</button> : <button onClick={handleHidePlaylist}>Hide Playlists</button> }
         {showplaylists == 1 ? <div>
                <div className="user-stats">
            <p><strong>Total Wins:</strong> {getTotalWins()}</p>
            <p><strong>Total Losses:</strong> {getTotalLosses()}</p>
          </div>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search playlists by name"
          />
          <select value={sortOrder} onChange={handleSort}>
            <option value="">Sort by...</option>
            <option value="name">Name</option>
            <option value="wins">Wins</option>
            <option value="losses">Losses</option>
          </select>
        </div>
      <table className="playlists-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlaylists.map((playlist) => (
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
            </tr>
          ))}
        </tbody>
      </table>
      </div> : <div></div>}
    </div>
    </div>
  );


}
export default Profile;