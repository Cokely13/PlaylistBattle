// import React from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {logout} from '../store'

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <h1>Playlist Battle</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <Link to="/Songs">Songs</Link>
//           <Link to="/create">Create</Link>
//           <Link to="/playlists">Playlists</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.auth.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
// import '../../public/style.css'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar-container">
    <h1 className="navbar-title">Playlist Battle</h1>
    <nav>
      {isLoggedIn ? (
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">Home</Link>
          <Link to="/users" className="navbar-link">Users</Link>
          <Link to="/songs" className="navbar-link">Songs</Link>
          <Link to="/create" className="navbar-link">Create</Link>
          <Link to="/playlists" className="navbar-link">Playlists</Link>
          <a href="#" onClick={handleClick} className="navbar-link">
            Logout
          </a>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signup" className="navbar-link">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr className="navbar-hr" />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
