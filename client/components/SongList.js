import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs } from '../store/allSongsStore';

function SongList() {
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const allSongs = useSelector((state) => state.allSongs)

  useEffect(() => {
    dispatch(fetchSongs())
  }, [])

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  }

  const filteredSongs = allSongs.filter(song =>
    song.name.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  const sortedSongs = filteredSongs.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'artist') {
      return a.artist.localeCompare(b.artist);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or artist" />

        <select value={sortBy} onChange={handleSortChange}>
          <option value="">Sort by...</option>
          <option value="name">Name</option>
          <option value="artist">Artist</option>
        </select>
      </div>

      <ul>
        {sortedSongs.map(song => (
          <li key={song.id}>{song.name} - {song.artist}</li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
