const express = require('express');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcrypt');
const addUser = require('../database/addUser');
const logger = require('../logger');

const { connection } = require('../database/dbConnect');
const router = express.Router();
const {validateDate, validateEmpty , validateUsername, validateEmail, validatePassword} = require('../validator');


const postUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logger.info(JSON.stringify(errors));
        return res.status(422).json({msg:errors.errors[0].msg});
    }

    let hash;

    try {
        hash = await bcrypt.hash(req.body.password, 10);
        logger.info('Hash password generated');
    }
    catch (err) {
        logger.error(JSON.stringify(err));
    }

    try {
        const user = {
            id: uuidv4(),
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hash,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender
        };

        await addUser(connection, user);
        logger.info(`${user.name} has been inserted to database.`);
        res.status(200).json({ 'msg': `${user.name} inserted to database` }).end();
    }

    catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            logger.info('User already exists');
            res.status(409).json({ msg: 'User already exists!' }).end();
        }
        logger.error(JSON.stringify(err));
        next(new Error(`Internal server error, can't add the user`));
    }
}


router.post('/', [
    validateEmpty('name'),
    validateUsername('username'),
    validateEmail('email'),
    validatePassword('password'),
    validateDate('date_of_birth'),
    validateEmpty('gender')
], postUser)


module.exports = router;