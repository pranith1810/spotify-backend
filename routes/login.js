const express = require('express');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const { connection } = require('../database/dbConnect.js');
const getUser = require('../database/getUser');

const config = require('../config/config.js');
const logger = require('../logger.js');
const { validateEmail, validatePassword } = require('../validator');

const router = express.Router();

router.post('/', [
  validateEmail('email'),
  validatePassword('password'),
  // eslint-disable-next-line consistent-return
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.info(JSON.stringify(errors));
    return res.status(422).json({ msg: errors.errors[0].msg });
  }

  try {
    const data = await getUser(connection, req.body.email);
    if (data.length === 0) {
      logger.info('User doesn\'t exists');
      res.status(409).json({ msg: 'Users doesn\'t exists' }).end();
    } else {
      const passwordChecker = await bcrypt.compare(req.body.password, data[0].password);
      if (!passwordChecker) {
        logger.error('password doesn\'t match');
        res.status(401).json({ msg: 'Password doesn\'t match' }).end();
      }

      const claim = {
        id: data[0].id,
      };

      jwt.sign(claim, config.secretToken, (err, token) => {
        if (err) {
          logger.error('User JWT signing failed');
          next(err);
        } else {
          res.status(200).json({ token }).end();
        }
      });
    }
  } catch (err) {
    logger.error(JSON.stringify(err));
    throw err;
  }
});

module.exports = router;
