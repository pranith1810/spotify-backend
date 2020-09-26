const express = require('express');
const logger = require('./logger');
const config = require('./config/config');
const createDbAndTables = require('./database/dbInitialize');
const signUp = require('./routes/signUp');
const login = require('./routes/login');

const app = express();

app.use(express.json());

createDbAndTables()
  .then(() => {
    app.get('/', (req, res) => {
      res.status(200).json({ msg: 'Welcome to the back-end of Spotify' }).end();
    });

    app.use('/signUp', signUp);
    app.use('/login', login);

    app.use((req, res, next) => {
      const err = new Error('Page Not Found');
      err.status = 404;
      next(err);
    });

    // Express Error handler
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });

    app.listen(config.port, () => {
      logger.info(`Server is listening at ${config.port}`);
    });
  })
  .catch((error) => {
    throw error;
  });
