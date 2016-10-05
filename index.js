'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expJwt = require('express-jwt');
const morgan = require('morgan');
const tl = require('trivialog');
const fs = require('fs');

// Disable screen output
tl.setParam('outScreen', true);

// Load secret key
const secKey = fs.readFileSync(__dirname + '/lib/key.secret');

// Initilize Express App, add body-parser middleware
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add access logs
const accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

// Load routes files
const api  = require('./routes/api');
const auth = require('./lib/auth');

// Set Proxy for SSL tunnel 
app.set('trust proxy', '127.0.0.1');

// Enable Helmet Middleware https://github.com/helmetjs/helmet
app.use(helmet());

// Accept only SSL connections unless I'm from localhost (without a proxy)
app.use((req, res, next) => {
    // Bypass SSL check if connect from localhost
    if (req.headers['x-real-ip'] === '127.0.0.1') {
        tl.log('WARN','Connection from localhost');
        return next();
    }

    if (req.headers['x-forwarded-proto'] !== 'https') {
        tl.log('ERR','Connection over http not authorized');
        return res.sendStatus(400);
    } else 
        return next();
});

// Add routes (Secured with express-jwt. To unsecure some route, use "unless")
app.use('/api',  expJwt({secret: secKey}).unless({path: ['/api/status']}), api);
app.use('/auth', expJwt({secret: secKey}).unless({path: ['/auth/login']}), auth);

// Listen
app.listen(3000, () => {
    tl.log('App started.');
});

module.exports = app;
