const assert = require('assert');
const request = require('supertest');
const app = require('../index');

describe('No logins', () => {
    it('should 401 without login', (done) => {
        request(app)
            .get('/api/status')
            .expect(401, done);
    });
});

describe('Login', () => {
    it('should 401 without parameters', (done) => {
        request(app)
            .post('/auth/login')
            .expect(401, done);
    });
    it('should 401 with bad parameters', (done) => {
        request(app)
            .post('/auth/login')
            .type('form')
            .send({ wrongparam: 'err' })
            .expect(401, done);
    });
    it('should 401 with invalid credential', (done) => {
        request(app)
            .post('/auth/login')
            .type('form')
            .send({ username: 'err' })
            .expect(401, done);
    });
    it('should 200 with valid credential', (done) => {
        request(app)
            .post('/auth/login')
            .type('form')
            .send({ username: 'admin' })
            .expect(200, done);
    });
    it('should 200 and return a Token with valid credential', (done) => {
        request(app)
            .post('/auth/login')
            .type('form')
            .send({ username: 'admin' })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                assert(typeof(res.body.token) === 'string', 'Token should be a string');
                done();
            });
    });
});
