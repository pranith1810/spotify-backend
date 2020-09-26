const express = require('express');
const logger = require('./logger');
const dbInitialize = require('./database/dbInitialize');

const app = express();
const signUp = require('./routes/signUp');
const login = require('./routes/login');
app.use(express.json());

const auth = require('./middleware/auth')

dbInitialize();

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Welcome to the back-end of Spotify' }).end();
});

app.use('/signUp', signUp);
app.use('/login', login);

app.use((req,res,next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
})

// Express Error handler
app.use((err,req,res,next) => {
  res.status(err.status || 500);
  res.send({
    error:{
      status:err.status || 500,
      message:err.message
    }
  })
})

app.listen(3000, () => {
  logger.info('Server is listening at 3000');
});
