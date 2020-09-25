const express = require('express');
const logger = require('./logger');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Welcome to the back-end of Spotify' }).end();
});

app.listen(3000, () => {
  logger.info('Server is listening at 3000');
});
