const express = require('express');
const { connection } = require('../database/dbConnect.js');
const logger = require('../logger.js');
// const auth = require('../middleware/auth');
const getAllArtists = require('../database/getAllArtists');
const getArtistSongs = require('../database/getArtistSongs');

const router = express.Router();

router.get('/', (req, res, next) => {
  getAllArtists(connection)
    .then((data) => {
      logger.info('Artists are sent successfully!');
      res.status(200).json(data).end();
    })
    .catch((error) => {
      logger.error('Error occurred while retrieving artists from database');
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  getArtistSongs(connection, req.params.id)
    .then((data) => {
      logger.info('Artist songs are sent successfully!');
      res.status(200).json(data).end();
    })
    .catch((error) => {
      logger.error('Error occurred while retrieving artist songs from database');
      next(error);
    });
});

module.exports = router;
