'use strict';
const express = require('express');
const tl = require('trivialog');
const router = express.Router();

// Return status code of the app (check for db connections, fs status, etc.)
router.get('/status', (req, res) => {
    tl.log('GET /status');
    res.jsonp({ status: 'ok'});
})

module.exports = router;