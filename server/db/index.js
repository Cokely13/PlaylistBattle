//this is the access point for all things database related!

const db = require('./db')
const Song = require('./models/Song')
const Playlist = require('./models/Playlist')

const User = require('./models/User')

//associations could go here!
User.hasMany(Playlist)
Playlist.belongsTo(User)

Playlist.belongsToMany(Song, { through: 'PlaylistSongs' });
Song.belongsToMany(Playlist, { through: 'PlaylistSongs' });

// Playlist.hasMany(Song, {
//   foreignKey: 'playlistId',
//   as: 'songs', // name of the association
// });

// Song.belongsTo(Playlist, {
//   foreignKey: 'playlistId',
//   as: 'playlist',
// });

module.exports = {
  db,
  models: {
    User,
    Song,
    Playlist
  },
}
