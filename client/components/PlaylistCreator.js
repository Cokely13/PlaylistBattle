// import React, { useState, useEffect  } from 'react';
// import { useSelector , useDispatch} from 'react-redux';
// import { createPlaylist, fetchPlaylists  } from '../store/allPlaylistsStore';
// import { fetchSongs } from '../store/allSongsStore';
// import {createPsong, deletePsong} from '../store/allPsongsStore'


// function PlaylistCreator() {
//   const dispatch = useDispatch()
//   const allSongs = useSelector((state) => state.allSongs );
//   const allPlaylists = useSelector((state) => state.allPlaylists );
//   // const [createdPlaylistId, setCreatedPlaylistId] = useState(null);
//   const [playlistName, setPlaylistName] = useState('');
//   const [selectedSongs, setSelectedSongs] = useState([]);
//   const [playlistCreated, setPlaylistCreated] = useState(false);
//   const {id} = useSelector((state) => state.auth )

//   useEffect(() => {
//     dispatch(fetchSongs())
//   }, [])

//   useEffect(() => {
//     dispatch(fetchPlaylists())
//   }, [])

//   const handleNameChange = (event) => {
//     setPlaylistName(event.target.value);
//   };

//   const handleAddSong = (song) => {
//     setSelectedSongs([...selectedSongs, song]);
//     const thisPlaylist = allPlaylists.filter((playlist) => playlist.name == playlistName)
//     const newSong = {
//       playlistId: thisPlaylist[0].id,
//       songId: song.id
//     }
//     dispatch(createPsong(newSong))
//   };

//   const handleRemoveSong = (song) => {
//     setSelectedSongs(selectedSongs.filter((selectedSong) => selectedSong.id !== song.id));
//   };

//   const handleSubmit =  (event) => {
//     event.preventDefault();
//     const newPlaylist = {
//       name: playlistName,
//       userId: id
//     };
//     dispatch(createPlaylist(newPlaylist));
//     // setCreatedPlaylistId(createdPlaylist.id);
//     setPlaylistCreated(true);
//   };

//   const alphabeticallySortByField = (field) => {
//     return [...allSongs].sort((a, b) => {
//       const fieldA = a[field].toLowerCase();
//       const fieldB = b[field].toLowerCase();
//       if (fieldA < fieldB) {
//         return -1;
//       }
//       if (fieldA > fieldB) {
//         return 1;
//       }
//       return 0;
//     });
//   };

//   return (
//     <div>
//       {!playlistCreated ? (
//         <div>
//           <h1>Create a Playlist</h1>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Playlist Name:
//               <input type="text" value={playlistName} onChange={handleNameChange} />
//             </label>
//             <div>
//               <button type="submit">Create Playlist</button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div>
//           <h1> Playlist Name: {playlistName}</h1>
//           <h2>Add Songs</h2>
//           <div>
//             <button onClick={() => setSelectedSongs([])}>Clear Selection</button>
//           </div>
//           <div>
//             <button onClick={() => setSelectedSongs(alphabeticallySortByField('name'))}>Sort by Name</button>
//             <button onClick={() => setSelectedSongs(alphabeticallySortByField('artist'))}>Sort by Artist</button>
//           </div>
//           <ul>
//             {allSongs.map((song) => (
//               <li key={song.id}>
//                 {song.name} - {song.artist}
//                 {selectedSongs.some((selectedSong) => selectedSong.id === song.id) ? (
//                   <button onClick={() => handleRemoveSong(song)}>Remove</button>
//                 ) : (
//                   <button onClick={() => handleAddSong(song)}>Add</button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PlaylistCreator;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPlaylist } from '../store/allPlaylistsStore';
import { Redirect } from 'react-router-dom';

function PlaylistCreator() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth );
  const [playlistName, setPlaylistName] = useState('');
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [newPlaylistId, setNewPlaylistId] = useState(null);

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPlaylist = {
      name: playlistName,
      userId: id
    };
    const createdPlaylist = await dispatch(createPlaylist(newPlaylist));
    console.log("ew", createPlaylist)
    setNewPlaylistId(createdPlaylist.userId);
    setPlaylistCreated(true);
  };

  if (playlistCreated && newPlaylistId) {
    return <Redirect to={`/playlists/${newPlaylistId}`} />;
  }

  return (
    <div>
      <h1>Create a Playlist</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Playlist Name:
          <input type="text" value={playlistName} onChange={handleNameChange} />
        </label>
        <div>
          <button type="submit">Create Playlist</button>
        </div>
      </form>
    </div>
  );
}

export default PlaylistCreator;
