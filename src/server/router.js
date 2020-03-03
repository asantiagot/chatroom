const express = require('express');
const router = express.Router();
const userModel = require('../db/userModel');
const connect = require('../db/connect');
const userDbOperations = require('../db/userDbOperations');
const path = require('path');

const redirectLogin = (req, res, next) => {
    if (!req.session.userSessionId) {
        res.redirect(`/login`);
    } else {
        next();
    }
}

const redirectChat = (req, res, next) => {
    if (req.session.userSessionId) {
        res.redirect(`/chat`);
    } else {
        next();
    }
}

router.get('/', (req, res) => {
    const username = req.username;
    res.send(`
        <h1>Welcome to Finance Chatroom. Please login to access</h1>
        <a href='/login'>Login</a>
        <a href='/register'>Register</a>
        <form method='post' action='/logout'>Logout</form>
    `);    
});

router.get('/chat', redirectLogin, (req, res) => {
    let options = {
        root: path.join(__dirname, '../', 'public'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    res.sendFile('/', options, (err, next) => {
        if (err) {
            next(err);
        }
    });
});

router.get('/login', redirectChat, (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method='POST' action='/login'>
            <input type='username' name='username' placeholder='username' required/>
            <input type='password' name='password' placeholder='password' required/>
            <input type='submit'/>
        </form>
        <a href='/register'>Register</a>
        <a href='/'>Home</a>
    `);
});

router.post('/login', redirectChat, (req, res) => {
    const {username, password} = req.body;
    connect()
        .then(async() => {
            console.log('connected to the db from router login');
            let user = await userModel.findOne({username: username}).exec();
            if (!user) { 
                console.log('user not found');
                res.redirect('/login');
            } else {
                user.comparePassword(password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        req.header.username = username;
                        req.session.userSessionId = username;
                        res.redirect('/chat');
                    } else {
                        res.redirect('/login')
                    }
                });
            }
        })
        .catch(err => {
            throw (`Error establishing connection to DB: ${err}`);
        });
});

router.get('/register', redirectChat, (req, res) => {
    res.send(`
        <h1>Register</h1>
        <form method='POST' action='/register'>
            <input type='username' name='username' placeholder='username' required/>
            <input type='password' name='password' placeholder='password' required/>
            <input type='submit'/>
        </form>
        <a href='/login'>Login</a>
        <a href='/'>Home</a>
    `);
});

router.post('/register', redirectChat, (req, res) => {
    const {username, password} = req.body;
    userDbOperations.addUser(username, password);
    res.redirect('/login');
});

router.post('/logout', redirectLogin, (req, res) => {
    // TODO
});

module.exports = router;