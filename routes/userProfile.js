const express = require('express');
const { connection } = require('../database/dbConnect.js');
const logger = require('../logger.js');
const auth = require('../middleware/auth');
const getUserProfile = require('../database/getUserProfile');

const router = express.Router();

router.get('/profile', auth, (req, res, next) => {
  getUserProfile(connection, req.user.id)
    .then((data) => {
      logger.info('User profile is sent successfully!');
      res.status(200).json(data).end();
    })
    .catch((error) => {
      logger.error('Error occurred while retrieving user profile from database');
      next(error);
    });
});

module.exports = router;
