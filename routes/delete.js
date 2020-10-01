const express = require('express');
const { connection } = require('../database/dbConnect.js');
const logger = require('../logger.js');
const auth = require('../middleware/auth');
const deleteLikedSong = require('../database/deleteLikedSong');
const deletePlaylist = require('../database/deletePlaylist');
const deletePlaylistSong = require('../database/deletePlaylistSong');
const deleteUser = require('../database/deleteUser');

const router = express.Router();

/**
 * @swagger
 * /delete/liked:
 *  delete:
 *    summary: Remove a liked song
 *    description: Use to remove a liked song of a user
 *    parameters:
 *      - name: songId
 *        in: body
 *        description: Id of the song
 */
router.delete('/liked', auth, (req, res, next) => {
  deleteLikedSong(connection, req.user.id, req.body.songId)
    .then(() => {
      logger.info('Liked song removed successfully');
      res.status(200).json({ msg: 'Liked song removed successfully' }).end();
    })
    .catch((error) => {
      logger.error('Error occurred while removing liked song from database');
      next(error);
    });
});

/**
 * @swagger
 * /delete/playlist:
 *  delete:
 *    summary: Remove a playlist
 *    description: Use to remove a playlist of a user
 *    parameters:
 *      - name: playlistId
 *        in: body
 *        description: Id of the playlist
 */
router.delete('/playlist', auth, (req, res, next) => {
  deletePlaylist(connection, req.user.id, req.body.playlistId)
    .then(() => {
      logger.info('Playlist removed successfully');
      res.status(200).json({ msg: 'Playlist removed successfully' }).end();
    })
    .catch((error) => {
      logger.error('Error occurred while removing playlist from database');
      next(error);
    });
});

/**
 * @swagger
 * /delete/playlist/song:
 *  delete:
 *    summary: Remove a playlist song
 *    description: Use to remove a song from a playlist of a user
 *    parameters:
 *      - name: playlistId
 *        in: body
 *        description: Id of the playlist
 *      - name: songId
 *        in: body
 *        description: Id of the song
 */
router.delete('/playlist/song', auth, (req, res, next) => {
  deletePlaylistSong(connection, req.body.playlistId, req.body.songId)
    .then(() => {
      logger.info('Playlist song removed successfully');
      res.status(200).json({ msg: 'Playlist song removed successfully' }).end();
    })
    .catch((error) => {
      logger.error('Error occurred while removing playlist song from database');
      next(error);
    });
});

/**
 * @swagger
 * /delete/user:
 *  delete:
 *    summary: Remove a user
 *    description: Use to remove a user from the database
 */
router.delete('/user', auth, (req, res, next) => {
  deleteUser(connection, req.user.id)
    .then(() => {
      logger.info(' User removed successfully');
      res.status(200).json({ msg: 'User removed successfully' }).end();
    })
    .catch((error) => {
      logger.error('Error occurred while removing user from database');
      next(error);
    });
});

module.exports = router;
