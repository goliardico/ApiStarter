'use strict';
const express = require('express');
const router = express.Router();

// Return status code of the app (check for db connections, fs status, etc.)
router.get('/status', (req, res) => {
    // Return a fake { status: 'ok' } with a random delay to simulate an elaboration
    setTimeout(() => res.jsonp({ status: 'ok'}), Math.random() * (3000 - 100) + 100);
});

// Protected route
router.get('/protected', (req, res) => {
    res.jsonp({ secure: true});
})

module.exports = router;