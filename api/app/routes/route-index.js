'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('chegou');
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.2"
    });
});

module.exports = router;