const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose')
const dburl = require('../db/constants');
const mongoSessionStore = require('connect-mongo');
const mongoStore = mongoSessionStore(session);
const public = path.join(__dirname, '../', 'public');

app.use(express.static(public));

const ONE_DAY_MILI = 1 * 24 * 60 * 60 * 1000;
const ONE_DAY_SECS = 1 * 24 * 60 * 60;

const {
    PORT = 5000,
    NODE_ENV = 'development',
    SESS_NAME = 'chatroom.sid',
    SESS_SECRET = 'ssh!e77c7q823\'ssshhh',
    SESS_LIFETIME = ONE_DAY_SECS
} = process.env;

app.set('port', PORT);

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const sessionObject = {
    secret: SESS_SECRET,
    name: SESS_NAME,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        ttl: SESS_LIFETIME
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: ONE_DAY_MILI,
        secure: NODE_ENV === 'production'
    }
};

app.use(session(sessionObject));

app.get('/', (request, response) => {
    // console.log(`public: ${public}`);
    // console.log(`attempted redirect: /src/public/index.html`);
    // response.redirect('src/public/index.html');
});

app.get('/src/public/index.html', (request, response) => {
    response.send('welcome to the index');
});

module.exports = app;