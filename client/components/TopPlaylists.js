
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { Link, useParams } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { fetchPlaylists} from '../store/allPlaylistsStore';

// function TopPlaylists() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [unlockVoting, setUnlockVoting] = useState();
//   const [reload, setReload] = useState("1");
//   const [createdBy, setCreatedBy] = useState();
//   const [sortOption, setSortOption] = useState("winPercentage"); // set default sort option
//   const [sortOrder, setSortOrder] = useState("desc"); // set default sort order
//   const playlists = useSelector((state) => state.allPlaylists );

//   useEffect(() => {
//     dispatch(fetchPlaylists());
//   }, []);

//   // Calculate win percentage for each playlist
//   const calculateWinPercentage = (wins, losses) => {
//     const totalGames = wins + losses;
//     return totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) + "%" : "N/A";
//   };

//   // Sort the playlists based on the selected option and order
//   const sortPlaylists = (playlists, option, order) => {
//     let sortedPlaylists = [...playlists];
//     sortedPlaylists.sort((a, b) => {
//       if (option === "name") {
//         return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
//       } else if (option === "wins") {
//         return order === "asc" ? a.wins - b.wins : b.wins - a.wins;
//       } else if (option === "losses") {
//         return order === "asc" ? a.losses - b.losses : b.losses - a.losses;
//       } else {
//         const aWinPercentage = a.wins / (a.wins + a.losses);
//         const bWinPercentage = b.wins / (b.wins + b.losses);
//         return order === "asc" ? aWinPercentage - bWinPercentage : bWinPercentage - aWinPercentage;
//       }
//     });
//     return sortedPlaylists;
//   };

//   // Handle sort option change
//   const handleSortOptionChange = (event) => {
//     setSortOption(event.target.value);
//   };

//   // Handle sort order change
//   const handleSortOrderChange = (event) => {
//     setSortOrder(event.target.value);
//   };

//   // Get the sorted playlists
//   const sortedPlaylists = sortPlaylists(playlists, sortOption, sortOrder);

//   return (
//     <div className="playlists-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//       <div className="playlists-wrapper" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
//         <div className="playlists-header">
//           Playlists
//           <div className="sort-options">
//             <span>Sort by:</span>
//             <select value={sortOption} onChange={handleSortOptionChange}>
//               <option value="winPercentage">Win Percentage</option>
//               <option value="wins">Wins</option>
//               <option value="losses">Losses</option>
//               <option value="name">Name</option>
//             </select>
//             <span>Order:</span>
//             <select value={sortOrder} onChange={handleSortOrderChange}>
//               <option value="desc">Descending</option>
//               <option value="asc">Ascending</option>
//             </select>
//           </div>
//         </div>
//         {sortedPlaylists ? sortedPlaylists.map((playlist) => {
//           const winPercentage = calculateWinPercentage(playlist.wins, playlist.losses);
//           return (
//             <div key={playlist.id} className="playlist-item">
//               <Link to={`/playlists/${playlist.id}`} className="playlist-name">{playlist.name}</Link>
//               <div className="playlist-stats">
//                 <span>Wins: {playlist.wins} </span>
//                 <span>Losses: {playlist.losses} </span>
//                 <span>Win Percentage: {winPercentage}</span>
//                 <div># of Songs: {playlist.playlistSongs.length} </div>
//               </div>
//             </div>
//           )
//         }) : <div>NAN</div>}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchPlaylists} from '../store/allPlaylistsStore';

function TopPlaylists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [unlockVoting, setUnlockVoting] = useState();
  const [reload, setReload] = useState("1");
  const [createdBy, setCreatedBy] = useState();
  const [sortOption, setSortOption] = useState("winPercentage"); // set default sort option
  const [sortOrder, setSortOrder] = useState("desc"); // set default sort order
  const playlists = useSelector((state) => state.allPlaylists );

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);

  // Calculate win percentage for each playlist
  const calculateWinPercentage = (wins, losses) => {
    const totalGames = wins + losses;
    return totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) + "%" : "N/A";
  };

  // Sort the playlists based on the selected option and order
  const sortPlaylists = (playlists, option, order) => {
    let sortedPlaylists = [...playlists];
    sortedPlaylists.sort((a, b) => {
      if (option === "name") {
        return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (option === "wins") {
        return order === "asc" ? a.wins - b.wins : b.wins - a.wins;
      } else if (option === "losses") {
        return order === "asc" ? a.losses - b.losses : b.losses - a.losses;
      } else {
        const aWinPercentage = a.wins / (a.wins + a.losses);
        const bWinPercentage = b.wins / (b.wins + b.losses);
        return order === "asc" ? aWinPercentage - bWinPercentage : bWinPercentage - aWinPercentage;
      }
    });
    return sortedPlaylists;
  };

  // Handle sort option change
  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  // Handle sort order change
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Get the sorted playlists
  const sortedPlaylists = sortPlaylists(playlists, sortOption, sortOrder);

  return (
    <div className="playlists-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="playlists-wrapper">
        <div className="playlists-header">Playlists</div>
        <table className="playlists-table">
          <thead>
            <tr>
              <th className="table-header-name">Name</th>
              <th className="table-header-wins">Wins</th>
              <th className="table-header-losses">Losses</th>
              <th className="table-header-songs"># of Songs</th>
              <th className="table-header-winPercentage">Win Percentage</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlaylists ? sortedPlaylists.map((playlist) => {
              const winPercentage = calculateWinPercentage(playlist.wins, playlist.losses);
              return (
                <tr key={playlist.id} className="playlist-row">
                  <td className="table-cell-name"><Link to={`/playlists/${playlist.id}`} className="playlist-name">{playlist.name}</Link></td>
                  <td className="table-cell-wins">{playlist.wins}</td>
                  <td className="table-cell-losses">{playlist.losses}</td>
                  <td className="table-cell-songs">{playlist.playlistSongs.length}</td>
                  <td className="table-cell-winPercentage">{winPercentage}</td>
                </tr>
              )
            }) : <div>NAN</div>}
          </tbody>
        </table>
      </div>
    </div>
  );







      }



export default TopPlaylists;
