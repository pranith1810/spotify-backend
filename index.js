const express = require('express');
const app = express();
const logger = require('./logger');


app.get('/', (req, res) => {
    res.send('Welcome to the back-end of Spotify')
  })

  app.listen(3000, () => {
    logger.info(`Server is listening at 3000`)
  })
