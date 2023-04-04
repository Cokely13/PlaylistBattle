const router = require('express').Router();
const { models: { Playlist, Song, PlaylistSong } } = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const playlistSongs = await PlaylistSong.findAll()
    res.json(playlistSongs)
  } catch (err) {
    next(err)
  }
})


router.get('/:id/songs', async (req, res, next) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    res.json(playlist.songs);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/songs', async (req, res, next) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    const song = await Song.findByPk(req.body.songId);
    await playlist.addSong(song, { through: { sequence: req.body.sequence, duration: req.body.duration } });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/songs/:songId', async (req, res, next) => {
  try {
    const playlistSong = await PlaylistSong.findOne({
      where: {
        playlistId: req.params.id,
        songId: req.params.songId,
      },
    });
    await playlistSong.update({ sequence: req.body.sequence, duration: req.body.duration });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/songs/:songId', async (req, res, next) => {
  try {
    const playlistSong = await PlaylistSong.findOne({
      where: {
        playlistId: req.params.id,
        songId: req.params.songId,
      },
    });
    await playlistSong.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
