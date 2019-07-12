const express = require('express');
const router = express.Router();

const Cast = require('../models/cast');

router.get('/', (req, res) => {
   Cast.find(function (err, task) {
       console.log(Cast);
   });

    res.json({
        status:'API works'
    });
});

module.exports = router;