const assert = require('assert');
const request = require('supertest');
const app = require('../index');
const fs = require('fs');

describe('No logins', () => {
    it('should 401 without login', (done) => {
        request(app)
            .get('/api/protected')
            .set('X-Real-IP', '127.0.0.1')
            .expect(401, done);
    });
});

describe('Configuration', () => {
    it('Secret file must exists to sign JWT', (done) => {
        fs.stat('lib/key.secret', (err, stats) => {
            if (err) done(err);
            if (stats.isFile()) {
                done();
            } else 
                done('"key.secret" is not a file')
        })
    });
});

describe('Login', () => {
    it('should 401 without parameters', (done) => {
        request(app)
            .post('/auth/login')
            .set('X-Real-IP', '127.0.0.1')
            .expect(401, done);
    });
    it('should 401 with bad parameters', (done) => {
        request(app)
            .post('/auth/login')
            .set('X-Real-IP', '127.0.0.1')
            .type('form')
            .send({ wrongparam: 'err' })
            .expect(401, done);
    });
    it('should 401 with invalid credential', (done) => {
        request(app)
            .post('/auth/login')
            .set('X-Real-IP', '127.0.0.1')
            .type('form')
            .send({ username: 'err' })
            .expect(401, done);
    });
    it('should 200 with valid credential', (done) => {
        request(app)
            .post('/auth/login')
            .set('X-Real-IP', '127.0.0.1')
            .type('form')
            .send({ username: 'admin' })
            .expect(200, done);
    });
    it('should 200 and return a Token with valid credential', (done) => {
        request(app)
            .post('/auth/login')
            .set('X-Real-IP', '127.0.0.1')
            .type('form')
            .send({ username: 'admin' })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                assert(typeof(res.body.token) === 'string', 'Token should be a string');
                done();
            });
    });
});
