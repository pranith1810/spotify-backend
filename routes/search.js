/* eslint-disable no-param-reassign */
const express = require('express');
const { connection } = require('../database/dbConnect.js');
const logger = require('../logger.js');
const auth = require('../middleware/auth');
const getSearchedSongs = require('../database/getSearchedSongs');

const router = express.Router();

/**
 * @swagger
 * /search:
 *  post:
 *    summary: Search a song
 *    description: Use to search a song from the database
 *    parameters:
 *      - name: songName
 *        in: body
 *        description: Partial or full name of the song
 */
router.post('/', auth, (req, res, next) => {
  getSearchedSongs(connection, req.body.songName)
    .then((data) => {
      const searchedSongs = [];
      data.forEach((object) => {
        if (searchedSongs.length === 0) {
          object = {
            ...object,
            artist_name: [object.artist_name],
          };
          searchedSongs.push(object);
        } else {
          let flag = 0;
          searchedSongs.forEach((newObject) => {
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
            searchedSongs.push(object);
          }
        }
      });
      logger.info('Searched songs are sent successfully!');
      res.status(200).json(searchedSongs).end();
    })
    .catch((error) => {
      logger.error('Error occurred while searching songs from database');
      next(error);
    });
});

module.exports = router;
