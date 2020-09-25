const express = require('express');
const logger = require('./logger');
const dbInitialize = require('./database/dbInitialize');

const app = express();
const signUp = require('./routes/signUp')
app.use(express.json())

dbInitialize();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Welcome to the back-end of Spotify' }).end();
});

app.use('/signUp', signUp)

app.listen(3000, () => {
  logger.info('Server is listening at 3000');
});
