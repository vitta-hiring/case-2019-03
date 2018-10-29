(function () {
    'use strict';

    const express = require('express');
    const router = express.Router();

    router.get('/', (req, res, next) => {
        res.status(200).send({
            title: 'Vitta Medication API',
            version: '1.0.0'
        });
    });

    module.exports = router;
})();