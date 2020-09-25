const { check } = require('express-validator');

const validateDate = (date) => {
    return check(`${date}`).custom(value =>{
        const date = new Date(`${value}`);
        if(date > new Date()){
            throw new Error(`Date can't be in future`);
        }
        return true;
    })
}

const validateEmpty = (name) => check(`${name}`).not().isEmpty().withMessage(`${name} Can't be empty`);

const validateUsername = (username) => {
    return check(username).isLength({min:6}).withMessage('Username must be greater than 6 character')
}

const validatePassword = (password) => {
    return check(password).isLength({min:8}).withMessage('Password must be greater than 8 character')
}

const validateEmail = (email) => {
    return check(email).isEmail().withMessage('Enter a valid email address')
    
}

module.exports = {
    validateDate,
    validateEmpty,
    validateUsername,
    validatePassword,
    validateEmail
}