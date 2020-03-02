const express = require('express');
const router = express.Router();
const userDbOperations = require('../db/userDbOperations');
const path = require('path');
// const app = express();

router.get('/', (req, res, next) => {
    const public = path.join(__dirname, '../', 'public');
    // console.log(`public: ${public}`);
    // res.sendFile(path.join(public, 'index.html'));
    // return res.sendFile(path.join(public, 'chatroom.js'));
    // app.use(express.static(public));
});

router.post('/', (req, res, next) => {
    let pass = req.body.password.trim();
    let user = req.body.username.trim();

    if (pass === '') {
        const msg = 'Password cannot be empty';
        let err = new Error(msg);
        err.status = 400;
        res.send(msg);
    }

    if (req.body.username && req.body.password) {
        userDbOperations.addUser(user, pass);
    }
});

module.exports = router;