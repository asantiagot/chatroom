const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true} },
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    var user = this;

    bcrypt.genSalt(SALT_FACTOR, function (error, salt) {
        if (error) {
            return next (error);
        }

        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next (error);
            }

            user.password = hash;
            next();
        });
    });    
});

userSchema.methods.comparePassword = function (pass, callback) {
    bcrypt.compare(pass, this.password, function (err, success) {
        if (err) {
            return callback(err);
        }
        callback (null, success);
    });
};

module.exports = mongoose.model('User', userSchema);