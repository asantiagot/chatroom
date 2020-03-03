const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(401).sendFile('/');
        // return res.status(401).sendFile('Token was not provided, access denied');
    }

    try {
        const decoded = jwt.verify(token, 'key');
        req.token = decoded;
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}