const jwt = require('jsonwebtoken');
const logger = require('../logger')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      logger.info('Invalid user ID')
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    logger.info('Invalid request!');
    res.status(401).json({
      error: new Error('Invalid request!')
    }).end();
  }
};