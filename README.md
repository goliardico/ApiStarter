## ApiStarter

It's a Node.js + Express REST backend ready, with JWT token middleware for a minimal authentication and a easy to do NoSQL auth or session repository.

### Security

It must run behind a Proxy SSL (Nginx, Apache, ...) otherwise you'll get an error

```javascript
if (req.headers['x-forwarded-proto'] !== 'https') {
    tl.log('ERR','Connection over http not authorized');
    return res.sendStatus(400);
}
```
but I've put a filter to bypass SSL check if connection comes from localhost (Proxy insert X-Real-IP to 127.0.0.1).

The JWT use the default algorithm HS256 and read the secret key from a file (not included) in lib/key.secret.

[Helmet](https://github.com/helmetjs/helmet) framework is configured to enforce security.  

## Installation

Clone the repository:

```sh

git clone https://github.com/pgdata/ApiStarter.git

```
Put something in key.secret file:

```sh

echo "Something" > lib/key.secret

```

Add libraries:

```sh

npm install

```

You could also run test:

```sh

npm test

```

## License

Released under MIT License (see LICENSE file).
