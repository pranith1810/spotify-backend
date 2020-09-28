/* eslint-disable no-param-reassign */
const express = require('express');
const { connection } = require('../database/dbConnect.js');
const logger = require('../logger.js');
// const auth = require('../middleware/auth');
const getAllAlbums = require('../database/getAllAlbums');
const getAlbumSongs = require('../database/getAlbumSongs');

const router = express.Router();

router.get('/', (req, res, next) => {
  getAllAlbums(connection)
    .then((data) => {
      logger.info('Albums are sent successfully!');
      res.status(200).json(data).end();
    })
    .catch((error) => {
      logger.error('Error occurred while retrieving albums from database');
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  getAlbumSongs(connection, req.params.id)
    .then((data) => {
      const albumSongs = [];
      data.forEach((object) => {
        if (albumSongs.length === 0) {
          object = {
            ...object,
            artist_name: [object.artist_name],
          };
          albumSongs.push(object);
        } else {
          let flag = 0;
          albumSongs.forEach((newObject) => {
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
            albumSongs.push(object);
          }
        }
      });
      logger.info('Album songs are sent successfully!');
      res.status(200).json(albumSongs).end();
    })
    .catch((error) => {
      logger.error('Error occurred while retrieving album songs from database');
      next(error);
    });
});

module.exports = router;
