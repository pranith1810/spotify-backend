/* eslint-disable no-param-reassign */
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { connection } = require('../database/dbConnect.js');
const logger = require('../logger.js');
const auth = require('../middleware/auth');
const addSongPlaylist = require('../database/addSongPlaylist');
const addPlaylist = require('../database/addPlaylist');
const getAllUserPlaylists = require('../database/getAllUserPlaylists');
const getPlaylistSongs = require('../database/getPlaylistSongs');

const router = express.Router();

router.post('/add', auth, (req, res, next) => {
  const userPlaylist = {
    user_id: req.user.id,
    playlist_id: uuidv4(),
    name: req.body.playlistName,
  };
  addPlaylist(connection, userPlaylist)
    .then(() => {
      logger.info('Playlist added successfully');
      res.status(200).json({ msg: 'Playlist added successfully' }).end();
    })
    .catch((error) => {
      logger.error('Error while adding playlist to database');
      next(error);
    });
});

router.post('/add/song', auth, (req, res, next) => {
  const playlistSong = {
    playlist_id: req.body.playlistId,
    song_id: req.body.songId,
  };
  addSongPlaylist(connection, playlistSong)
    .then(() => {
      logger.info('Song added to playlist successfully');
      res.status(200).json({ msg: 'Song added to playlist successfully' }).end();
    })
    .catch((error) => {
      logger.error('Error while adding song to playlist in the database');
      next(error);
    });
});

router.get('/', auth, (req, res, next) => {
  getAllUserPlaylists(connection, req.user.id)
    .then((data) => {
      const playLists = [];
      data.forEach((object) => {
        if (object.img_url === null) {
          object.img_url = '';
        }
        if (playLists.length === 0) {
          playLists.push(object);
        } else {
          let flag = 0;
          playLists.forEach((newObject) => {
            if (object.playlist_id === newObject.playlist_id) {
              flag = 1;
            }
          });
          if (flag === 0) {
            playLists.push(object);
          }
        }
      });
      logger.info('User playlists are sent successfully!');
      res.status(200).json(playLists).end();
    })
    .catch((error) => {
      logger.error('Error occurred while retrieving playlists of user from database');
      next(error);
    });
});

router.get('/:id', auth, (req, res, next) => {
  getPlaylistSongs(connection, req.params.id)
    .then((data) => {
      const playlistSongs = [];
      data.forEach((object) => {
        if (playlistSongs.length === 0) {
          object = {
            ...object,
            artist_name: [object.artist_name],
          };
          playlistSongs.push(object);
        } else {
          let flag = 0;
          playlistSongs.forEach((newObject) => {
            if (object.song_id === newObject.song_id) {
              flag = 1;
              newObject.artist_name.push(object.artist_name);
            }
          });
          if (flag === 0) {
            object = {
              ...object,
              artist_name: [object.artist_name],
            };
            playlistSongs.push(object);
          }
        }
      });
      logger.info('Playlist songs are sent successfully!');
      res.status(200).json(playlistSongs).end();
    })
    .catch((error) => {
      logger.error('Error occurred while retrieving playlist songs from database');
      next(error);
    });
});

module.exports = router;
