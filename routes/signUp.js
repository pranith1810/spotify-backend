const express = require('express');

const router = express.Router();

router.post('/', (req,res,next) => {
    console.log(req.body)
    res.json(req.body)
})

module.exports = router;