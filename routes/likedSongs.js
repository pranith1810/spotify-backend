/* eslint-disable no-param-reassign */
const express = require('express');
const { connection } = require('../database/dbConnect.js');
const logger = require('../logger.js');
const auth = require('../middleware/auth');
const addLikedSong = require('../database/addLikedSong');
const getUserLikedSongs = require('../database/getUserLikedSongs');

const router = express.Router();

router.post('/add', auth, (req, res, next) => {
  const userLikedSong = {
    user_id: req.user.id,
    song_id: req.body.songId,
  };
  addLikedSong(connection, userLikedSong)
    .then(() => {
      logger.info('Liked song added successfully');
      res.status(200).json({ msg: 'Liked song added successfully' }).end();
    })
    .catch((error) => {
      logger.error('Error while adding song as liked songs to database');
      next(error);
    });
});

router.get('/', auth, (req, res, next) => {
  getUserLikedSongs(connection, req.user.id)
    .then((data) => {
      const likedSongs = [];
      data.forEach((object) => {
        if (likedSongs.length === 0) {
          object = {
            ...object,
            artist_name: [object.artist_name],
          };
          likedSongs.push(object);
        } else {
          let flag = 0;
          likedSongs.forEach((newObject) => {
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
            likedSongs.push(object);
          }
        }
      });
      logger.info('Liked songs are sent successfully!');
      res.status(200).json(likedSongs).end();
    })
    .catch((error) => {
      logger.error('Error occurred while retrieving liked songs from database');
      next(error);
    });
});

module.exports = router;
