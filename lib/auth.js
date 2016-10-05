'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');

const secret = fs.readFileSync(__dirname + '/key.secret');
// Option for jwt
const jwtOpts = {
    expiresIn: 60, // Expires in x Seconds
}

// If req.headers.Authorization contains a valid token, respond with 200
router.get('/check', (req, res) => {
    res.send({status: 'login'});
});

router.post('/login', (req, res) => {
    if (req.body.username) {
        // Check for username / password, if ok save jwt in Redis
        if (req.body.username === 'admin') {
            const token = jwt.sign({username: req.body.username}, secret, jwtOpts);
            res.json({token: token});
        } else
            res.status(401).json({error: 'invalid login'}); // Invalid credential
    } else
        res.status(401).json({error: 'invalid login'}); // Invalid credential
});

module.exports = router;