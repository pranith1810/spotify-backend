const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const logger = require('./logger');
const config = require('./config/config');
const createDbAndTables = require('./database/dbInitialize');
const signUp = require('./routes/signUp');
const login = require('./routes/login');
const userProfile = require('./routes/userProfile');
const albums = require('./routes/albums');
const artists = require('./routes/artists');
const playlists = require('./routes/playlists');
const likedSongs = require('./routes/likedSongs');
const userImage = require('./routes/userImage');
const search = require('./routes/search');
const deleteRoute = require('./routes/delete');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Spotify API',
      description: 'Api for getting albums, songs, creating playlists for a frontend music app.',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

createDbAndTables()
  .then(() => {
    app.get('/', (req, res) => {
      res.status(200).json({ msg: 'Welcome to the back-end of Spotify' }).end();
    });

    app.use(cors());
    app.use(express.json());

    app.use('/signUp', signUp);
    app.use('/login', login);
    app.use('/user', userProfile);
    app.use('/albums', albums);
    app.use('/artists', artists);
    app.use('/playlists', playlists);
    app.use('/liked', likedSongs);
    app.use('/userimage', userImage);
    app.use('/search', search);
    app.use('/delete', deleteRoute);

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
