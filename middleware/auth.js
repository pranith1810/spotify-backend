const jwt = require('jsonwebtoken');
const logger = require('../logger');
const config = require('../config/config.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    logger.info('Authorization header not defined');
    res.status(404).json({ msg: 'Authorization header not defined' });
    return;
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.secretToken, (err, userId) => {
    if (err) {
      logger.error('Token Not Valid');
      res.status(401).json({ msg: 'Token not valid.' }).end();
    } else {
      logger.info('Token verified');
      req.user = userId;
      next();
    }
  });
};
