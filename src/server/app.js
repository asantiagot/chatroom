const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose')
const dburl = require('../db/constants');
const mongoSessionStore = require('connect-mongo');
const bodyParser = require('body-parser');
const mongoStore = mongoSessionStore(session);
const public = path.join(__dirname, '../', 'public');
const routes = require('./router');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.use((req, res, next) => {
    const err = new Error(`Resource not found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

app.get('/src/public/index.html', (request, response) => {
    response.send('welcome to the index');
});

module.exports = app;