// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers } from '../store/allUsersStore'


// function UserPage() {
//   const dispatch = useDispatch();
//   const users = useSelector(state => state.allUsers);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   console.log("users", users)

//   return (
//     <div className="user-page">
//       <h1><u>Users</u></h1>
//       {users.map(user => (
//         <div key={user.id} className="user-card">
//           <h2>{user.username}</h2>
//           <p>Number of playlists: {user.playlists.length}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default UserPage;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/allUsersStore';
import { Link } from 'react-router-dom';

function UserPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log("users", users);

  return (
    <div className="user-page">
      <h1><u>Users</u></h1>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <Link to={`/users/${user.id}`}><h2>{user.username}</h2></Link>
          <p>Number of playlists: {user.playlists.length}</p>
        </div>
      ))}
    </div>
  );
}

export default UserPage;
