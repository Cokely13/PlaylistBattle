// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchSingleUser } from '../store/singleUserStore';
// import { Link } from 'react-router-dom';

// function UserDetailPage() {
//   const dispatch = useDispatch();
//   const { userId } = useParams();
//   // const [user, setUser] = useState(null);
//   const user = useSelector(state => state.singleUser);

//   useEffect(() => {
//     dispatch(fetchSingleUser(userId));
//   }, [dispatch]);

//   console.log("play", user)

//   return (
//     <div>
//       {user ? (
//         <div>
//           <h1>{user.username}</h1>
//           <div className="playlists-wrapper">
//             <div className="playlists-header">Playlists</div>
//             {user.playlists ? user.playlists.map((playlist) => {
//               return (
//                 <div key={playlist.id} className="playlist-item">
//                   <Link to={`/playlists/${playlist.id}`} className="playlist-name">{playlist.name}</Link>
//                   <div className="playlist-stats">
//                     <span>Wins: {playlist.wins}</span>
//                     <span>Losses: {playlist.losses}</span>
//                   </div>
//                 </div>
//               );
//             }): <div></div>}
//           </div>
//         </div>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// }

// export default UserDetailPage;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { Link } from 'react-router-dom';

function UserDetailPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.singleUser);

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

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

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}</h1>
          <div>
            <p>Total Wins: {getTotalWins()}</p>
            <p>Total Losses: {getTotalLosses()}</p>
          </div>
          <div className="playlists-wrapper">
            <div className="playlists-header">Playlists</div>
            {user.playlists ? user.playlists.map((playlist) => {
              return (
                <div key={playlist.id} className="playlist-item">
                  <Link to={`/playlists/${playlist.id}`} className="playlist-name">{playlist.name}</Link>
                  <div className="playlist-stats">
                    <span>Wins: {playlist.wins}</span>
                    <span>Losses: {playlist.losses}</span>
                  </div>
                </div>
              );
            }): <div></div>}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default UserDetailPage;
